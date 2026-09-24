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


class AtracoesSectionTests(unittest.TestCase):
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
        self.page.goto(self.url, wait_until="networkidle")

    def tearDown(self):
        self.page.close()

    def test_section_placement_and_structure(self):
        # Verifica se #atracoes existe
        atracoes = self.page.locator("section#atracoes")
        self.assertEqual(atracoes.count(), 1)

        # Verifica ordem: sobre -> atracoes -> estadia
        order = self.page.evaluate(
            """() => {
            const sections = Array.from(document.querySelectorAll('section')).map(s => s.id);
            const sobreIdx = sections.indexOf('sobre');
            const atracoesIdx = sections.indexOf('atracoes');
            const clubeIdx = sections.indexOf('clube');
            return { sobreIdx, atracoesIdx, clubeIdx };
        }"""
        )
        self.assertGreater(order["atracoesIdx"], order["sobreIdx"])
        self.assertLess(order["atracoesIdx"], order["clubeIdx"])

    def test_3d_decorations_exist(self):
        # Brinquedão 3D e Cerca 3D dentro de #atracoes
        brinquedao = self.page.locator("section#atracoes img[src*='brinquedao-toboga-piscina-bolinhas-3d.webp']")
        self.assertEqual(brinquedao.count(), 1)

        cerca = self.page.locator("section#atracoes img[src*='cerca-colorida-parquinho-3d.webp']")
        self.assertEqual(cerca.count(), 1)

        # Giz / Amarelinha deve estar na seção #sobre (anterior), e NÃO em #atracoes
        chalk_in_atracoes = self.page.locator("section#atracoes img[src*='amarelinha-giz-colorido-3d.webp']")
        self.assertEqual(chalk_in_atracoes.count(), 0)

        chalk_in_sobre = self.page.locator("section#sobre img[src*='amarelinha-giz-colorido-3d.webp']")
        self.assertEqual(chalk_in_sobre.count(), 1)

    def test_brinquedao_horizontal_displacement(self):
        # Verifica se o brinquedão está deslocado horizontalmente para a esquerda
        # de modo que aproximadamente 40% fique fora da tela
        img_info = self.page.evaluate(
            """() => {
            const sec = document.querySelector('section#atracoes');
            const img = document.querySelector('.atracoes-brinquedao-inner img');
            if (!sec || !img) return null;
            const secRect = sec.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            // pixels do elemento que estão à esquerda da seção
            const outsideLeft = Math.max(0, secRect.left - imgRect.left);
            const pctOutside = (outsideLeft / imgRect.width) * 100;
            return {
                width: imgRect.width,
                height: imgRect.height,
                outsideLeft,
                pctOutside
            };
        }"""
        )
        self.assertIsNotNone(img_info)
        # Deve ter entre 35% e 45% projetado para fora da lateral esquerda
        self.assertGreaterEqual(img_info["pctOutside"], 35.0)
        self.assertLessEqual(img_info["pctOutside"], 48.0)

    def test_cerca_position_lower_right(self):
        # Verifica se a cerca está posicionada no canto inferior direito elevado
        pos = self.page.evaluate(
            """() => {
            const sec = document.querySelector('section#atracoes');
            const cerca = document.querySelector('.atracoes-cerca-wrap');
            if (!sec || !cerca) return null;
            const secRect = sec.getBoundingClientRect();
            const cercaRect = cerca.getBoundingClientRect();
            return {
                distFromBottom: secRect.bottom - cercaRect.bottom,
                secHeight: secRect.height,
                right: cercaRect.right - secRect.right
            };
        }"""
        )
        self.assertIsNotNone(pos)
        # Deve estar no quadrante inferior (distância do rodapé menor que 40% da altura da seção)
        self.assertLess(pos["distFromBottom"], pos["secHeight"] * 0.40)
        self.assertGreaterEqual(pos["distFromBottom"], 0)

    def test_title_and_eyebrow_texts(self):
        title = self.page.locator("section#atracoes h2")
        self.assertIn("O QUE VOCÊ ENCONTRA", title.inner_text().upper())
        self.assertIn("NO VILA PARK", title.inner_text().upper())

        eyebrow = self.page.locator("section#atracoes span:has-text('CONFIRA')")
        self.assertGreaterEqual(eyebrow.count(), 1)

    def test_slides_and_card_interaction(self):
        slides = self.page.locator("#atracoesSlidesTrack .atracoes-slide")
        self.assertEqual(slides.count(), 5)

        cards = self.page.locator("section#atracoes .atracoes-card")
        self.assertEqual(cards.count(), 5)

        dots = self.page.locator("section#atracoes .atracoes-dot")
        self.assertEqual(dots.count(), 5)

        # Garante slide 1 ativo
        cards.nth(0).click()
        self.page.wait_for_timeout(300)
        self.assertIn("active", slides.nth(0).get_attribute("class"))

        # Clica no card 2 (Escorregadores)
        cards.nth(1).click()
        self.page.wait_for_timeout(300)

        # Verifica se slide 2 ficou ativo
        self.assertIn("active", slides.nth(1).get_attribute("class"))
        self.assertIn("active", cards.nth(1).get_attribute("class"))
        self.assertIn("active", dots.nth(1).get_attribute("class"))

        # Clica no botão próxima seta
        next_btn = self.page.locator("button[aria-label='Próxima atração']")
        next_btn.click()
        self.page.wait_for_timeout(300)

        # Slide 3 deve estar ativo
        self.assertIn("active", slides.nth(2).get_attribute("class"))


if __name__ == "__main__":
    unittest.main()
