# Changelog — Villa Plaza Park

## 2026-10-14

- **Correção da Navegação e Passagem de Slides no Desktop (Carrossel de Destaques / S2)**:
  - **Resolução do Travamento no Desktop**: Identificado que no desktop (>= 1024px) o cálculo de offset travava o deslocamento em `0px` (`maxOffset = track.scrollWidth - viewport.clientWidth = 0`), impedindo os banners de passar ao clicar nas setas (`<` / `>`), nos dots ou ao arrastar.
  - **Carrossel Infinito com Clones Procedurais**: Implementada arquitetura de carrossel infinito contínuo utilizando a classe `.destaque-clone-wrap` canônica. O carrossel agora desliza 1 card por passo com rotação circular contínua em qualquer resolução (desktop, tablet e mobile), sem nunca travar ou exibir áreas vazias.
  - **Transição Suave & Reset Imperceptível**: O trilho desloca com transição CSS acelerada por GPU (`cubic-bezier(0.25, 1, 0.5, 1)`) e executa reset instantâneo e invisível ao alcançar os clones das extremidades.
  - **Sincronização Bidirecional dos Dots & Suporte a Drag**: Os dots de paginação atualizam dinamicamente com o card ativo em primeiro plano (1 a 4), e a interação via drag de mouse e swipe touch responde com precisão milimétrica.
  - **Autoplay Inteligente**: Adicionado ciclo de autoplay a cada 5 segundos com pausa automática ao passar o mouse (`mouseenter`), durante o drag ou ao trocar de aba no navegador.

- **Containerização Oficial Docker & CI com GitHub Actions**:
  - **Dockerfile Otimizado (Nginx Alpine)**: Criada a imagem oficial com compressão Gzip, cabeçalhos de segurança (X-Frame-Options, X-Content-Type-Options) e cache agressivo para fontes, imagens WebP e scripts.
  - **Docker Compose com Isolamento Total**: Arquivo `docker-compose.yml` configurado com porta parametrizada (`PORT:-8085`) e healthcheck automático, garantindo isolamento completo de outros containers existentes no servidor.
  - **Configuração de CI (`.github/workflows/docker-ci.yml`)**: Workflow automatizado para validação de build a cada push na branch `main`.
  - **Proteção de Arquivos (`.dockerignore`)**: Exclusão de pastas de testes, documentação e metadados para gerar uma imagem ultraleve (~25MB).

## 2026-10-10

- **Sangramento do Trilho de Cards de Atrações até a Borda Direita no Mobile (`#atracoes`)**:
  - Ajustado o container `.atracoes-cards-container` para sangrar perfeitamente até a parede da direita (`margin-right: -16px; width: calc(100% + 16px); padding-right: 0`), cancelando o padding lateral do container pai e eliminando a faixa amarela vazia após o card cortado.
  - O card cortado agora encosta 100% na borda da tela ("parede da direita"), oferecendo affordance intuitiva de carrossel contínuo, com margem de 16px garantida no último card (`:last-child`) ao final da rolagem.

- **Remoção de Botão Duplicado "Voltar ao Topo" no Rodapé**:
  - Removido o botão estático com seta para cima que estava posicionado no canto inferior direito da seção `#filiais` (`absolute bottom-2 right-2`).
  - Mantido exclusivamente o botão oficial flutuante dinâmico (`#backToTopBtn`), eliminando a sobreposição visual de dois botões no final da página.

- **Banner Responsivo Mobile para a Seção "Tudo Que a Festa Oferece" (`#clube`)**:
  - **Asset Dedicado para Mobile**: Copiado e integrado o arquivo `secao-mobile-tudo-que-festa-oferece.webp` (`assets/Pagina/SECAO FACA SUA FESTA/secao-mobile-tudo-que-festa-oferece.webp`), projetado na vertical (941x1672) exclusivamente para dispositivos móveis.
  - **Uso do Elemento `<picture>`**: Implementada alternância responsiva transparente via `<picture>` com `<source media="(max-width: 768px)">` servindo a versão vertical no mobile e mantendo o banner horizontal (`BANNER-SUA-FESTA-VILLA-PARK.png`, 1672x941) no desktop.
  - **Calibragem do Hotspot CTA**: Ajustada a área de clique transparente sobre o botão verde *"QUERO SABER MAIS >"* no mobile (`top: 85.5%; left: 27%; width: 49%; height: 6.5%`), garantindo clique/toque de alta precisão direto para o WhatsApp.


- **Correção da Transição Mobile: Valores por Estadia (`#estadia`) -> Pacotes Faça Sua Festa (`#clube`)**:
  - **Desobstrução do Botão CTA**: Eliminada a sobreposição da curva divisória sobre o botão *"Quero saber mais >"*, aumentando o espaçamento inferior no mobile (`padding-bottom: 84px` em `.ds-estadia-section` e `margin-bottom: 24px` em `.ds-estadia-cta-wrap` com `z-index: 25`), garantindo respiro confortável e área de toque 100% visível e clicável.
  - **Eliminação da Barra Verde e Conflito de Divisórias (Dobra)**: Identificado e corrigido o conflito entre a onda divisória procedural inferior de Estadia e o gráfico decorativo `.ds-party-wave-tl-fluid`, que injetava um bloco verde de 240px no topo da seção amarela no mobile. Ocultado o elemento conflitante no mobile (`hidden md:block` e `display: none !important`), mantendo uma única transição fluida, contínua e orgânica do verde floresta (`#016225`) para o amarelo festivo (`#FDE976`) com filete curvo laranja de acabamento.
  - **Calibragem do Bolo 3D no Mobile**: Ajustado o posicionamento do Bolo de Aniversário 3D (`top: -20px; right: -10px; width: clamp(95px, 24vw, 125px)`), emoldurando harmonicamente o canto superior direito sem invadir ou colidir com o título principal "PACOTES FAÇA SUA FESTA".

