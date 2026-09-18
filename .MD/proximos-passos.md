# 📌 Próximos Passos & Tarefas Pendentes — Villa Plaza Park

> **Documento de Auditoria e Roadmap Pós-Apagão (17/09/2026)**  
> **Status do Repositório**: Sincronizado até o commit `67a4c96` / `fa28203`  
> **Objetivo**: Mapear todas as frentes de trabalho interrompidas pela queda de energia, o que já foi salvo e o plano de ação executivo para finalização.

---

## 🧭 1. Resumo Executivo da Auditoria

Na tarde de **17/09/2026** (entre 16:30 e 18:05), múltiplos chats e tarefas paralelas estavam em andamento no projeto `site-villa-park`. A queda de energia abrupta interrompeu as sessões ativas do assistente no meio da validação e implementação.

Na reabertura em **18/09/2026 (13:58)**, um commit geral (`67a4c96`) salvou as alterações do diretório de trabalho no GitHub. A varredura detalhada em todos os logs das conversas revelou o seguinte panorama:

| Seção / Módulo | Chat ID | Status | Salvo no Git? | O que falta / Próximo Passo |
| :--- | :--- | :---: | :---: | :--- |
| **Botões Padrão** | `6d153377` | 🟢 Concluído | Sim (`67a4c96`) | Nada pendente. Todos os botões seguem `btn btn-primary` com `"Quero saber mais >"`. |
| **Sobre o Park** | `f689d4ed` | 🟢 Concluído | Sim (`306bd41`) | Nada pendente. Collage 4 fotos + checklist e remoção de passaportes legados. |
| **Atrações (Brinquedão & Cerquinha)** | `5cae0ccd` | 🟡 Quase Pronto | Sim (`67a4c96`) | Brinquedão deslocado em 40% OK. Ajuste da cerquinha no canto inferior direito inserido no CSS, pendente de validação visual. |
| **Valores por Estadia & Horários** | `9e8f7256` | 🟢 Concluído | Sim (`67a4c96`) | Seção `#estadia` 100% implementada com os 5 estandartes no varal e horários de funcionamento. |
| **Pacotes Faça Sua Festa** | `9c4c8b7d` | 🟡 Pela Metade | Sim (`67a4c96`) | Código inserido no HTML/CSS, mas chat travou às 17:28 e 18:00 durante validação. Falta calibrar respiros do bolo 3D e bolinhas 3D. |
| **Depoimentos & FAQ** | `06f18188` | 🟡 Código Salvo | Sim (`67a4c96`) | Palco azul celeste, carrossel de Reels e FAQ 2x3 inseridos, mas validação visual de vídeo e acordeão foi cortada pelo apagão. |
| **Nossas Unidades & Footer** | `96afce5b` | 🔴 **0% Feito** | **Não** | **Maior GAP do projeto**. O chat caiu na fase de análise preliminar. O site ainda usa o rodapé escuro `#1C1D22` antigo em vez do design do Figma. |

---

## 🎯 2. Roadmap Detalhado de Implementação

### 🔴 Prioridade 1: Reformulação Total de "Nossas Unidades" e Rodapé (Footer)
* **Origem**: Chat `96afce5b` (Interrompido antes de escrever código).
* **Arquivos de Referência Prontos**:
  - Mockup Limpo: `assets/brand/figma-mockups/unidades_section_clean.png` (1920x980)
  - Crop dos Cards: `assets/brand/figma-mockups/crop_unidades_footer_exact.png`
  - Referência Geral: `assets/brand/figma-mockups/crop_footer_reference.png`
  - Rodapé Inferior: `assets/brand/figma-mockups/crop_footer_absolute_bottom.png`
* **Tarefas a Executar**:
  1. **Estrutura de Fundo Orgânico**:
     - Substituir o bloco preto `#1C1D22` atual por um fundo contínuo em verde lúdico com curvas orgânicas.
     - Implementar a grande forma orgânica laranja na lateral direita conforme a composição do Figma.
  2. **Card Branco Contido (Lado Esquerdo)**:
     - Tag pílula `NOSSAS UNIDADES`.
     - Headline de impacto com tipografia canônica Marvin Round / Comfortaa.
     - Lista de diferenciais e benefícios de localização com ícones/checkmarks.
  3. **Cards das Unidades (Lado Direito)**:
     - **Unidade 1 (Plaza)**: Moldura verde, foto real de alta qualidade, status "Unidade Aberta / Em Funcionamento", endereço completo no mezanino do +B Supermercados, horários e botão de rota / WhatsApp.
     - **Unidade 2 (Tapanã)**: Moldura laranja, foto real com badge pulsante **"EM BREVE"**, endereço da Rodovia do Tapanã e botão de novidades.
  4. **Elementos 3D Flutuantes com Profundidade**:
     - Estrela sorridente 3D (`assets/3DObjetos/estrela-sorridente-3d.webp`).
     - Balão de ar quente 3D (`assets/3DObjetos/balao-ar-quente-nuvens-3d.webp`).
     - Nuvens 3D decorativas (`assets/3DObjetos/nuvem-branca-3d.webp`).
  5. **Footer Inferior**:
     - Logo oficial monocromática/branca centralizada.
     - Ícones de redes sociais (Instagram, TikTok, Facebook).
     - Links institucionais simplificados e créditos da agência no rodapé verde final.

