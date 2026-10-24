# Deploy — Villa Plaza Park

Atualizado: 2026-10-24

## Ambientes de Produção

### 1. Produção Oficial (VPS Docker + Traefik)
- **Domínios Oficiais**:
  - [https://www.villaplazapark.com.br/](https://www.villaplazapark.com.br/)
  - [https://villaplazapark.com.br/](https://villaplazapark.com.br/)
  - [https://villapark.suporteide.digital/](https://villapark.suporteide.digital/)
- **Infraestrutura**: VPS Docker com Traefik Reverse Proxy (`proxy` network externa) e certificado Let's Encrypt / Cloudflare.
- **Container**: `villapark-web` (porta interna 80, porta externa 8085 mapeada no host).
- **Projeto Compose**: `villapark-site`.
- **Workflow CI/CD**: `.github/workflows/deploy-vps.yml` — dispara automaticamente a cada `push` na branch `main`.

### 2. Preview / Fallback
- **GitHub Pages**: [https://idedigitalbr.github.io/site-villa-park/](https://idedigitalbr.github.io/site-villa-park/)
- **Repositório GitHub**: [https://github.com/idedigitalbr/site-villa-park](https://github.com/idedigitalbr/site-villa-park)
- **Branch de Deploy**: `main`
