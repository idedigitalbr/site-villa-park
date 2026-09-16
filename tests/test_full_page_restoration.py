import unittest

from playwright.sync_api import sync_playwright

from tests.test_category_section import local_site


class FullPageRestorationTests(unittest.TestCase):
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

    def test_restores_the_approved_google_testimonials_section(self):
        heading = self.page.get_by_role(
            "heading", name="O que nossos clientes dizem no Google."
        )
        self.assertEqual(heading.count(), 1)
        self.assertEqual(
            self.page.get_by_role("heading", name="Luciana Nascimento").count(), 1
        )
        self.assertGreaterEqual(
            self.page.get_by_text(
                '"Lugar incrível e super seguro para as crianças! Meus filhos adoraram o brinquedão e a equipe é muito atenciosa."', exact=True
            ).count(),
            1,
        )

    def test_restores_the_approved_store_and_footer_layout(self):
        stores = self.page.locator("#filiais")
        self.assertEqual(stores.count(), 1)
        self.assertEqual(stores.get_by_text("Prefere falar com a gente?").count(), 0)
        self.assertEqual(
            self.page.get_by_text(
                "O complexo de muita diversão para os pequenos. Lazer, segurança e momentos inesquecíveis para toda a família no mezanino do +B Supermercados.",
                exact=True,
            ).count(),
            1,
        )

    def test_horizontal_banner_displays_the_approved_ifood_banner(self):
        banner = self.page.locator("#clube img")
        self.assertEqual(banner.count(), 1)
        self.assertEqual(
            banner.get_attribute("src"),
            "assets/Pagina/S4%20BANNERS%20HORIZONTAIS/banner-festa-aniversario.webp",
        )
        self.assertTrue(
            banner.evaluate(
                "element => element.complete && element.naturalWidth > 0"
            )
        )

    def test_uses_the_three_existing_hero_images(self):
        expected_sources = [
            "assets/Pagina/S1%20TOPO%20HERO/1-banner-topo.webp",
            "assets/Pagina/S1%20TOPO%20HERO/2-banner-topo.webp",
            "assets/Pagina/S1%20TOPO%20HERO/3-banner-topo.webp",
        ]
        images = self.page.locator("#home .hero-slide > img")
        self.assertEqual(images.count(), 3)
        self.assertEqual(images.evaluate_all("items => items.map(item => item.getAttribute('src'))"), expected_sources)
        self.assertTrue(
            images.evaluate_all(
                "items => items.every(item => item.complete && item.naturalWidth > 0)"
            )
        )



    def test_ofertas_carousel_has_arrows_and_five_cards(self):
        container = self.page.locator("#ofertas .bf-container")
        self.assertGreaterEqual(container.count(), 1)

        track = self.page.locator("#bannersTrack")
        self.assertEqual(track.count(), 1)

        cards = track.locator("[data-banner-card]")
        self.assertEqual(cards.count(), 5)

        cards.last.scroll_into_view_if_needed()
        self.page.wait_for_timeout(250)

        images = cards.locator("img")
        self.assertEqual(images.count(), 5)
        self.assertTrue(
            images.evaluate_all("imgs => imgs.every(img => img.complete && img.naturalWidth > 0)")
        )

        # Verifica a existência dos botões arrow com o mesmo estilo do hero
        arrows = self.page.locator("#ofertas button[onclick*='scrollBanners']")
        self.assertEqual(arrows.count(), 2)

        # Verifica a existência dos 5 dots indicadores
        dots = self.page.locator("#bannersDots .banner-dot")
        self.assertEqual(dots.count(), 5)


if __name__ == "__main__":
    unittest.main()

