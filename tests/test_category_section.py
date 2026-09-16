import contextlib
import http.server
import socket
import threading
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        pass


@contextlib.contextmanager
def local_site():
    with socket.socket() as probe:
        probe.bind(("127.0.0.1", 0))
        port = probe.getsockname()[1]

    handler = lambda *args, **kwargs: QuietHandler(
        *args, directory=str(PROJECT_ROOT), **kwargs
    )
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{port}/index.html"
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=2)


class CategorySectionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.site = local_site()
        cls.url = cls.site.__enter__()
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.site.__exit__(None, None, None)

    def setUp(self):
        self.page = self.browser.new_page(viewport={"width": 1440, "height": 1000})
        self.page.goto(self.url, wait_until="domcontentloaded")

    def tearDown(self):
        self.page.close()

    def test_category_section_removed_from_index_html(self):
        page = self.browser.new_page(viewport={"width": 1440, "height": 1000})
        page.goto(self.url, wait_until="domcontentloaded")
        self.assertEqual(page.locator("#categorias").count(), 0)
        self.assertEqual(page.locator("#categoryRail").count(), 0)
        page.close()

    def test_archived_category_section_preserved_in_design_system(self):
        page = self.browser.new_page(viewport={"width": 1440, "height": 1000})
        ds_url = self.url.replace("index.html", "design-system-preview.html")
        page.goto(ds_url, wait_until="domcontentloaded")

        expected_names = [
            "Brinquedão & Safari",
            "Piscina de Bolinhas",
            "Cama Elástica",
            "Quadra de Futebol",
            "Espaço Baby",
            "Oficinas Criativas",
            "Camarim Infantil",
            "Festas & Eventos",
            "Espaço Família",
            "e muito mais....",
        ]
        rail = page.locator("#secao-categorias #categoryRail")
        self.assertEqual(rail.count(), 1)

        items = rail.locator(".category-item")
        self.assertEqual(items.count(), 10)
        rendered_names = [" ".join(name.split()) for name in items.all_inner_texts()]
        self.assertEqual(rendered_names, expected_names)

        loaded_circles = items.locator("img").evaluate_all(
            """images => images.every(image => {
                const style = getComputedStyle(image);
                return image.complete && image.naturalWidth > 0
                    && style.borderRadius === '9999px';
            })"""
        )
        self.assertTrue(loaded_circles)
        page.close()


if __name__ == "__main__":
    unittest.main()
