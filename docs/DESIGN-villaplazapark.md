# Villa Plaza Park — Especificação Oficial do Design System

Versão: 2.1.0 (Edição Canônica Figma)  
Data de Atualização: 2026-09-15  
Status: Aprovado  

---

## 1. Conceito e Personalidade da Marca

- **Slogan Oficial**: *"O complexo de muita diversão para os pequenos"*
- **Assinatura Afetiva**: *"Mais que uma festa, boas memórias! ♡"* / *"Aqui, memórias brilham mais! ✨"*
- **Posicionamento**: Espaço de recreação, entretenimento e celebrações infantis de alto padrão, localizado no mezanino do +B Supermercados em Belém/PA.
- **Vibe Visual**: Alegre, lúdica, acolhedora, segura e dinâmica. Combinação de superfícies orgânicas, cantos arredondados (estilo pílula / 28px+), grafismos afetivos desenhados à mão (doodles) e contrastes vibrantes entre o verde institucional e o laranja festivo.

---

## 2. Paleta Cromática Canônica

### 2.1 Cores Primárias (Manual de Identidade Visual)
- **Verde Oficial**: `#228137` (RGB: 34, 129, 55 | CMYK: 84%, 24%, 98%, 11%)
  - Hover: `#1b682c`
  - Active: `#165424`
  - Light: `#eaf5ec`
  - Soft: `#d1ebd6`
  - *Aplicação*: Ações primárias, headers institucionais, bordas ativas e cards da atração Villa Aventura e Villa Diversão.
- **Laranja Oficial**: `#ef7a2b` (RGB: 239, 122, 43 | CMYK: 0%, 62%, 88%, 0%)
  - Hover: `#d9651a`
  - Active: `#bf5412`
  - Light: `#fef1e8`
  - Soft: `#fcd6bd`
  - *Aplicação*: CTAs secundários, badges de destaque, bordas tracejadas e card central Villa Alegria.

### 2.2 Paleta Estendida de Festas & Estadia (Protótipos Figma)
- **Party Cream (Fundo de Festas)**: `#FDFBF7`
- **Party Yellow / Estrela Dourada**: `#FFC107` / `#FBBF24`
- **Ticket Green (Verde Profundo Estadia)**: `#145424` / `#165424`
- **Ticket Cream (Creme dos Bilhetes)**: `#FFF4E6` / `#FFF9F3`
- **Grafite Escuro (Ink / Textos)**: `#1C1D22` (contraste acessível AAA)
- **Cinza Neutro / Parágrafos**: `#4A4D59`
- **Muted**: `#757885`

---

## 3. Tipografia Canônica

1. **Display & Títulos de Impacto**:
   - Família: `'Marvin Round'`, `'Comfortaa'`, cursive, sans-serif
   - Peso: 800 / 900 (Extra Bold)
   - Uso: H1, H2, H3, nomes dos pacotes de festa e valores dos tickets.
2. **Corpo de Texto e Leitura Fluida**:
   - Família: `'Comfortaa'`, sans-serif
   - Pesos: 400 (Regular), 600 (SemiBold), 700 (Bold)
   - Uso: Parágrafos, menus, botões, descrições de pratos e FAQ.
3. **Grafismos Afetivos / Frases Manuscritas**:
   - Família: `'Caveat'`, `'Comfortaa'`, cursive
   - Peso: 600 / 700
   - Uso: Recados afetivos como *"Mais que uma festa, boas memórias! ♡"* e sparks.
4. **Dados Numéricos & Código**:
   - Família: `'JetBrains Mono'`, monospace

---

## 4. Componentes Canônicos de Festas & Aniversários (Figma)

### 4.1 Pacotes "Faça Sua Festa" (`.ds-party-card`)
Três opções estruturadas para celebrações completas:
1. **Villa Aventura**:
   - Tema: Verde `#228137` com ilustração de Balão 3D
   - Capacidade & Valor: Até 30 pessoas | R$ 4.900
   - Cardápio: Entrada Kids completa, Entrada Adultos com finger food, Prato Principal (massa + molhos + filé), Sobremesa e Bebidas.
2. **Villa Alegria**:
   - Tema: Laranja `#ef7a2b` com ilustração de Bolo de Aniversário 3D
   - Capacidade & Valor: Até 30 pessoas | R$ 6.000
   - Cardápio: Entrada Kids, Entrada Adultos (+2 opções finger food), Prato Principal (massa + filé + camarão), Sobremesa e Bebidas.
3. **Villa Diversão**:
   - Tema: Verde `#228137` com ilustração de Estrela Sorridente 3D
   - Capacidade & Valor: Até 60 pessoas | R$ 13.200
   - Cardápio: Entrada Kids, Entrada Adultos, Prato Principal com especial regional (massa + filé + camarão + filhote paraense), Sobremesa e Bebidas.

### 4.2 Estrutura da Festa (`.ds-features-grid`)
Grid de 11 comodidades inclusas no evento:
- 4 horas de evento
- Buffet completo
- Som ambiente
- Ambiente climatizado
- Equipe de monitores
- Equipe de limpeza
- Segurança
- Banheiro infantil
- Fraldário
- Estacionamento
- Garçons
- **Capacidade**: Espaço para até 120 pessoas (crianças com menos de 4 anos não pagam).

### 4.3 Card de Conversão Lateral (`.ds-party-summary-card`)
- Estilo: Borda tracejada laranja 2px sobre fundo creme `#FFFDF9`.
- Passos:
  1. 🧡 Você escolhe o pacote.
  2. 🎂 A gente cuida da experiência.
  3. 👥 E seu pequeno aproveita cada momento!
- CTA: Botão verde pílula `QUERO SABER MAIS >`.

---

## 5. Passaportes & Horários de Estadia

### 5.1 Valores por Tempo (Tickets Picotados)
- **Meia Hora**: R$ 35,00
- **Uma Hora**: R$ 49,00
- **Duas Horas**: R$ 69,00
- **Cliente +B**: R$ 59,00 (Café + R$0)
- **Pacote VIP (Até 4 Horas)**: R$ 89,00

### 5.2 Horários de Funcionamento
- **Segunda-feira**: Fechado para manutenção e higienização profunda
- **Terça a Quinta**: 14h às 21h
- **Sexta a Sábado**: 09h às 21h
- **Domingo**: 08h às 14h

---

## 6. Arquivos de Referência do Figma

Armazenados em alta resolução em `assets/brand/figma-mockups/`:
- `figma-pacotes-festa.jpg`: Seção de pacotes Villa Aventura, Alegria e Diversão.
- `figma-estrutura-festa.jpg`: Seção de comodidades e card lateral de conversão.
- `figma-landing-page-completa.png`: Visão geral do layout completo da landing page.
- `figma-wireframe-estrutura.png`: Esqueleto e malha estrutural de espaçamentos.
