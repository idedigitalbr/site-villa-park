# Changelog — Villa Plaza Park

## 2026-09-16

- **Padronização Integral e Canônica do Design System no Site Oficial (`index.html` e `index2.html`)**:
  - Padronização de todas as tags de seção (`.ds-tag`): formato pílula horizontal (`border-radius: 9999px !important; transform: none !important;`), tipografia `Fredoka 700` uppercase com ícone temático à esquerda (variantes Verde `#e1f3e7`/`#05712b` e Laranja `#fef4e3`/`#fb4f02`).
  - Padronização de todas as headlines principais com `.ds-duotone-title`: tipografia Marvin Round 800, efeito duotone (`text-green` / `#FFFFFF` + `text-orange`) e raios de 3 feixes lúdicos SVGs canônicos em `#EF7A2B`.
  - Inserção da seção completa de **Passaporte por Tempo / Valores de Estadia** (`#estadia`) com 4 cards tracejados em creme e laranja (15 min R$20, 30 min R$35, 60 min R$50, Tempo Livre R$80).
  - Modernização da seção **Faça sua Festa** (`#clube`): 3 cards 3D interativos (Villa Aventura, Alegria, Diversão), grid de 11 comodidades e card lateral de conveniência.
  - Troca definitiva de imagens antigas/legadas de farmácia no carrossel de atrações e nos cards de filiais por fotos reais em alta resolução das atrações do Villa Plaza Park (Safari, Piscina de Bolinhas, Cama Elástica, Espaço Baby, Unidades Plaza e Tapanã).
  - Padronização de 100% dos botões de ação (16/16) seguindo a tipografia Fredoka com verbo em destaque (`<strong class="btn-bold">Verbo</strong> complemento >`).
  - Criação do novo repositório oficial no GitHub: `https://github.com/idedigitalbr/site-villa-park`.

## 2026-09-15

- **Integração Completa dos Protótipos Figma ao Design System (`design-system-preview.html`)**:
  - Análise aprofundada dos prints enviados pelo usuário (Pacotes Faça Sua Festa, Estrutura Completa de Eventos, Valores por Estadia, Banners de Urgência e Landing Page Completa).
  - Adição de novos tokens canônicos ao `src/css/design-system.css`: `--color-party-cream` (`#FDFBF7`), `--color-ticket-bg` (`#145424`), `--color-ticket-cream` (`#FFF4E6`), `--color-party-border-dashed`, `--color-doodle`, `--font-handwritten` (Caveat) e novos componentes.
  - Implementação de seções ricas e interativas no `design-system-preview.html`:
    1. **Pacotes Faça Sua Festa**: 3 cards completos (Villa Aventura, Villa Alegria, Villa Diversão) com ilustrações, menus detalhados de buffet (Kids, Adultos, Prato Principal, Sobremesas, Bebidas), badges de capacidade/preço e botões CTA.
    2. **Estrutura Completa da Festa**: Grid de 11 comodidades com ícones e rótulos, badge de capacidade (até 120 pessoas) e card lateral de conversão tracejado ("Agora só falta escolher a festa!").
    3. **Valores por Estadia**: 5 tickets picotados (Meia Hora, Uma Hora, Duas Horas, Cliente +B, Pacote VIP) e barra de horários da semana.
    4. **Destaques & Banners de Urgência**: Callout do megafone e cards de campanhas semanais.
    5. **Galeria de Telas do Figma**: Visualizador interativo das 4 telas de referência salvas em `assets/brand/figma-mockups/`.
  - Criação da documentação formal técnica do design system em `docs/DESIGN-villaplazapark.md`.
  - Suíte de testes Playwright 100% aprovada (`16 tests OK`).

- **Organização Geral da Arquitetura e Limpeza da Raiz**:
  - Separação canônica entre código-fonte (`src/`) e ativos estáticos (`assets/`).
  - Criação de `src/js/main.js` centralizando toda a lógica interativa (FAQ, mobile drawer, scrollspy, dynamic header, carrosséis hero e banners, modais de vídeo, privacidade e atendimento).
  - Correção de importação no `index.html` e `design-system-preview.html` para carregar `src/css/design-system.css` e fontes locais `src/fonts/` (eliminando erro 404 de assets/css).
  - Limpeza total da raiz: remoção de arquivos temporários (`scratch_marvin.dat`), arquivos legados de outro projeto (`DESIGN-maisbfarma.md`, logos antigos da farmácia) e movimentação de manuais e referências para `assets/brand/` e documentação de design para `docs/`.
  - Organização de ícones em `assets/icons/` preservando fallbacks na raiz para bots e navegadores.
  - Atualização do `.gitignore` incluindo `.recovery/` e arquivos de scratch.
  - Execução e validação de 100% da suíte de testes do Playwright (`16 tests OK`).

## 2026-07-08

- Sincronização inicial automática e mapeamento da estrutura do projeto.
