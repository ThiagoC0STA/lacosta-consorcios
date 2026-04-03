# SEO — Resumo das alterações

## Técnico

- **Sitemap/Robots duplicados**: Removido `next-sitemap` e arquivos estáticos de `public/`. Agora só o App Router (`app/sitemap.ts` + `app/robots.ts`) serve esses arquivos.
- **robots.txt**: Adicionado `/whatsapp` no disallow (página noindex de redirecionamento).
- **SSR do "Como funciona"**: Mudado `ssr: false` → `ssr: true` no `HowItWorksV2`. Conteúdo agora visível para crawlers.
- **page.tsx como Server Component**: Removido `"use client"` da homepage. `Toaster` isolado em componente próprio.
- **Preconnect/DNS-prefetch**: Adicionado para GTM, GA, YouTube e WhatsApp.
- **Headers de segurança e cache**: HSTS, DNS-prefetch habilitado, cache imutável de 1 ano para assets estáticos.

## Metadata

- **Title tag**: Reduzido de 77 para 60 caracteres. Foco em "Consórcio Servopa e Rodobens | Simule Grátis Sem Juros".
- **Meta description**: Reescrita com verbos de ação e intent match.
- **Open Graph / Twitter**: Títulos e descrições reescritos para melhor CTR em redes sociais.
- **Geo meta tags**: Adicionado `geo.placename`, `geo.position` e `ICBM` para SEO local em Curitiba.
- **Hreflang**: Adicionado `x-default`.

## Structured Data (JSON-LD)

- **6 schemas** implementados: Organization, FinancialService (com AggregateRating 4.9/5, Reviews, OfferCatalog, openingHours, geo), WebSite, WebPage, BreadcrumbList, FAQPage.
- **VideoObject**: Schema adicionado para os 6 vídeos do YouTube.
- **Reviews**: 4 depoimentos reais estruturados dentro do FinancialService.

## On-Page SEO

- **H2 de todas as seções** reescritos com keywords naturais (ex: "Vantagens do consórcio sem juros", "Parceiros oficiais Servopa e Rodobens", "Clientes contemplados", "Dúvidas sobre consórcio").
- **FAQ**: 14 respostas reescritas com profundidade, cobertura de entidades (Servopa, Rodobens, Banco Central, FGTS, carta de crédito) e linguagem natural.
- **Alt texts**: Reescritos em ~25 imagens (Hero, calculadora, parceiros, "Como funciona") com contexto de keyword.

## Semântico / Acessibilidade

- **Footer**: `<nav aria-label>` para links, `<address>` para contato, mais links internos, CEP adicionado.
- **Header**: `aria-label` nas navigações desktop e mobile.
- **Iframes YouTube**: Títulos descritivos no atributo `title`.

## Arquivos removidos

- `next-sitemap.config.js`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap-0.xml`

## Arquivo criado

- `app/components/ToasterProvider.tsx` (isolar `"use client"` do `Toaster`)

## Próximos passos sugeridos

1. Criar landing pages por categoria (`/consorcio-imovel`, `/consorcio-veiculo`, `/consorcio-vs-financiamento`)
2. Criar blog com artigos de long-tail
3. Landing page local `/consorcio-curitiba`
4. Garantir Google Business Profile alinhado com os dados estruturados
5. Buscar backlinks das parceiras Servopa e Rodobens