- **Seletor de Abas de Valores por Unidade (Tapanã & Plaza/Belém) na Seção Estadia (`#estadia`)**:
  - **Botões em Estilo Aba (Pill Tabs)**: Implementado seletor interativo com botões cápsula procedurais idênticos à referência visual do cliente (Anexo 2) — aba ativa em degradê laranja vibrante (`#FF6F26` a `#EF5A24`) e aba inativa translúcida com respiro, alternando instantaneamente entre **Tapanã** e **Plaza (Belém)**.
  - **Aba Tapanã (Ativa por padrão conforme Anexo 2)**: Exibe os 4 cards da unidade: *Meia Hora* (R$ 35,00), *Uma Hora* (R$ 49,00), *Duas Horas* (R$ 69,00) e o novo card *Excedente (por minuto)* (R$ 1,00) com estandarte drapeado em tecido roxo/violeta procedural (`.banner-purple`).
  - **Aba Plaza (Belém)**: Ao clicar, exibe os 5 cards completos da unidade Plaza: *Meia Hora* (R$ 35,00), *Uma Hora* (R$ 49,00), *Duas Horas* (R$ 69,00), *Cliente +B* (R$ 59,00) e *Pacote VIP* (R$ 89,00).
  - **JavaScript & Acessibilidade**: Implementada a função nativa `switchEstadiaTab(unit)` com controle completo de ARIA (`role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`), transição suave de fade (`fadeInEstadia`), e suporte responsivo tanto para desktop quanto para carrossel horizontal touch no mobile.
  - **Suíte de Testes Automatizados**: Atualizado `tests/test_estadia_section.py` validando tabs, ambos os painéis, todos os cards e preços.

- **Ajustes de UI e Interatividade Mobile (S1 Topo e S2 Destaques)**:
  - **Ocultação do Solzinho e Nuvem 3D no Mobile (S1 Topo)**: Ocultados no mobile (`hidden md:block` e regra CSS específica) os elementos decorativos do Sol 3D Sorridente e da Nuvem 3D Sorridente sobre o banner da Hero, eliminando obstrução visual e melhorando a legibilidade.
  - **Carrossel Interativo de Destaques (S2 Destaques)**: Implementada a lógica interativa completa em JavaScript (`destaquesNext`, `destaquesPrev`, `destaquesGoTo`) com suporte nativo a swipe touch suave, drag com mouse, navegação por setas e atualização dinâmica dos dots.
  - **Sangria do Segundo Card na Borda Direita**: Configurado o carrossel no mobile para sangrar até a parede direita (`margin-right: -16px; width: calc(100% + 16px)` com remoção de raio e padding na extremidade direita), garantindo que o segundo card fique visível cortado rente à borda da tela ("encostado na parede da direita").
  - **Título do Card CTA em Linha Única**: Ajustado o título "Garanta agora sua diversão!" com `white-space: nowrap`, tipografia responsiva calibrada e botão full-width no mobile, garantindo que o texto caiba perfeitamente em apenas uma linha.

- **Ajustes de UI Mobile na Seção de Atrações (`#atracoes`)**:
  - **Recuo do Brinquedão 3D**: Ajustado o posicionamento mobile (`transform: translateX(-68%)` a `-72%` e largura calibrada) para afastar o elemento do centro, garantindo que o tubo 3D permaneça apenas como detalhe decorativo na borda lateral esquerda sem sobrepor o headline "O QUE VOCÊ ENCONTRA NO VILA PARK".
  - **Separação Vertical Headline e Dots**: Elevado o container de texto dos slides principais (`bottom-8 sm:bottom-5 md:bottom-6`) em relação aos dots de navegação (`bottom-2 sm:bottom-3`), criando respiro limpo e eliminando a colisão entre o título e os dots.
  - **Novo Trilho Horizontal dos Cards no Mobile**: Substituído o layout comprimido de 5 colunas por um carrossel horizontal de rolagem suave com snap (`overflow-x-auto snap-x snap-mandatory no-scrollbar`), cards com largura adequada (`w-[138px]`), fotos nítidas e ampliadas (proporção 16:10), títulos completos sem truncamento e sincronização automática via JavaScript para centralizar o card ativo no trilho ao mudar de slide. No desktop (`sm:`), mantido o grid alinhado de 5 colunas.
  - **Ocultação do Detalhe Laranja no Mobile**: Ocultada a ponta/curva laranja da transição T3 no mobile (`.atracoes-orange-detail hidden sm:inline`), preservando a transição suave e limpa diretamente para o relevo verde de Estadia.

- **Redes Sociais Oficiais no Rodapé e Cabeçalho**:
  - Restringidos os links de redes sociais exclusivamente aos 3 canais oficiais solicitados pelo cliente: **Instagram** (`@villaplazapark`), **TikTok** (`@villaplazapark`) e **Facebook** (`Villa Park Plaza`).
  - Removidos os ícones/links não citados (WhatsApp e YouTube) da seção de redes sociais no rodapé, cabeçalho superior e gaveta mobile.
  - Atualizados os metadados de dados estruturados Schema.org (`sameAs`).

