# Checklist de Conversão — Lacosta Consórcios

## Alto impacto

- [x] **Exit-intent popup** — Detecta saída (mouse no topo desktop / scroll-back mobile / tab switch). Design dark glassmorphism no padrão do site. Respeita dismiss por 24h.
- [x] **Captura de lead antes do WA** — Step 3 no calculador com nome + celular. Salva via POST `/api/lead` (encaminha para webhook se `LEAD_WEBHOOK_URL` estiver configurado). Opção "Pular" para não bloquear quem quer ir direto.
- [x] **Comparador interativo Consórcio vs Financiamento** — Usuário escolhe valor, vê lado a lado parcela, total pago, juros vs taxa adm. Savings em destaque. Seção entre Benefits e HowItWorks.

## Médio impacto

- [x] **Sticky CTA bar no mobile** — Barra fixa no rodapé "Simule grátis agora" que aparece quando o hero sai da tela. Visível só em mobile. Só aparece depois do cookie banner ser aceito.
- [x] **Personalização por UTM** — Hook `useUtmParams` lê UTMs da URL e persiste em sessionStorage. `inferCategoryFromUtm` mapeia palavras-chave para categoria. Hero muda título, calculador pré-seleciona objetivo.
- [x] **Remover urgência fake** — Timer e vagas removidos do `UrgencySectionV2`. Seção mantida com oferta real (consultoria gratuita).

## Quick wins

- [x] **Mensagem WA por seção** — Cada CTA manda msg contextual diferente via `buildWhatsAppLink(source)`.

## Pendências técnicas/legais

- [x] **CEP correto** — Alinhado em `legal.ts`, `Footer`, `JsonLd`.
- [x] **404 personalizado** — `not-found.tsx` com visual da marca + link para home e simulação.
- [ ] **Prova social real** — Prints de WA reais (com autorização), embed do Google Reviews (4.9), contador de simulações baseado em dado real.
- [ ] **Números verificáveis** — "+5.000 clientes" e "4.9/5" com link pro Google Reviews.
- [ ] **SUSEP** — Verificar se precisa exibir registro de corretora no rodapé/termos.
- [ ] **Consent Mode / GTM** — Decidir se o "Aceitar" do banner deve bloquear GA/Ads até aceite.
- [ ] **Revisão jurídica** — Advogado revisar `/privacidade` e `/termos`.
