import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = PROJECT_ROOT / "index.html"
CSS_PATH = PROJECT_ROOT / "src" / "css" / "design-system.css"
JS_PATH = PROJECT_ROOT / "src" / "js" / "main.js"


class DepoimentosFaqTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(INDEX_PATH, "r", encoding="utf-8", errors="ignore") as f:
            cls.html = f.read()
        with open(CSS_PATH, "r", encoding="utf-8", errors="ignore") as f:
            cls.css = f.read()
        with open(JS_PATH, "r", encoding="utf-8", errors="ignore") as f:
            cls.js = f.read()

    def test_section_elements_exist(self):
        """Verifica se os IDs e classes principais existem no HTML"""
        self.assertIn('id="depoimentos"', self.html)
        self.assertIn('id="faq"', self.html)
        self.assertIn('ds-sky-stage', self.html)
        self.assertIn('ds-reels-slider-wrap', self.html)
        self.assertIn('ds-reels-track', self.html)
        self.assertIn('reelsTrack', self.html)
        self.assertIn('depoimentosTextBox', self.html)

    def test_3d_decor_assets(self):
        """Verifica se os 3 assets oficiais 3D do print estão presentes"""
        self.assertIn('estrela-sorridente-3d.webp', self.html)
        self.assertIn('rampa-rolos-coloridos-3d.webp', self.html)
        self.assertIn('castelo-inflavel-pula-pula-3d.webp', self.html)

    def test_typography_and_hierarchy(self):
        """Verifica títulos e eyebrows de acordo com a referência do print"""
        self.assertIn('NOSSOS CLIENTES', self.html)
        self.assertIn('DEPOIMENTOS', self.html)
        self.assertIn('FAQ', self.html)
        self.assertIn('DÚVIDAS', self.html)
        self.assertIn('FREQUENTES', self.html)

    def test_faq_grid_structure(self):
        """Verifica se o FAQ tem exatamente 6 perguntas divididas em 2 colunas"""
        faq_cards = self.html.count('class="ds-faq-card"')
        self.assertEqual(faq_cards, 6)

    def test_reels_cards_count(self):
        """Verifica se existem pelo menos 4 cards no carrossel de Reels"""
        cards = self.html.count('class="ds-reel-card"')
        self.assertGreaterEqual(cards, 4)

    def test_css_classes_defined(self):
        """Verifica se as classes do design system estão declaradas no CSS"""
        self.assertIn('.ds-sky-stage', self.css)
        self.assertIn('.ds-stage-decor-left', self.css)
        self.assertIn('.ds-stage-decor-right', self.css)
        self.assertIn('.ds-reels-slider-wrap', self.css)
        self.assertIn('.ds-slider-nav-btn', self.css)
        self.assertIn('.ds-reel-card', self.css)
        self.assertIn('.ds-faq-card', self.css)
        self.assertIn('.ds-faq-title-green', self.css)
        self.assertIn('.ds-faq-title-orange', self.css)

    def test_js_slider_functions(self):
        """Verifica se as funções interativas do carrossel e FAQ existem no JS"""
        self.assertIn('initDepoimentosSlider', self.js)
        self.assertIn('depoimentosPrev', self.js)
        self.assertIn('depoimentosNext', self.js)
        self.assertIn('depoimentosGoTo', self.js)
        self.assertIn('ds-faq-card', self.js)


if __name__ == '__main__':
    unittest.main()