- **Remoção do Bloco de Horários na Seção Valores por Estadia (`#estadia`)**:
  - Removido o bloco inferior com o título "HORÁRIOS DE FUNCIONAMENTO" e as 4 cápsulas de madeira (Segunda, Terça à Quinta, Sexta à Sábado, Domingo), mantendo a seção focada exclusivamente nos valores dos passaportes e no botão de ação "Quero saber mais".
  - Atualizado o rótulo da seção (`aria-label="Valores por Estadia"`) e o link no menu lateral drawer mobile para "Passaportes".
  - Atualizada a suíte de testes estruturais (`tests/test_estadia_section.py`).

- **Atualização do Conteúdo do FAQ (Dúvidas Frequentes)**:
  - **Unidades & Endereços**: Atualizada a resposta de localização contemplando as duas unidades em Belém (PA) — +B Plaza (Av. Gov. José Malcher, 2388, São Brás) e +B Tapanã (Rod. do Tapanã, 597).
  - **Horários de Funcionamento**: Atualizados os cronogramas de operação de ambas as unidades (Plaza e Tapanã, incluindo fechamento às segundas na unidade Tapanã).
  - **Faixa Etária Permitida**: Especificadas as diretrizes por filial (Tapanã até 1,35m de altura; Plaza até 14 anos).
  - **Compras e Restaurante Villa Plaza**: Atualizada a pergunta e resposta para contemplar compras no supermercado e a experiência gastronômica no Villa Plaza.
  - **Festas e Cobrança de Passaporte**: Unificada a comunicação de orçamentos e passaportes com direcionamento para as recepções e WhatsApp de atendimento.

## 2026-09-25

- **Remoção do Botão Ofertas no Header**:
  - Removido o botão/link "Ofertas" (com ícone de tag) da barra de navegação direita do cabeçalho (`#nav-right`), mantendo o foco no CTA principal de contato.
  - Atualizada a suíte de testes de navegação (`tests/test_header_navigation.py`), com 100% dos testes aprovados.

- **Atualização do Link de Desenvolvedor no Rodapé**:
  - Atualizado o link de destino da logo `idedigital` no rodapé de `https://ide.digital` para `https://digital.ideinstituto.com.br/`, abrindo em nova guia (`target="_blank" rel="noopener noreferrer"`).

- **Ajustes de UI no Rodapé & Eliminação de Conflitos Cenográficos**:
  - **Remoção de Slogan**: Removido o texto "Diversão que fica na memória!" que ficava posicionado entre o logotipo principal e a linha divisória branca.
  - **Centralização e Zona de Segurança da Barra Inferior**: Redesenhada a linha de copyright, termos e créditos (`max-w-2xl mx-auto flex items-center justify-center`) com espaçamento equilibrado e separadores discretos, eliminando completamente a dispersão lateral e garantindo recuo de segurança para evitar colisão/sobreposição com as nuvens e balão 3D em notebooks e monitores (1366px, 1280px, 1920px).
  - **Logo Oficial idedigital**: Substituído o link de texto por `assets/Logos/logo-idedigital.png` com link oficial para `https://ide.digital`, transição hover sutil e alinhamento visual preciso com o texto "Desenvolvido por:".
  - **Remoção de Divisória & Refinamento dos Ícones Sociais**: Removida a linha divisória branca acima dos botões de redes sociais e reduzido o diâmetro dos botões circulares (de 36px/40px para 28px/32px) para uma estética mais leve, fluida e equilibrada com o logo.
  - **Calibração Visual Pixel-Perfect (Fidelidade Anexo 2)**: Ampliado o respiro vertical geral do rodapé (`mt-7 sm:mt-9 lg:mt-11 pb-8 sm:pb-10`), espaçamento do logotipo (`mb-6 sm:mb-7`), botões sociais mais compactos e delicados (24px/26px, `text-[10px] sm:text-[11px]`) e respiro generoso (`mb-6 sm:mb-7`) antes da linha de créditos (`pt-3.5 sm:pt-4`).
  - **Responsividade e Testes**: Otimizado empilhamento limpo em dispositivos móveis e atualizadas as asserções da suíte de testes (`tests/test_full_page_restoration.py`), aprovada com 100% de sucesso.

## 2026-09-24

