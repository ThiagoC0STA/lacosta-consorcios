# Melhorias no site — SEO e experiência

**Site em foco (por enquanto, só este):** [https://www.lacostaconsorcios.com.br/](https://www.lacostaconsorcios.com.br/)

**Escopo:** apenas o **site** (texto, SEO técnico, velocidade). **Anúncios Google** = equipe de mídia.

**Atuação:** **Brasil inteiro** — mensagem, metadados e dados estruturados devem refletir **atendimento em todo o país**, não uma cidade como foco comercial. (Endereço de **sede** no rodapé — ex. Curitiba — pode continuar; a comunicação de cobertura é **nacional**.)

**Credibilidade — Servopa e Rodobens:** deixar **explícito** em pontos de alta visibilidade que vocês **trabalham com / vendem consórcio das administradoras Servopa e Rodobens** e que são **parceiros** (consultor ou representante autorizado, conforme vocês usam na página). Isso **não é opcional para a estratégia**: reduz desconfiança (“quem é esse site?”), alinha expectativa com quem busca essas marcas e reforça **autoridade** frente a landing genérica. Reforçar na **dobra** (H1/sub), **metadata / compartilhamento social**, e onde fizer sentido no **JSON-LD** (descrição da organização), sem exagerar repetição.

**Estado atual (Google / página):** após a última rodada de deploy, **metadata** e **hero** devem refletir **Brasil + Servopa/Rodobens** na dobra e no snippet; o Google pode levar dias para atualizar o título nos resultados.

---

## Os dados (resumo)

- Muito tráfego vindo do **Google** e parando na **página inicial**.
- **Bounce alto** é comum em **landing de uma página**: a métrica vê pouca navegação, mesmo com scroll e clique no WhatsApp.
- **Estados Unidos nos relatórios:** a equipe acessa com **VPN** — tratar como **ruído interno**, não como público-alvo. Para decisões, usar sempre visão **só Brasil** (seção abaixo).
- Maioria no **celular** → **primeira dobra** rápida e clara.

---

## Métricas — foco só Brasil (eliminar ruído EUA)

**Objetivo:** relatórios operacionais **sem** sessões que são vocês (VPN EUA).

**Google Analytics 4**

1. Nos relatórios, use **Comparações** ou **Segmento** com dimensão **País** = **Brazil** (ou **Região** / **Cidade** se precisar).
2. **Relatórios personalizados** ou **Explorações** com filtro **País exatamente igual a Brazil** como padrão do time.
3. *(Opcional)* **Admin → coleta de dados → filtro de dados** ou **definições de tráfego interno** (IP da empresa / intervalos fixos) para marcar ou excluir tráfego interno — útil além da VPN.

**Vercel Web Analytics**

- O painel por **país** não separa “VPN da equipe” automaticamente. Para alinhar com o GA4, **priorize GA4 com filtro Brasil** para decisão; use Vercel para **páginas, performance e tendência geral**, não para % EUA como KPI de público.

---

## O que já está bom (lacostaconsorcios.com.br)

- Idioma **pt-BR**.
- JSON-LD (organização, serviço financeiro, FAQ).
- Contato **brasileiro** no rodapé; parceiros **Servopa / Rodobens** bem destacados.
- FAQ extensa; seções de prova social e calculadora no fluxo.

---

## O que mudar no site (e por quê)

| # | Problema | O que fazer |
|---|----------|-------------|
| 1 | O **H1** não deixa explícito o **escopo Brasil** nem a **parceria Servopa / Rodobens** de forma imediata. | Ajustar **H1 + subtítulo** para **consórcio + Brasil** + **Servopa e Rodobens** (parceiros / administradoras com quem vocês trabalham), alinhado ao anúncio ou busca. |
| 2 | **Alt** da imagem do hero em **inglês**. | **Português**: consórcio, Brasil e, se couber, **Servopa e Rodobens** (reforço semântico e acessibilidade). |
| 3 | **JSON-LD:** endereço com campos inconsistentes. | Corrigir formato; **sede** pode ser uma cidade, mas **`areaServed` / mensagem de cobertura** deve refletir **Brasil**. |
| 4 | **Título e descrição** no Google ainda destacam **Curitiba**; corpo da página mistura sede local com promessa amplia. | Atualizar **metadata** (title, description, OG) para **Brasil** + **Servopa e Rodobens** (parceiros) + promessa; manter sede só onde fizer sentido (rodapé / schema como endereço físico). |
| 5 | Quem sai cedo não vê prova social nem “como funciona”. | No **mobile**, benefício + confiança + próximo passo **cedo** no scroll. |
| 6 | Primeira tela pesada. | **PageSpeed** / Core Web Vitals; hero e scripts. |

**Opcional:** se a sede for relevante para credibilidade, manter endereço no schema como **sede** e explicitar **cobertura nacional** no texto e onde o schema permitir (ex. `areaServed`: Country BR).

---

## Checklist — o que precisa melhorar

Marque `[x]` quando estiver feito.

### Metadata e dobra (credibilidade + Brasil)

- [x] **`app/layout.tsx`:** `title`, `description`, `openGraph` e `twitter` com **Brasil** + **Servopa e Rodobens** (parceiros); tirar **Curitiba** como gancho principal do título/snippet; ajustar `keywords` se precisar.
- [x] **`HeroV2`:** **H1** e **subtítulo** com **Brasil** + **Servopa e Rodobens** + promessa (alinhado ao que a pessoa vê no Google/ads).
- [x] **`HeroV2`:** **alt** da imagem do hero em **português** (consórcio, Brasil, marcas se couber).

### Dados estruturados

- [x] **`JsonLd` / `app/components/JsonLd.tsx`:** corrigir **PostalAddress** do `FinancialService` (formato UF, campos coerentes com o rodapé).
- [x] **`JsonLd`:** **`areaServed`** refletindo **Brasil** (cobertura nacional).
- [x] **`JsonLd`:** descrições de **Organization** / **FinancialService** deixando explícita **parceria Servopa e Rodobens**.
- [ ] *(opcional)* **`JsonLd`:** `LocalBusiness` ou **geo** (lat/long) da sede, se fizer sentido.

### Internacionalização / crawler

- [x] *(opcional)* **`app/layout.tsx`:** `alternates.languages` com `pt-BR` → URL canônica.

### Performance e UX (bounce)

- [ ] **Mobile — primeira dobra:** revisar **PageSpeed Insights** / Core Web Vitals (LCP, imagem hero, scripts).
- [ ] **Mobile — fluxo:** garantir **benefício + confiança + próximo passo** cedo no scroll (quem não rola ainda vê valor rápido).

### Relatórios (só BR)

- [ ] **GA4:** relatório ou exploração padrão com filtro **País = Brazil** (e, se configurarem, exclusão de tráfego interno por IP).
- [ ] Time alinhado: **não usar** % EUA da Vercel como indicador de público — VPN interna.

---

## Depois de publicar — o que olhar

- **GA4 (segmento Brasil):** eventos de **WhatsApp**, engajamento, conversões — é a base para decisão.
- **Search Console** (se configurado).
- **Bounce** (Vercel) **junto** de **conversão** no GA4 — em one-page, conversão importa mais que bounce sozinho; sempre com **filtro Brasil** no GA4.

---

## Fora do escopo deste arquivo

- Geotargeting na **mídia**.
- Bloqueio de país no site.
