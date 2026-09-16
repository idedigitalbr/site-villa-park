---
version: 1.0.0
name: villaplazapark-design-system
description: Sistema de design oficial, lúdico, dinâmico e acolhedor para o complexo infantil VILLA PLAZA PARK (Grupo Mais Barato). Ancorado nas cores primárias oficiais Verde (#228137) e Laranja (#ef7a2b), superfícies claras e arejadas (#FFFFFF, #F8FAF9), contraste grafite (#1C1D22), e tipografia Marvin Round (títulos e manchetes) combinada com Comfortaa (conteúdo e leitura fluida).

colors:
  # Pilares Cromáticos Oficiais (Manual de Marca)
  primary: "#228137"        # Verde Oficial (RGB: 34, 129, 55 | CMYK: 84%, 24%, 98%, 11%)
  primary-hover: "#1b682c"
  primary-active: "#165424"
  primary-light: "#eaf5ec"
  primary-soft: "#d1ebd6"
  primary-disabled: "#c4e5cb"

  secondary: "#ef7a2b"      # Laranja Oficial (RGB: 239, 122, 43 | CMYK: 0%, 62%, 88%, 0%)
  secondary-hover: "#d9651a"
  secondary-active: "#bf5412"
  secondary-light: "#fef1e8"
  secondary-soft: "#fcd6bd"

  accent: "#ef7a2b"

  # Neutros e Textos
  ink: "#1C1D22"            # Títulos principais, H1, H2, menus
  body: "#4A4D59"           # Parágrafos e descrições
  muted: "#757885"          # Legendas, dados secundários, horários
  muted-light: "#9EA2B0"    # Textos em superfícies escuras
  muted-soft: "#B2B5C2"

  # Superfícies e Fundos
  canvas: "#F8FAF9"         # Fundo geral da aplicação
  surface-card: "#FFFFFF"   # Cards em superfícies claras
  surface-soft: "#F1F5F2"   # Seções alternadas suaves
  surface-strong: "#E8EEE9" # Fundos de ícones e inputs
  surface-dark: "#142217"   # Seções escuras profundas (fundo rodapé e prova social)
  surface-dark-card: "#1C2D21" # Cards em superfícies escuras

  # Linhas e Divisores
  hairline: "#E2E8E4"
  hairline-soft: "#EDF2EF"
  border-strong: "#CBD5CE"

  # Semânticos e Acessórios Lúdicos
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  on-dark: "#FFFFFF"
  star-rating: "#F59E0B"
  fun-blue: "#0284C7"
  fun-yellow: "#FBBF24"
  fun-purple: "#8B5CF6"
  scrim: "rgba(20, 34, 23, 0.65)"

typography:
  # Títulos e Manchetes: Marvin Round (Ousadia, ludicidade e dinamismo)
  # Conteúdo e Subtítulos: Comfortaa (Leitura fluida e amigável)
  displayFamily: "'Marvin Round', 'Comfortaa', cursive, -apple-system, sans-serif"
  bodyFamily: "'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

  scale:
    display-2xl:
      fontSize: "48px"
      fontWeight: 700
      lineHeight: "1.15"
    headline:
      fontSize: "38px"
      fontWeight: 700
      lineHeight: "1.18"
    title-xl:
      fontSize: "24px"
      fontWeight: 700
      lineHeight: "1.3"
    body-lg:
      fontSize: "16px"
      fontWeight: 400
      lineHeight: "1.6"
    body-md:
      fontSize: "14px"
      fontWeight: 400
      lineHeight: "1.5"

radii:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  2xl: "36px"
  full: "9999px"

shadows:
  subtle: "0 1px 3px 0 rgba(34, 129, 55, 0.05)"
  card: "0 4px 20px -2px rgba(34, 129, 55, 0.08), 0 0 1px 0 rgba(34, 129, 55, 0.12)"
  floating: "0 20px 35px -10px rgba(34, 129, 55, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.04)"
  elevated: "0 25px 50px -12px rgba(20, 34, 23, 0.2)"
---
