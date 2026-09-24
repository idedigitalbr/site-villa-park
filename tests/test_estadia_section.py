import os
import re
from playwright.sync_api import sync_playwright

WORKSPACE_DIR = r"c:\.PROJETOS - Sites 2026\site-villa-park"
HTML_PATH = os.path.join(WORKSPACE_DIR, "index.html")
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "assets", "brand", "estadia")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def test_html_structure():
    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html_content = f.read()

    assert '<section id="estadia"' in html_content, "A seção #estadia não foi encontrada no index.html!"
    assert "VALORES POR ESTADIA" in html_content, "Título 'VALORES POR ESTADIA' não encontrado!"
    assert "HORÁRIOS DE FUNCIONAMENTO" in html_content, "Título 'HORÁRIOS DE FUNCIONAMENTO' não encontrado!"

    # Check 5 cards in mobile and desktop
    assert "card-meia-hora" in html_content
    assert "card-uma-hora" in html_content
    assert "card-duas-horas" in html_content
    assert "card-cliente-mais-b" in html_content
    assert "card-pacote-vip" in html_content

    # Check 4 schedule pills
    pill_matches = re.findall(r'class="ds-estadia-pill-item"', html_content)
    assert len(pill_matches) == 4, f"Esperado 4 pills de horários, encontrado: {len(pill_matches)}"

    # Check prices
    for price in ["R$ 35", "R$ 49", "R$ 69", "R$ 59", "R$ 89"]:
        assert price in html_content, f"Preço {price} não encontrado no index.html!"

    # Check schedules
    for sched in ["FECHADO", "14H - 21H", "09H - 21H", "08H - 14H"]:
        assert sched in html_content, f"Horário {sched} não encontrado no index.html!"

    # Check assets in estadia folder exist
    expected_assets = [
        "wave-top-left.svg",
        "wave-bottom-right.svg",
        "rope-vector.svg",
        "wood-plank.svg",
        "pill-plank.svg",
        "icon-clock.svg",
    ]
    for asset in expected_assets:
        full_p = os.path.join(OUTPUT_DIR, asset)
        assert os.path.exists(full_p), f"Asset obrigatório ausente: {full_p}"

    print("[OK] Todos os testes de estrutura HTML e integridade de assets passaram com sucesso!")

def render_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. DESKTOP (1280 x 900)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.goto(f"file:///{HTML_PATH.replace(os.sep, '/')}")
        page.wait_for_timeout(1000)
        
        section_el = page.locator("#estadia")
        section_el.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        
        desktop_path = os.path.join(OUTPUT_DIR, "rendered_desktop.png")
        section_el.screenshot(path=desktop_path)
        print(f"[SCREENSHOT] Screenshot Desktop salvo: {desktop_path}")

        # 2. TABLET (768 x 1024)
        page_tablet = browser.new_page(viewport={"width": 768, "height": 1024})
        page_tablet.goto(f"file:///{HTML_PATH.replace(os.sep, '/')}")
        page_tablet.wait_for_timeout(1000)
        section_tab = page_tablet.locator("#estadia")
        section_tab.scroll_into_view_if_needed()
        page_tablet.wait_for_timeout(600)
        tablet_path = os.path.join(OUTPUT_DIR, "rendered_tablet.png")
        section_tab.screenshot(path=tablet_path)
        print(f"[SCREENSHOT] Screenshot Tablet salvo: {tablet_path}")

        # 3. MOBILE (390 x 844)
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto(f"file:///{HTML_PATH.replace(os.sep, '/')}")
        page_mobile.wait_for_timeout(1000)
        section_mob = page_mobile.locator("#estadia")
        section_mob.scroll_into_view_if_needed()
        page_mobile.wait_for_timeout(600)
        mobile_path = os.path.join(OUTPUT_DIR, "rendered_mobile.png")
        section_mob.screenshot(path=mobile_path)
        print(f"[SCREENSHOT] Screenshot Mobile salvo: {mobile_path}")

        browser.close()

if __name__ == "__main__":
    test_html_structure()
    render_screenshots()
