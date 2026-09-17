import unittest
from playwright.sync_api import sync_playwright
from tests.test_category_section import local_site


class HeaderNavigationTests(unittest.TestCase):
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

    def test_desktop_navigation_layout_and_icons(self):
        page = self.browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(self.url, wait_until='domcontentloaded')

        logo = page.locator('.header-logo')
        self.assertEqual(logo.count(), 1)
        self.assertTrue(logo.is_visible())

        inner_box = page.locator('.header-inner').bounding_box()
        logo_box = logo.bounding_box()
        self.assertIsNotNone(inner_box)
        self.assertIsNotNone(logo_box)
        inner_center_x = inner_box['x'] + inner_box['width'] / 2
        logo_center_x = logo_box['x'] + logo_box['width'] / 2
        self.assertAlmostEqual(inner_center_x, logo_center_x, delta=15)

        nav_left = page.locator('#nav-left')
        self.assertTrue(nav_left.is_visible())
        left_links = nav_left.locator('.nav-link')
        self.assertEqual(left_links.count(), 3)

        expected_left = ['Início', 'Sobre', 'Nossas Lojas']
        for idx, text in enumerate(expected_left):
            link = left_links.nth(idx)
            self.assertIn(text, link.inner_text())
            self.assertEqual(link.locator('svg').count(), 1)

        nav_right = page.locator('#nav-right')
        self.assertTrue(nav_right.is_visible())
        right_links = nav_right.locator('.nav-link')
        self.assertEqual(right_links.count(), 1)

        expected_right = ['Ofertas']
        for idx, text in enumerate(expected_right):
            link = right_links.nth(idx)
            self.assertIn(text, link.inner_text())
            self.assertEqual(link.locator('svg').count(), 1)

        cta_order = nav_right.locator('.nav-btn-order')
        self.assertTrue(cta_order.is_visible())
        self.assertTrue(any(w in cta_order.inner_text() for w in ['Garantir', 'passaporte', 'Pedir', 'Quero', 'saber mais']))

        toggle = page.locator('#mobileMenuBtn')
        self.assertFalse(toggle.is_visible())

        page.close()

    def test_mobile_navigation_and_drawer_interaction(self):
        page = self.browser.new_page(viewport={'width': 375, 'height': 667})
        page.goto(self.url, wait_until='domcontentloaded')

        self.assertFalse(page.locator('#nav-left').is_visible())
        self.assertFalse(page.locator('#nav-right').is_visible())

        toggle = page.locator('#mobileMenuBtn')
        self.assertTrue(toggle.is_visible())

        logo = page.locator('.header-logo')
        self.assertTrue(logo.is_visible())

        mobile_cta = page.locator('.header-mobile-cta')
        self.assertTrue(mobile_cta.is_visible())

        drawer = page.locator('#mobileMenu')
        self.assertFalse(drawer.is_visible())

        toggle.click()
        page.wait_for_timeout(350)
        self.assertTrue(drawer.is_visible())
        self.assertIn('is-open', drawer.get_attribute('class'))

        drawer_links = drawer.locator('.drawer-link')
        self.assertGreaterEqual(drawer_links.count(), 6)

        close_btn = page.locator('.mobile-drawer-close')
        close_btn.click()
        page.wait_for_timeout(350)
        self.assertNotIn('is-open', drawer.get_attribute('class'))

        page.close()

    def test_dynamic_header_scroll_hide_and_show(self):
        page = self.browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(self.url, wait_until='domcontentloaded')

        header = page.locator('#siteHeader')
        self.assertEqual(header.count(), 1)
        self.assertNotIn('header-hidden', header.get_attribute('class') or '')

        # 1. Scroll para baixo (> 50px) deve adicionar header-hidden
        page.evaluate("() => window.scrollTo({ top: 500, behavior: 'instant' })")
        page.wait_for_timeout(150)
        self.assertIn('header-hidden', header.get_attribute('class'))

        # 2. Scroll para cima deve remover header-hidden
        page.evaluate("() => window.scrollTo({ top: 250, behavior: 'instant' })")
        page.wait_for_timeout(150)
        self.assertNotIn('header-hidden', header.get_attribute('class'))

        # 3. Retornar ao topo absoluto (0) garante header visível e sem header-scrolled
        page.evaluate("() => window.scrollTo({ top: 0, behavior: 'instant' })")
        page.wait_for_timeout(150)
        classes = header.get_attribute('class') or ''
        self.assertNotIn('header-hidden', classes)
        self.assertNotIn('header-scrolled', classes)

        page.close()

    def test_mobile_drawer_protects_header_on_scroll(self):
        page = self.browser.new_page(viewport={'width': 375, 'height': 667})
        page.goto(self.url, wait_until='domcontentloaded')

        header = page.locator('#siteHeader')
        toggle = page.locator('#mobileMenuBtn')
        drawer = page.locator('#mobileMenu')

        # Abrir menu mobile
        toggle.click()
        page.wait_for_timeout(350)
        self.assertIn('is-open', drawer.get_attribute('class'))

        # Tentar scroll para baixo com drawer aberto -> Header NÃO deve se esconder
        page.evaluate("() => window.scrollTo({ top: 350, behavior: 'instant' })")
        page.wait_for_timeout(150)
        self.assertNotIn('header-hidden', header.get_attribute('class') or '')

        page.close()

    def test_no_borders_on_sections_and_header(self):
        page = self.browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(self.url, wait_until='domcontentloaded')

        # Verifica que o navbar não possui borda inferior ou sombra estática
        navbar = page.locator('.site-header-navbar')
        border_bottom = navbar.evaluate("el => window.getComputedStyle(el).borderBottomWidth")
        box_shadow = navbar.evaluate("el => window.getComputedStyle(el).boxShadow")
        self.assertIn(border_bottom, ['0px', 'none', ''])
        self.assertIn(box_shadow, ['none', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px', ''])

        # Verifica que todas as tags <section> têm border-top e border-bottom 0px
        sections = page.locator('section')
        count = sections.count()
        self.assertGreater(count, 0)
        for i in range(count):
            sec = sections.nth(i)
            b_top = sec.evaluate("el => window.getComputedStyle(el).borderTopWidth")
            b_bottom = sec.evaluate("el => window.getComputedStyle(el).borderBottomWidth")
            self.assertEqual(b_top, '0px', f"Section {i} has borderTopWidth {b_top}")
            self.assertEqual(b_bottom, '0px', f"Section {i} has borderBottomWidth {b_bottom}")

        page.close()


if __name__ == '__main__':
    unittest.main()
