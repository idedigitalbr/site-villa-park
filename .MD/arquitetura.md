# Arquitetura do Projeto — Villa Plaza Park

atualizado: 2026-09-15

## Visão Geral

Landing page institucional de alta conversão do complexo infantil **Villa Plaza Park** (empresa do Grupo Mais Barato). Arquitetura estática limpa, modular e altamente otimizada para SEO local, acessibilidade (WCAG 2.1 AA) e performance mobile.

---

## Estrutura de Pastas e Diretórios

```
site-villa-park/
├── .MD/                              # Memória viva e sincronização do Obsidian
│   ├── plus/                         # Manuais em PDF e documentação complementar
│   └── *.md                          # changelog, arquitetura, checklist, etc.
├── assets/                           # Arquivos estáticos de mídia
│   ├── brand/                        # Manuais de marca e referências visuais
│   │   └── raw/                      # Arquivos brutos de identidade visual
│   ├── icons/                        # Ícones canônicos e favicons
│   ├── images/                       # Fotografias em WebP das atrações e espaços
│   ├── Logos/                        # Logotipos oficiais ativos da marca
│   └── Pagina/                       # Imagens de seções específicas da landing page
│       ├── S1 TOPO HERO/             # 3 artes oficiais do carrossel principal
│       ├── S3 BANNERZINHOS/          # 5 cards de destaques de atrações
│       ├── S3 SOBRE/                 # Imagens da seção institucional sobre o parque
│       ├── S4 BANNERS HORIZONTAIS/   # Banners promocionais de festas e eventos
│       └── SECAO CATEGORIAS REDONDO/ # 10 círculos de atrações do parque
├── docs/                             # Especificações técnicas e manuais de design
│   └── DESIGN-villaplazapark.md      # Tokens, cores, tipografia e diretrizes de design
├── src/                              # Código-fonte da aplicação
│   ├── css/                          # Folhas de estilo
│   │   └── design-system.css         # Design System canônico (:root tokens, tipografia)
│   ├── fonts/                        # Fontes locais tipográficas licenciadas
│   │   ├── Marvin-Round.woff2        # Tipografia oficial Marvin Round
│   │   └── MarvinRound.woff2
│   └── js/                           # Lógica cliente modularizada
│       └── main.js                   # FAQ, mobile drawer, carrosséis, modais e scrollspy
├── tests/                            # Testes de regressão visual e funcional (Playwright)
│   ├── test_category_section.py
│   ├── test_full_page_restoration.py
│   └── test_header_navigation.py
├── .gitignore                        # Regras do git (incluindo .recovery/ e temporários)
├── design-system-preview.html        # Página de visualização e documentação do Design System
├── favicon.ico                       # Fallback canônico na raiz para crawlers e navegadores
├── index.html                        # Página principal institucional
├── robots.txt                        # Diretivas de SEO e robôs de busca
└── sitemap.xml                       # Mapa do site indexável
```

---

## Decisões Técnicas

1. **Separação Rígida entre `src/` e `assets/`**:
   - `src/`: abriga tudo o que é código-fonte (CSS, JS, fontes locais tipográficas).
   - `assets/`: abriga exclusivamente arquivos de mídia estáticos (fotografias, logos, banners, ícones).
2. **Modularização de Scripts**:
   - Toda a lógica interativa (drawer mobile, carrosséis hero e banners, accordions, modais) foi extraída do HTML monolítico para `src/js/main.js`.
3. **Design System Centralizado**:
   - Importado como folha canônica em `src/css/design-system.css`, definindo as cores oficiais `#228137` (Verde) e `#ef7a2b` (Laranja), além das fontes `@font-face` Marvin Round.
4. **Suíte de Testes Automatizada**:
   - Playwright + unittest em `tests/`, garantindo integridade visual e funcional dos fluxos em headless Chromium.
