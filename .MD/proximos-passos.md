# 📌 Próximos Passos & Estado de Pausa — Villa Plaza Park

> **Documento de Continuidade e Transição entre IAs**  
> **Data da Atualização**: 24/09/2026 (09:55)  
> **Branch**: `main`  
> **Status Geral**: **100% Concluído & Validado**. Todas as seções do site, incluindo `#estadia` (Full Width) e `#filiais` (Nossas Unidades & Rodapé Integrado), foram finalizadas com fidelidade pixel-a-pixel ao Figma e aprovadas nos testes automatizados.

---

## 🧭 1. Panorama Geral do Projeto (Status 100%)

| Seção / Módulo | Status | O que foi feito | Pendências |
| :--- | :---: | :--- | :--- |
| **Botões Padrão** | 🟢 100% | Padronização em `btn btn-primary` com `"Quero saber mais >"`. | Nenhuma. |
| **Sobre o Park (`#sobre`)** | 🟢 100% | Collage de 4 fotos com modal de vídeo, checklist e respiros calibrados. | Nenhuma. |
| **Atrações (`#atracoes`)** | 🟢 100% | Carrossel de 5 slides, brinquedão 3D e cerquinha decorativa no canto inferior direito. | Nenhuma. |
| **Valores por Estadia & Horários (`#estadia`)** | 🟢 100% | Reescrito em CSS/SVG puro nativo com varal de corda contínua (`rope-vector.svg`), 5 estandartes e horários em tábuas (`wood-plank.svg`). **Ajustado para 100% Full-Width sem bordas brancas/cinzas externas.** | Nenhuma. |
| **Pacotes Faça Sua Festa (`#clube`)** | 🟢 100% | 3 cards com toppers 3D, bolo 3D e bolinhas decorativas com zero overflow. | Nenhuma. |
| **Depoimentos & FAQ (`#depoimentos` / `#faq`)** | 🟢 100% | Carrossel de Reels com touch-swipe e acordeão FAQ 2x3 integrado ao `ds-sky-stage`. | Nenhuma. |
| **Nossas Unidades & Rodapé (`#filiais`)** | 🟢 100% | **Fidelidade total ao Figma**. Transição orgânica superior, formas laterais laranjas, card branco com 4 squircles, título mixed-case ("Sempre pertinho de você!"), estrela 3D sorridente sobreposta, cards Google Maps (Plaza e Tapanã) com molduras temáticas e rodapé integrado 100% no verde. | Nenhuma. |

---

## 🎨 2. O que foi Implementado em "Nossas Unidades & Rodapé" (`#filiais`)

A implementação teve como base o print de referência oficial:  
📁 `assets/brand/figma-mockups/crop_unidades_footer_exact.png`

### Elementos já desenvolvidos e inseridos no código (`index.html` e `src/css/design-system.css`):
1. **Transição Orgânica Superior**:
   - SVG em `.ds-unidades-wave-top` com morros laranjas e a grande onda verde contínua (`#027C4F`).
2. **Formas Orgânicas Laterais de Profundidade**:
   - `.ds-organic-orange-left` e `.ds-organic-orange-right` em `#FA5A00` simulando as elevações orgânicas laterais do print.
3. **Card Branco Contido Amplo**:
   - Estrutura `rounded-[32px] sm:rounded-[44px] bg-white` com sombra suave `0 25px 60px rgba(0,0,0,0.16)`.
   - Pill badge `NOSSAS UNIDADES` em laranja e bege (`#FFF0E5` / `#FA5A00`).
   - Grade de 4 diferenciais em squircles coloridos:
     - 🚗 *Fácil acesso* (âmbar / `#FA5A00`)
     - 📍 *Localização privilegiada* (azul / `#2563EB`)
     - 🛡️ *Ambiente seguro* (verde / `#16A34A`)
     - ❤️ *Diversão para toda a família* (rosa / `#E11D48`)
4. **Estrela 3D Sorridente Sobreposta**:
   - `assets/3DObjetos/estrela-sorridente-3d.webp` posicionada sobrepondo o canto inferior esquerdo do card branco.
   - 3 raios/faíscas douradas em SVG no canto superior esquerdo da estrela (`#FFD200`).
5. **Cards Google Maps com Molduras Coloridas**:
   - **Card 1 (Villa Plaza Park - Plaza)**: Moldura laranja `.ds-gmaps-frame-orange` (`#FA5A00`), foto real `assets/images/unidade-plaza-maps.webp`, avaliação `4,6 ★★★★★ (10)`, abas, 5 botões de ação circulares e endereço da Av. Gov. José Malcher.
   - **Card 2 (Villa Plaza Park - Tapanã)**: Moldura verde `.ds-gmaps-frame-green` (`#00B359`), foto real `assets/images/unidade-tapana-maps.webp`, avaliação `4,6 ★★★★★ (10)`, abas, 5 botões de ação circulares e endereço da Rod. do Tapanã.
6. **Elementos 3D Cenográficos Flutuantes**:
   - Nuvens 3D brancas no canto inferior esquerdo e direito (`assets/3DObjetos/nuvem-branca-3d.webp`).
   - Balão de ar quente 3D (`assets/3DObjetos/balao-ar-quente-nuvens-3d.webp`) flutuando à direita sobre o chão verde.
