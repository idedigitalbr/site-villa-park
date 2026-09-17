import os
import unittest
from playwright.sync_api import sync_playwright

class SobreSectionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        cls.file_url = 'file:///' + os.path.abspath('index.html').replace('\\', '/')

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.page = self.browser.new_page(viewport={'width': 1280, 'height': 800})
        self.page.goto(self.file_url, wait_until='networkidle')

    def tearDown(self):
        self.page.close()

    def test_sobre_section_elements_and_layout(self):
        section = self.page.locator('#sobre')
        self.assertTrue(section.is_visible())

        # Badge
        badge = section.locator('.ds-tag-orange')
        self.assertTrue(badge.is_visible())
        self.assertIn('SOBRE O VILLA PLAZA PARK', badge.inner_text().strip())

        # Title
        heading = section.locator('h2')
        self.assertTrue(heading.is_visible())
        self.assertIn('ONDE A IMAGINAÇÃO', heading.inner_text())
        self.assertIn('GANHA VIDA', heading.inner_text())

        # 3 Features
        features = section.locator('.space-y-3\\.5 > div')
        self.assertEqual(features.count(), 3)
        self.assertIn('Monitores treinados', features.nth(0).inner_text())
        self.assertIn('Ambiente 100% climatizado', features.nth(1).inner_text())
        self.assertIn('Comodidade total', features.nth(2).inner_text())

        # CTA Button - Quero saber mais
        btn = section.locator('button[aria-label="Quero saber mais"]')
        self.assertTrue(btn.is_visible())
        btn_text = ' '.join((btn.text_content() or '').split())
        self.assertIn('Quero saber mais', btn_text)

        # 4 Photo Collage
        images = section.locator('img[src*="sobre-mockup"]')
        self.assertEqual(images.count(), 4)
        for i in range(4):
            self.assertTrue(images.nth(i).is_visible())

    def test_all_site_buttons_have_quero_saber_mais(self):
        cta_buttons = [
            'button.nav-btn-order',
            'button.header-mobile-cta',
            'button.btn-drawer-cta',
            'button[aria-label="Quero saber mais"]'
        ]
        for sel in cta_buttons:
            btn = self.page.locator(sel)
            if btn.count() > 0:
                normalized_text = ' '.join((btn.first.text_content() or '').split())
                self.assertIn('Quero saber mais', normalized_text)

    def test_mobile_responsive_sobre_section(self):
        page = self.browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto(self.file_url, wait_until='networkidle')
        section = page.locator('#sobre')
        self.assertTrue(section.is_visible())
        images = section.locator('img[src*="sobre-mockup"]')
        self.assertEqual(images.count(), 4)
        page.close()

if __name__ == '__main__':
    unittest.main()