- **Transições Visuais Orgânicas Sutis entre Seções (Layout Fluido & Não-Linear)**:
  - **Eliminação de Divisões Retas Horizontais**: Substituídos os cortes secos entre seções por divisórias orgânicas, fluidas e naturais, eliminando o aspecto de blocos retangulares empilhados.
  - **Variação Não-Repetitiva de Ritmo e Geometria**:
    - **T1 (Destaques ➔ Sobre)**: Elevação suave do branco pelo canto inferior esquerdo e prolongamento curvo verde Villa Park (`#228137`) no canto direito abraçando a base do Brinquedão Modular 3D.
    - **T2 (Sobre ➔ Atrações)**: Base plana e nivelada no lado esquerdo sob o peso do Tobogã 3D, com colina amarela suave (`#FDEA76`) e forma arredondada laranja (`#EF7A2B`) entrando pelo canto superior direito.
    - **T3 (Atrações ➔ Estadia)**: Curva orgânica laranja integrada no canto superior esquerdo fluindo para o verde floresta (`#016225`), vale suave central dando respiro à manchete e subida suave à direita apoiando a cerca 3D.
    - **T4 (Estadia ➔ Faça Sua Festa)**: Curva fluida integrada aos elementos verde e laranja da lateral esquerda, ondulação dupla suave pelo centro e elevação sutil no canto direito emoldurando o Bolo 3D de aniversário.
    - **T5 (Faça Sua Festa ➔ Palco Céu / Depoimentos)**: Dupla curvatura suave em dois níveis (abertura orgânica relaxada em 'S') com filete translúcido de acabamento, integrando-se na lateral direita sob a Estrela 3D sorridente.
  - **Preservação Estrita**: Primeira seção do topo (Hero em nuvens) e última seção (Nossas Unidades & Rodapé Figma) mantidas 100% intocadas.
  - **Validação Responsiva**: Renderização impecável validada em Desktop (1280px) e Mobile (390px) via screenshots reais.