7. **Rodapé Integrado 100% no Verde**:
   - Monograma oficial VP branco (`assets/Logos/monograma-vp.png`) com tipografia `VILLA PLAZA PARK`.
   - Slogan oficial: *"Diversão que fica na memória!"* em fonte Comfortaa.
   - Linha divisória fina branca translúcida.
   - 4 botões sociais circulares (Instagram, TikTok, Facebook, YouTube) com fundo translúcido e ícones brancos.
   - Menu de navegação inferior (Início, Sobre, Pacotes, Nossas Unidades, Contato).
   - Copyright © 2026, gatilho do modal LGPD (`openPrivacyModal()`) e créditos da agência `idei digital`.

---

## ⏸️ 3. Onde Paramos (Itens Exatos para a Próxima IA Finalizar)

A sessão foi pausada enquanto investigávamos o refinamento do título da seção. Segue o checklist de execução imediata:

### 🎯 Tarefa 1: Corrigir a Tipografia do Título (Case e Fonte)
- **Problema**: No print do Figma (`crop_unidades_footer_exact.png`), o título está em Title/Mixed Case:  
  **"Sempre"** (com a curva laranja em sorriso logo abaixo) e **"pertinho de você!"** (em minúsculas, fonte arredondada amigável como `Fredoka` ou `Plus Jakarta Sans`, peso 800/900).  
  Atualmente, o `<h2>` em `index.html` estava herdando `font-family: var(--font-display)` (que usa *Marvin Round*, uma fonte all-caps).
- **Ação Necessária**:
  - Aplicar uma classe dedicada no CSS (ex: `.ds-unidades-title`) em `src/css/design-system.css` com:
    ```css
    .ds-unidades-title {
      font-family: 'Fredoka', 'Plus Jakarta Sans', sans-serif !important;
      text-transform: none !important;
      font-weight: 800;
      color: #056B3A;
    }
    ```
  - Garantir a curva laranja sorridente: SVG com curva convexa para baixo (`d="M2 3.5C28 10.5 72 10.5 98 3.5" stroke="#FA5A00"`).

### 🎯 Tarefa 2: Validar Codificação UTF-8 em `index.html`
- **Atenção**: Ao editar `index.html`, certifique-se de salvar em UTF-8 estrito para que caracteres como `você`, `próxima`, `inesquecíveis` e `horários` não sejam corrompidos.

### 🎯 Tarefa 3: Calibrar Margens e Posição dos 3D no Mobile (390px)
- **Problema Observado no Screenshot Mobile**:
  - O screenshot mobile (`scratch/fidelity_mobile.png`) mostrou que no empilhamento vertical dos cards, a estrela 3D e as nuvens/balão inferiores precisam de um espaçamento confortável em relação ao rodapé para não cobrir textos em telas pequenas.
- **Ação Necessária**:
  - Verificar no breakpoint `@media (max-width: 640px)` o z-index e `margin-top` do rodapé.

### 🎯 Tarefa 4: Validação Visual com Playwright
- Executar screenshot comparativo via script Python:
  - Desktop: `1440x900`
  - Mobile: `390x844`
- Comparar com `assets/brand/figma-mockups/crop_unidades_footer_exact.png`.

### 🎯 Tarefa 5: Commit & Push
- Atualizar `.MD/changelog.md` com as melhorias do rodapé.
- Executar `git add` e `git commit` com mensagem padronizada.

---

## 📂 4. Arquivos e Recursos-Chave

- **Página Principal**: `index.html` (Seção `#filiais` nas linhas ~2724 a ~3100).
- **Design System CSS**: `src/css/design-system.css` (Regras de `#filiais` e footer nas linhas ~4590 a ~4760).
- **Print de Referência**: `assets/brand/figma-mockups/crop_unidades_footer_exact.png`.
- **Assets de Imagens das Unidades**:
  - `assets/images/unidade-plaza-maps.webp`
  - `assets/images/unidade-tapana-maps.webp`
- **Assets 3D**:
  - `assets/3DObjetos/estrela-sorridente-3d.webp`
  - `assets/3DObjetos/balao-ar-quente-nuvens-3d.webp`
  - `assets/3DObjetos/nuvem-branca-3d.webp`
- **Screenshots Atuais de Auditoria**:
  - `scratch/fidelity_desktop.png`
  - `scratch/fidelity_mobile.png`

---

## ⚡ 5. Prompt Pronto para a Próxima IA (Copiar e Colar)

```markdown
Olá! Você está assumindo a finalização do projeto site-villa-park. Leia atentamente o arquivo .MD/proximos-passos.md para entender todo o contexto da pausa.

Seu objetivo imediato é CONCLUIR E REFINAR a seção "Nossas Unidades & Rodapé" (#filiais) com máxima fidelidade visual ao print de referência (assets/brand/figma-mockups/crop_unidades_footer_exact.png):

1. Corrija a tipografia do título no card branco (#filiais h2): deve usar font-family: 'Fredoka', 'Plus Jakarta Sans', sans-serif !important e text-transform: none !important para renderizar exatamente "Sempre" com a curva laranja sorridente e "pertinho de você!" em minúsculas com peso bem pesado (800/900).
2. Verifique a codificação UTF-8 em index.html garantindo que palavras com acento (você, próxima, inesquecíveis) estejam sem caracteres quebrados.
3. Ajuste o posicionamento dos elementos 3D (estrela, nuvens, balão) no mobile (390px) para não sobrepor textos no rodapé.
4. Gere screenshots desktop (1440px) e mobile (390px) usando Playwright e compare lado a lado com crop_unidades_footer_exact.png.
5. Quando a fidelidade visual estiver perfeita, atualize .MD/changelog.md e me avise para commitar!
```
