# Villa Plaza Park — Landing Page Oficial

atualizado: 2026-09-15

## Resumo

Site institucional e comercial oficial do **Villa Plaza Park** (complexo de entretenimento e recreação infantil do Grupo Mais Barato em Belém/PA).

## Repositório Local

- **Caminho**: `C:\.PROJETOS - Sites 2026\site-villa-park`
- **Domínio**: `https://villaplazapark.com.br/`
- **Stack**: HTML5 semântico, Tailwind CSS (via CDN), CSS3 Canônico (`src/css/design-system.css`), JavaScript ES6 modular (`src/js/main.js`), Playwright / Python tests.

## Estrutura do Projeto

- `src/`: Código-fonte (`css/`, `js/`, `fonts/`).
- `assets/`: Mídias estáticas (`brand/`, `icons/`, `images/`, `Logos/`, `Pagina/`).
- `docs/`: Guias de identidade e design system.
- `.MD/`: Memória viva do projeto sincronizada com Obsidian.
- `tests/`: Suíte de testes automatizados com Playwright.

## Testes

Para executar a validação automatizada:
```bash
python -m unittest discover -s tests
```