- **Resolução Definitiva 100% Pixel-Perfect do Rodapé e Unidades (Anexo 1 vs Anexo 2)**:
  - **Eliminação do "Vão Branco no Meio"**: Removido `justify-between` e reorganizado o fluxo vertical do Card Branco. Badge, título display ("Sempre pertinho de você!"), subtítulo e a grade de 4 features agora fluem com espaçamento balanceado e harmônico, sem vazios artificiais.
  - **Eliminação da Sobreposição da Estrela 3D com "Fácil Acesso"**: A grade de features recebeu recuo horizontal à esquerda (`pl-8 sm:pl-14 lg:pl-18 xl:pl-22`) e a estrela 3D sorridente foi ancorada no canto inferior esquerdo externo, garantindo mais de 100px de distância segura da primeira feature (zero colisão visual).
  - **Alinhamento da Base dos 3 Cards e Altura das Fotos**: Fotos dos Cards Google Maps ampliadas para 250px (proporção 2:1 idêntica ao Figma), alinhando a base inferior dos 3 cards no mesmo nível horizontal (`diff: 0px`).
  - **Imersão Total do Rodapé na Onda Verde (#027C4F)**: Ajustada a crista e patamar da onda orgânica no SVG de fundo para iniciar exatamente na base dos cards (`y=740`), garantindo que o logotipo completo oficial (`logo-villa-plaza-park-white.png`), slogan, divisor e os 4 botões sociais fiquem 100% contidos dentro do verde floresta com contraste e nitidez absolutos.
  - **Carregamento Imediato**: Definido `loading="eager"` para as fotos dos mapas e elementos 3D cenográficos, garantindo render instantâneo.
  - **Validação de Sintaxe**: 100% das tags HTML balanceadas (69 divs, 8 links, 9 botões, 24 SVGs).


- **Ajuste Full-Width da Seção Valores por Estadia & Horários (`#estadia`)**:
  - Eliminação de qualquer borda/espaçamento cinza ou branco ao redor da seção (`bg-[#F8FAF9]` removido do container externo).
  - Background verde gradiente floresta (`#016225` a `#01561F`) expandido para 100% de largura total de tela (edge-to-edge).
  - Ondas orgânicas nos cantos superior-esquerdo (`wave-top-left.svg`) e inferior-direito (`wave-bottom-right.svg`) posicionadas nas extremidades da tela, com textura sutil e container centralizado para os estandartes e horários em tábuas de madeira.

- **Atualização da Suíte de Testes Automatizados**:
  - Atualizadas asserções legadas em `tests/test_full_page_restoration.py` e `tests/test_atracoes_section.py`, com 100% dos testes aprovados com sucesso.

## 2026-09-23

- **Reescrita 100% Nativa em Código da Seção Valores por Estadia & Horários (`#estadia`)**:
  - Eliminação total de qualquer imagem raster recortada (`cards-row-full.webp`, `card-*.webp`, `pill-*.webp`).
  - **Varal Contínuo Vetorial SVG**: Criado `rope-vector.svg` com entrelaçamento helicoidal de 3 filamentos de juta e iluminação cilíndrica contínua correndo atrás de todos os cards.
  - **Tábuas de Madeira Procedurais**: Criado `wood-plank.svg` e estilos CSS com textura orgânica de bétula/pinus, anéis de crescimento, chanfros 3D e texto entalhado em `Marvin Round` 800 (`color: #3E1A05; text-shadow: 0 1px 0 rgba(255,255,255,0.7), 0 -1px 1px rgba(0,0,0,0.25)`).
  - **Estandartes de Tecido em CSS Puro**: Dobras e ondulações verticais realistas (*draping*) sintetizadas via shader de luz/sombra em gradientes multi-stop com barra ondulada em `clip-path` nas 5 cores canônicas. Preços vivos em `Marvin Round` 800 branco com sombra 3D.
  - **Cápsulas de Horários em Madeira & Relógio SVG**: Pílulas procedurais em SVG/CSS (`pill-plank.svg`), ícone de relógio analógico em SVG puro (`icon-clock.svg`) e horários em texto vivo.
  - **Micro-interações e Responsividade**: Efeito de elevação física pendular no hover (`rotate(-0.5deg)`), scroll-snap horizontal no mobile com corda contínua e ausência de overflow.
  - Testes automatizados aprovados em `tests/test_estadia_section.py`.

## 2026-09-18

- **Auditoria Pós-Apagão & Mapeamento de Próximos Passos (`.MD/proximos-passos.md`)**:
  - Varredura forense completa de todos os 7 chats e tarefas executadas em 17/09 interrompidas pela queda de energia.
  - Levantamento do status real de cada seção: Botões (100%), Sobre (100%), Estadia (100%), Atrações (90%), Festas (75%), Depoimentos/FAQ (75%) e Footer/Unidades (0% - maior GAP).
  - Elaboração do plano de ação executivo com priorização estrita, referências visuais do Figma e prompt mestre para retomada.

- **Refatoração do Carrossel de Depoimentos (`#depoimentos`)**:
  - Implementação de carrossel dinâmico em formato Reels/Vídeo (`ds-reels-slider`, `ds-reel-card`) com navegação interativa por setas e transições suaves de offset.
  - Adição de suporte completo a gestos touch swipe em dispositivos móveis (`touchstart` e `touchend`).
  - Bloco editorial dinâmico com citação em destaque, avaliação por estrelas, autor, papel/relação e filial de referência, sincronizado a cada troca de slide.

- **Modernização e Padronização do FAQ (`#faq`)**:
  - Introdução do container cenográfico `ds-sky-stage` com gradiente azul céu e elementos orgânicos decorativos.
  - Reestruturação dos cards de perguntas frequentes com a nova classe canônica `ds-faq-card`, chevron rotativo e painéis expansíveis.
  - Atualização da função `toggleFaq()` em `src/js/main.js` para suportar nativamente a nova estrutura.

- **Aprimoramentos no Design System e Suíte de Testes**:
  - Inclusão dos estilos correspondentes em `src/css/design-system.css`.
  - Atualização de assets complementares e testes automatizados.

## 2026-09-17

- **Reorganização dos Elementos 3D da Seção Destaques (`#ofertas`)**:
  - **Nuvem 3D da Direita**: Elevada para a parte superior direita da seção (`top: -8px; right: -22px; width: clamp(130px, 17vw, 225px); z-index: 25;`), ficando bem próxima ao topo e com suave projeção orgânica na margem direita.
  - **Brinquedão Modular 3D**: Reposicionado para a parte inferior direita (`bottom: 20px; right: -40px; width: clamp(250px, 30vw, 420px); z-index: 15;`), criando uma separação visual nítida e confortável em relação à nuvem, eliminando qualquer sobreposição.
  - **Nuvem Inferior Esquerda**: Elemento `nuvem-sorridente-3d.webp` removido integralmente da seção, proporcionando um layout mais limpo e equilibrado com apenas o Balão 3D na lateral esquerda.


- **Implementação de Alta Fidelidade da Seção "Valores por Estadia & Horários de Funcionamento" (`#estadia`)**:
  - Criação da seção completa com container master em verde floresta profundo (`#016225` a `#01561F`), cantos arredondados (`42px` desktop, `28px` mobile) e sobreposição sutil de fotografia de parque infantil (`Criancas-brincando-parque-infantil-visao-ampla.webp`).
  - Ondas orgânicas canônicas em laranja nos cantos superior-esquerdo (`wave-top-left.svg`) e inferior-direito (`wave-bottom-right.svg`).
  - **Bloco 1 (Valores por Estadia)**: Pre-header `CONFIRA OS NOSSOS` e título principal `VALORES POR ESTADIA` em tipografia `Marvin Round` 800 com efeito sticker 3D (laranja vibrante com contorno branco espesso e drop-shadow). Composição com os 5 cards suspensos em varal contínuo de corda trançada (`rope-full.webp`):
    - *Meia Hora*: Estandarte amarelo dourado | `R$ 35,00`
    - *Uma Hora*: Estandarte rosa chiclete / magenta | `R$ 49,00`
    - *Duas Horas*: Estandarte azul turquesa | `R$ 69,00`
    - *Cliente +B (até 1h30)*: Estandarte pink / fúcsia | `R$ 59,00`
    - *Pacote VIP (até 4 horas)*: Estandarte azul royal | `R$ 89,00`
    - Hotspots interativos e acessíveis (`ds-estadia-hotspot-btn`) em cada card direcionando ao modal de agendamento/contato.
  - **Bloco 2 (Horários de Funcionamento)**: Título central `HORÁRIOS DE FUNCIONAMENTO` flanqueado por linhas horizontais em verde neon vibrante (`#00E650`), acompanhado de 4 cápsulas (pills) em madeira clara com ícone analógico de relógio marrom chocolate e horários entalhados:
    - *Segunda*: `FECHADO`
    - *Terça à Quinta*: `14H - 21H`
    - *Sexta à Sábado*: `09H - 21H`
    - *Domingo*: `08H - 14H`
  - **Responsividade & Acessibilidade**:
    - Desktop / Tablet: Fileira unificada de alta resolução Retina 2x (`cards-row-full.webp`) com varal contínuo e 4 cápsulas em 4 colunas ou 2x2.
    - Mobile: Carrossel touch com scroll-snap suave (`ds-estadia-cards-scroll`), micro-dica de navegação por toque e pills em grid 2 colunas perfeitamente legíveis, com zero overflow horizontal testado de 320px a 1280px.
    - Botão CTA pílula padronizado conforme padrão oficial: `<strong class="btn-bold">Quero</strong> saber mais >`.
  - Suíte de testes automatizados Playwright (`tests/test_estadia_section.py`) criada e aprovada com 100% de sucesso.


- **Deslocamento Horizontal de ~40% do Brinquedão 3D e Reposicionamento da Cerca no Canto Inferior Direito (`#atracoes`)**:
  - Implementação da estrutura com `.atracoes-brinquedao-wrap` e `.atracoes-brinquedao-inner` utilizando `transform: translateX(-40%)` no desktop e ajustes calibrados para tablet (`-50%`) e mobile (`-52%`).
  - Preservação rigorosa e 100% intacta da escala, altura, proporção e resolução da imagem 3D, sem qualquer distorção ou encolhimento.
  - Projeção de aproximadamente 40% do asset para fora da tela (margem esquerda cortada), mantendo 60% visível na página e ampliando substancialmente o respiro visual para o carrossel central e os 5 cards de atrações.
  - Reposicionamento da **Cerca Colorida 3D** (`.atracoes-cerca-wrap`) para o canto inferior direito elevado (`bottom: clamp(50px, 7vw, 85px); right: -75px;`), reproduzindo com fidelidade a composição do Figma e deixando a área superior direita aberta e limpa.
  - Isolamento completo do deslocamento horizontal em relação às animações flutuantes (`anim-float-gentle`, `anim-float-reverse`) e efeito de parallax (`data-parallax="0.03"`).
  - Adição de testes automatizados específicos (`test_brinquedao_horizontal_displacement`, `test_cerca_position_lower_right`) em `tests/test_atracoes_section.py`, com 6 testes aprovados (100% OK).

- **Reposicionamento da Nuvem 3D e Eliminação da Linha Entre Áreas Laranjas**:
  - **Nuvem 3D da Direita**: Removida da seção Hero verde (`#home`) e inserida nativamente na lateral direita da seção Destaques (`#ofertas`), utilizando o container da própria seção como referência (`position: relative`), com `top: 15px; right: -15px; z-index: 25;`, sem subir para o verde e mantendo a lógica de objetos 3D decorativos.
  - **Remoção da Linha Horizontal**: Eliminado o artefato de linha de antialiasing entre o SVG de transição e a seção `#ofertas` através de preenchimento laranja na base do SVG (`<rect y="70" width="1440" height="115" fill="#F15A24"/>`), extensão da base do path vetorial e sobreposição subpixel precisa (`-mt-1.5`) em `#ofertas`, tornando o fundo perfeitamente contínuo.


- **Ajuste Cirúrgico de Posicionamento dos Elementos 3D (Giz / Amarelinha)**:
  - Remoção completa do elemento de giz / amarelinha 3D (`amarelinha-giz-colorido-3d.webp`) da seção `#atracoes`, mantendo-a estritamente com os dois assets 3D solicitados: o **Brinquedão Gigante com Tobogã e Piscina de Bolinhas** na margem esquerda e a **Cerca Colorida do Parquinho** na borda direita.
  - Alocação do giz / amarelinha 3D exclusivamente na seção anterior (`#sobre`), reforçando a identidade lúdica da colagem de fotos sem interferir na seção amarela de atrações.
  - Atualização dos testes automatizados Playwright (`test_atracoes_section.py`) com 100% de aprovação.

- **Calibração Visual de Alta Fidelidade da Seção de Atrações (Fidelidade Estrita ao Anexo 2 / Figma)**:
  - Redimensionamento do Brinquedão 3D para escala monumental (`width: clamp(480px, 46vw, 680px)`), com ~45% cortado na margem esquerda e base de bolinhas passando por trás dos cards 1 e 2.
  - Ampliação da Cerca 3D (`width: clamp(260px, 26vw, 380px)`) encostada na borda direita com o poste verde e pinos amarelos destacados.
  - Alinhamento em 100% da largura horizontal compartilhada (`max-w-[860px]`) entre o carrossel panorâmico e o grid dos 5 cards.
  - Compactação dos espaçamentos verticais e encaixe direto da curva verde de "Valores por Estadia" sobre o fundo amarelo `#FDEA76`.

- **Remoção Completa das Seções "Passaporte por Tempo" e "Tudo que a Festa Oferece"**:
  - Exclusão integral da seção `<section id="estadia">` ("VALORES POR ESTADIA NO PARQUE / PASSAPORTE POR TEMPO"), eliminando os 4 cards de tarifas (15m, 30m, 60m e TEMPO LIVRE) e a faixa amarela correspondente.
  - Exclusão integral do bloco `ds-features-box` ("TUDO QUE A FESTA OFERECE"), removendo a grade com os 11 itens de comodidades e o card lateral de apoio "Festa 100% sem Estresse" da seção de pacotes de festas (`#clube`), preservando exclusivamente os 3 cards principais de pacotes de aniversário (*Villa Aventura*, *Villa Alegria* e *Villa Diversão*).
  - Ajuste ergonômico no espaçamento inferior (`pb-12 sm:pb-16 md:pb-20`) da seção de atrações (`#atracoes`), garantindo transição visual contínua e harmônica diretamente para a seção de festas (`#clube`).
  - Atualização dos testes automatizados Playwright para validar a sequência e a integridade da página sem erros de ancoragem ou layout.

- **Padronização Visual Oficial de Todos os Botões (Fidelidade Canônica ao Anexo `media_1789673023424.png`)**:
  - Implementação estrita e canônica das especificações visuais do botão padrão em todos os pontos do layout:
    - **Formato**: Pílula contínua perfeita (`border-radius: 9999px !important`), eliminando qualquer variação chanfrada ou quadrada;
    - **Tipografia**: Família `Fredoka` com renderização suave e lúdica;
    - **Hierarquia de Peso**: Primeira palavra da ação em negrito encorpado (`font-weight: 700`, `<strong class="btn-bold">Quero</strong>`) e complemento em peso regular 400 (" saber mais");
    - **Seta Direcional**: Chevron `>` estilizado ao final com microinteração de avanço suave no hover (`transform: translateX(4px)`);
    - **Glow Shadow & Cores**: Fundo verde floresta `#0c6830` com glow verde (`box-shadow: 0 8px 20px rgba(12, 104, 48, 0.38)`) e laranja institucional `#f16719` com glow laranja (`box-shadow: 0 8px 20px rgba(241, 103, 25, 0.38)`);
    - **Cards de Destaques (S3)**: Substituído o estilo mini-badge por botões em largura total perfeitamente centralizados na base de cada card, reproduzindo exatamente o mockup oficial;
    - **Header, Seção Sobre, Megafone e Modais**: Eliminados gradientes divergentes, inline styles e cantos retos, unificando 100% da interface sob o mesmo padrão.
  - Suíte de testes automatizados Playwright (`test_sobre_section.py`, `test_header_navigation.py`, `test_atracoes_section.py`) executada com 100% de sucesso.

- **Padronização Global de Copy dos Botões de Ação para "Quero saber mais"**:
  - Unificação de todos os botões de conversão e chamada para ação (CTA) do site com o texto oficial **"Quero saber mais"**:
    - **Header (Desktop & Mobile)**: Botão de ação rápida na barra superior;
    - **Menu Drawer Mobile**: Botão principal de atendimento;
    - **Hero Principal (S1)**: Botões primários e secundários dos 3 slides;
    - **Cards de Destaques (S2)**: 4 botões pílula dos cards temáticos;
    - **Faixa de Conversão**: Botão do card horizontal "Garanta agora sua diversão!";
    - **Seção Sobre o Villa Plaza Park (S5)**: Botão pílula da seção institucional;
    - **Seção Passaporte por Tempo (S5.5)**: Botão principal da tabela de valores;
    - **Seção Pacotes Faça sua Festa (S6)**: Botões dos cards e do box lateral de apoio;
    - **Modal de Contato / WhatsApp**: Botões de direcionamento para recepção e orçamentos.
  - Atualização dos testes automatizados Playwright com 100% de aprovação.

- **Modernização Visual da Seção "SOBRE O VILLA PLAZA PARK" (Fidelidade ao Print de Referência)**:
  - Substituição do layout anterior com vídeo estático único por uma colagem dinâmica de 4 fotografias em alta definição com cantos arredondados (`rounded-[26px]` e `rounded-[22px]`), microinterações no hover (`scale-105`) e acionamento interativo do modal de vídeo.
  - Alinhamento tipográfico de alta precisão com a referência do cliente:
    - Badge pílula suave `★ SOBRE O VILLA PLAZA PARK` em tom pêssego com texto e estrela laranja vibrante;
    - Título duotone display com "ONDE A IMAGINAÇÃO" acompanhado de dois traços lúdicos inclinados em laranja e "GANHA VIDA" em destaque na linha seguinte;
    - Descrição institucional com leitura agradável e equilibrada;
    - Lista de 3 diferenciais com ícones circulares em verde escuro `#136637` e checkmarks brancos;
    - Botão CTA pílula "Conhecer o parque >" em verde escuro com sombra suave elevada.
  - Fundo branco puro `#FFFFFF` destacando as cores vivas da colagem fotográfica e mantendo total consistência e responsividade entre desktop, tablet e mobile.

- **Implementação da Seção "O QUE VOCÊ ENCONTRA NO VILA PARK" (Fidelidade ao Mockup `media_1789669910531.png`)**:
  - Nova seção `S5.2 (#atracoes)` inserida logo após a seção institucional `#sobre` ("ONDE A IMAGINAÇÃO GANHA VIDA") e imediatamente anterior à seção `#estadia`.
  - Fundo amarelo solar `#FDEA76` com emolduramento lúdico 3D:
    - Lateral esquerda: `brinquedao-toboga-piscina-bolinhas-3d.webp` (tobogã verde tubular e piscina de bolinhas na base com animação flutuante);
    - Lateral direita: `cerca-colorida-parquinho-3d.webp` (cerca colorida com parafusos redondos amarelos e ripas laranja/amarela);
    - Canto superior direito: `amarelinha-giz-colorido-3d.webp` (giz rosa/azul e quadrado "1").
  - Header centralizado com badge circular laranja com ícone de arte/criatividade, eyebrow "CONFIRA" em verde `#0D6E2A` e título display duotone "O QUE VOCÊ ENCONTRA NO VILA PARK".
  - Carrossel principal em destaque (`rounded-3xl` / 24px) com fotos em alta definição das atrações, botões laterais de navegação escuros com chevrons brancos, dots de paginação e legendas informativas.
  - Grid com 5 cards inferiores de atrações (Piscina de Bolinhas, Escorregadores, Área Baby, Brinquedão Safari e Espaço Família) com clique sincronizado ao slide principal.
  - Módulo interativo JavaScript (`src/js/main.js`) com suporte a touch/swipe mobile, pausa no hover, navegação por teclado e transições suaves.
  - Estilização canônica em `src/css/design-system.css` com tratamento responsivo completo para mobile, tablet e desktop.

- **Ajuste Cirúrgico da Transição Orgânica em Nuvens (Fidelidade ao Anexo `media_1789594201176.png`)**:
  - Remodelado o formato vetorial SVG da transição entre S1 (Hero Verde) e S2 (Destaques Laranja) para reproduzir fielmente a silhueta orgânica e assimétrica aprovada pelo cliente.
  - Composição de 5 domos principais alternados por suaves arcos conectores nos vales, eliminando o padrão de ondas repetitivas artificiais.
  - Remoção completa de linhas e sombras escuras/marrons sobrepostas, garantindo junção limpa, vibrante e contínua em `#F15A24`.
  - Encaixe preciso do domo central sob os indicadores (3 dots) do carrossel Hero.

## 2026-09-16

- **Calibração Visual 100% Fiel ao Mockup Aprovado (Hero S1, Transição e Destaques S2)**:
  - Hero S1: Banner com proporção imersiva vertical (~1.85:1, min-height 480px no desktop), eliminando excesso de vazio verde; indicadores de 3 dots brancos colados à base do banner; Sol 3D ampliado transbordando com presença no topo direito; Nuvens 3D laterais em escala proporcional conectando a transição.
  - Transição em Nuvens (*Puffy Cartoon Clouds*): Substituída a onda simples por sucessão de arcos circulares volumosos em gomos com camada de profundidade e preenchimento sólido laranja (`#F15A24`).
  - Destaques S2: Formato dos 4 cards ajustado para proporção harmônica (~4:4.85) com cantos ultra arredondados (`rounded-[26px]`), overlay gradiente e botões pílula interativos integrados na base de cada card (`APROVEITE >`, `SAIBA MAIS >`, `FAÇA SUA FESTA >`, `CONHEÇA >`).
  - Decoração 3D de Grande Escala: Balão 3D e Brinquedão Modular 3D ampliados para emoldurar o grid de cards com riqueza visual e profundidade.
  - Card Inferior CTA: Formato pílula contínuo (`rounded-full`) com ícone de megafone e botão laranja de alta conversão.

- **Unificação para Arquivo Único (`index.html`) e Remoção da Seção de Depoimentos**:
  - Removido o arquivo duplicado `index2.html` da raiz, mantendo estritamente apenas o arquivo principal canônico `index.html`.
  - Removida integralmente a seção de avaliações do Google em formato marquee com cards escuros (`#depoimentos`).
  - Removidos os links correspondentes à âncora `#depoimentos` na barra superior institucional e no drawer menu mobile.
  - Ajustada a transição da seção seguinte (`#filiais`), aplicando topo arredondado (`rounded-t-[28px] sm:rounded-t-[36px]`) e espaçamento proporcional para conexão visual perfeita com a seção FAQ.

- **Refatoração Visual de Alta Fidelidade das 2 Primeiras Dobras (Hero S1, Transição e Destaques S2)**:
  - Header: Barra superior verde compacta (`#0D5E24`), navbar simétrica e botões de ação em gradiente laranja vibrante (`#FF6F26` -> `#EF5A24`) com microinterações.
  - S1 — Topo / Hero Verde: Cenário temático verde (`#0B6E2A`) com banner panorâmico centralizado (`rounded-[32px]`), indicadores de 3 dots brancos abaixo do banner, e composição lúdica de elementos 3D (Sol Sorridente 3D transbordando no topo direito, Nuvem 3D na borda esquerda e Nuvem 3D na borda direita).
  - Transição Orgânica em Nuvens/Bolhas: Divisor vetorial SVG de dupla camada (sombra e preenchimento sólido `#F15A24`) unindo S1 e S2 perfeitamente.
  - S2 — Destaques Laranja: Cenário temático laranja vibrante (`#F15A24`), headline estilizada "CONFIRA OS NOSSOS / DESTAQUES", grid de 4 cards promocionais 3:4 com hover sutil, decoração 3D lateral (Balão de ar quente 3D, Nuvem 3D e Brinquedão Modular 3D) e card horizontal inferior de conversão com megafone e botão direto para WhatsApp.
  - Animações & Parallax: Implementação de microinteração parallax suave em `requestAnimationFrame` (`data-parallax`) e animações ambientes (`floatGentle`, `sunFloat`), respeitando estritamente `prefers-reduced-motion`.
  - Sincronização entre `index.html` e `index2.html`.

- **Remoção da Barra de Categorias Circulares do Site Principal e Arquivamento no Design System**:
  - Removida a seção de stories/categorias circulares (`#categorias`) de `index.html` e `index2.html`.
  - Removido o item de navegação correspondente no drawer menu mobile.
  - Ajustado o link do Card 01 do slider de ofertas para abrir o modal de atendimento em vez de apontar para a âncora inexistente.
  - Preservado o componente completo (markup HTML, fotos circulares com badges SVG, responsividade e bloco para cópia) na seção 4.4 de `design-system-preview.html`.
  - Estilos canônicos do componente arquivado integrados a `src/css/design-system.css`.
  - Commit `b45ae67` enviado para `https://github.com/idedigitalbr/site-villa-park.git`.

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