---

### 🟡 Prioridade 2: Calibração da Seção de Festas (`#clube`)
* **Origem**: Chat `9c4c8b7d` (Travou na validação final).
* **Tarefas a Executar**:
  1. Verificar no mobile (390px) e tablet (768px) se o **Bolo 3D** (`ds-party-decor-cake`) e as **Bolinhas 3D** (`ds-party-decor-balls`) não causam scroll horizontal (`overflow-x`).
  2. Ajustar margens e respiro entre o grid de 3 cards (`ds-party-grid`) e o banner inferior de comodidades (`ds-party-banner-container`).
  3. Confirmar que os 3 toppers 3D dos pacotes mantêm proporção 1:1 nítida.

---

### 🟡 Prioridade 3: Validação de Depoimentos & FAQ (`#depoimentos` e `#faq`)
* **Origem**: Chat `06f18188` (Interrompido na geração de screenshots).
* **Tarefas a Executar**:
  1. Testar reprodução dos vídeos verticais (Reels) e alternância do texto da citação editorial (`#depoimentosTextBox`).
  2. Conferir comportamento touch swipe em telas sensíveis ao toque.
  3. Validar se o acordeão do FAQ abre e fecha suavemente sem "pulos" de layout em 2 colunas no desktop e 1 coluna no mobile.

---

### 🟡 Prioridade 4: Ajuste Fino da Cerquinha 3D (`#atracoes`)
* **Origem**: Chat `5cae0ccd` (Último pedido do usuário).
* **Tarefas a Executar**:
  1. Validar visualmente a posição da cerquinha no canto inferior direito (`bottom: clamp(50px, 7vw, 85px); right: -75px`).
  2. Garantir que a cerquinha permaneça oculta ou reduzida no mobile para não cobrir o carrossel de fotos.

---

### 🟢 Prioridade 5: Atualização da Suíte de Testes Automatizados
* **Arquivo**: `tests/test_full_page_restoration.py`
* **Correção Necessária**:
  - A asserção legada `self.assertEqual(self.page.locator("#estadia").count(), 0)` deve ser atualizada para `self.assertEqual(self.page.locator("#estadia").count(), 1)`, pois a seção de estadia foi aprovada e integrada oficialmente ao site.

---

## ⚡ 3. Prompt Mestre ("Promotor") para Execução

Copie e cole o prompt abaixo em um novo chat ou execute diretamente aqui para dar início imediato à conclusão de todos os itens:

```markdown
Quero que você atue como Senior Front-end Developer + UI/UX Designer e execute o plano de próximos passos mapeado em .MD/proximos-passos.md no projeto site-villa-park:

1. REFORMULAÇÃO DO FOOTER E NOSSAS UNIDADES (Prioridade 1):
   - Substitua o rodapé escuro atual pelas novas seções baseadas em:
     assets/brand/figma-mockups/unidades_section_clean.png e crop_unidades_footer_exact.png
   - Implemente o fundo orgânico verde com grande forma lateral laranja.
   - Crie o container branco com headline à esquerda e os 2 cards das unidades à direita (Plaza com moldura verde + Tapanã 'Em Breve' com moldura laranja).
   - Adicione os elementos 3D flutuantes (estrela, balão e nuvens) com z-index e escala precisos.
   - Refaça o rodapé com logo central, redes sociais e faixa verde institucional.

2. CALIBRAÇÃO DE FESTAS, DEPOIMENTOS E ATRAÇÕES:
   - Garanta zero overflow horizontal nos elementos 3D da seção #clube (bolo e bolinhas).
   - Valide os controles do carrossel de Reels em #depoimentos e o acordeão de #faq.
   - Confirme a harmonia visual da cerquinha 3D no canto inferior direito de #atracoes.

3. QUALIDADE E TESTES:
   - Atualize test_full_page_restoration.py para reconhecer a nova seção #estadia.
   - Execute a suíte de testes unitários garantindo 100% de aprovação.
   - Apresente um resumo comparativo antes de comitar.
```
