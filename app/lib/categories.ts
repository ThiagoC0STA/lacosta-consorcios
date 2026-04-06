import { SITE_URL } from "./seo";
import type { CategoryData } from "./categoryTypes";
import { EXTRA_CATEGORIES } from "./categoryExtraDefinitions";

export type {
  CategoryData,
  CategoryFAQ,
  CategoryBenefit,
  ComparisonRow,
  CategoryStep,
} from "./categoryTypes";

export const CATEGORIES: Record<string, CategoryData> = {
  imovel: {
    slug: "consorcio-imovel",
    name: "Consórcio de Imóvel",
    shortName: "Imóvel",
    heroTitle: "Consórcio de Imóvel",
    heroAccent: "Sem Juros",
    heroSubtitle:
      "A casa própria está mais perto do que você imagina. Compre imóvel residencial, comercial ou terreno sem pagar juros bancários.",
    heroImage: "/items/imovel.png",
    metaTitle:
      "Consórcio de Imóvel Sem Juros | Simule Grátis - Lacosta Consórcios",
    metaDescription:
      "Consórcio de imóvel 100% sem juros. Casa, apartamento, terreno ou sala comercial com carta de crédito Servopa e Rodobens. Economize até R$ 75.000. Simule grátis!",
    ogTitle: "Consórcio de Imóvel Sem Juros | Lacosta Consórcios",
    ogDescription:
      "Compre seu imóvel sem juros bancários. Carta de crédito Servopa e Rodobens. +25 anos de mercado, +5.000 clientes. Simule grátis!",
    calculatorCategory: "imoveis",
    avgSaving: "R$ 75.000",
    introTitle: "Por que escolher consórcio para comprar imóvel?",
    introText:
      "No financiamento imobiliário tradicional, os juros compostos podem praticamente dobrar o valor final do imóvel. Com o consórcio, você paga apenas a taxa de administração, significativamente menor, e recebe uma carta de crédito com poder de compra à vista. Isso permite negociar descontos de até 15% com o vendedor. Na Lacosta, nossos clientes economizam em média R$ 75.000 comparado ao financiamento bancário.",
    problemTitle: "O custo real de financiar um imóvel",
    problemText:
      "Um financiamento de R$ 400.000 em 30 anos a 10,5% a.a. resulta em R$ 780.000 pagos ao banco. Ou seja: você compra UM imóvel e paga quase DOIS. Esses R$ 380.000 extras vão direto para os juros do banco. Dinheiro que nunca volta.",
    solutionTitle: "Com consórcio, o dinheiro fica com você",
    solutionText:
      "No consórcio, você paga apenas a taxa de administração (em média 18% diluída em todo o plano). Num crédito de R$ 400.000, o custo total fica em torno de R$ 472.000. A diferença de R$ 308.000 fica no seu bolso.",
    comparison: [
      { label: "Crédito contratado", financing: "R$ 400.000", consortium: "R$ 400.000", winner: "tie" },
      { label: "Taxa de juros / admin", financing: "10,5% a.a.", consortium: "~0,15% a.m.", winner: "consortium" },
      { label: "Total pago", financing: "R$ 780.000", consortium: "R$ 472.000", winner: "consortium" },
      { label: "Custo extra", financing: "R$ 380.000", consortium: "R$ 72.000", winner: "consortium" },
      { label: "Poder de negociação", financing: "Limitado", consortium: "À vista (até -15%)", winner: "consortium" },
      { label: "Uso do FGTS", financing: "Sim", consortium: "Sim (lance/amortização)", winner: "consortium" },
    ],
    comparisonNote: "Cenário: crédito de R$ 400.000 | Financiamento: 360 meses, 10,5% a.a. | Consórcio: 200 meses, 18% taxa admin total.",
    steps: [
      { title: "Simule grátis", description: "Escolha o valor do imóvel desejado e veja as parcelas em poucos segundos." },
      { title: "Escolha seu plano", description: "Nosso consultor analisa seu perfil e indica o grupo ideal entre Servopa e Rodobens." },
      { title: "Seja contemplado", description: "Participe dos sorteios mensais ou use lances estratégicos para antecipar." },
      { title: "Compre à vista", description: "Com a carta de crédito, negocie como comprador à vista e economize até 15%." },
    ],
    theme: {
      accent: "#0487D9",
      accentLight: "#5BB8FF",
      accentRgb: "4,135,217",
      gradient: "linear-gradient(135deg, #035AA6 0%, #0487D9 100%)",
      darkBg: "linear-gradient(180deg, #021D40 0%, #022859 50%, #021D40 100%)",
      benefitsLayout: "list",
      comparisonStyle: "table",
      stepsStyle: "horizontal",
    },
    ctaHeadline: "Quero economizar R$ 75 mil no meu imóvel",
    ctaSub:
      "Simule grátis e veja em 30 segundos quanto você deixa de pagar em juros bancários.",
    ctaStats: "Quero ver minha economia real",
    ctaFeatures: "Qual imóvel combina com o seu momento? Descubra o plano ideal.",
    ctaSteps: "Começar minha simulação gratuita agora",
    benefits: [
      {
        title: "Poder de compra à vista",
        description:
          "A carta de crédito funciona como dinheiro à vista, permitindo negociar descontos de até 15% com o vendedor do imóvel.",
        highlight: "Até 15% de desconto na compra",
      },
      {
        title: "Use seu FGTS",
        description:
          "Utilize o saldo do FGTS para ofertar lances, amortizar parcelas ou quitar o saldo devedor do seu consórcio imobiliário.",
        highlight: "FGTS como lance ou amortização",
      },
      {
        title: "Sem juros, só taxa de administração",
        description:
          "Diferente do financiamento bancário, o consórcio não cobra juros compostos. Economia média de R$ 75.000 no imóvel.",
        highlight: "Economia média de R$ 75.000",
      },
      {
        title: "Imóvel residencial ou comercial",
        description:
          "Compre casa, apartamento, terreno, sala comercial ou imóvel rural. A carta de crédito dá total flexibilidade de escolha.",
        highlight: "Qualquer tipo de imóvel",
      },
      {
        title: "Contemplação acelerada",
        description:
          "Nossos grupos Servopa e Rodobens têm média de contemplação de 8,2 meses. Com lance estratégico, pode ser em até 3 meses.",
        highlight: "Média de 8,2 meses",
      },
      {
        title: "Parcelas que cabem no bolso",
        description:
          "Parcelas menores que aluguel para muitos perfis. Comece a investir no seu patrimônio sem comprometer a renda.",
        highlight: "Parcela menor que aluguel",
      },
    ],
    faqs: [
      {
        question: "Posso usar FGTS no consórcio de imóvel?",
        answer:
          "Sim. No consórcio imobiliário, o FGTS pode ser utilizado para ofertar lances nas assembleias, amortizar parcelas ou quitar o saldo devedor, seguindo as regras da Caixa Econômica Federal. Essa é uma das maiores vantagens do consórcio de imóvel e pode acelerar significativamente a contemplação.",
      },
      {
        question: "Qual o valor mínimo e máximo da carta de crédito para imóvel?",
        answer:
          "As cartas de crédito para imóvel nos grupos Servopa e Rodobens variam de R$ 100.000 a R$ 1.500.000. O valor ideal depende do imóvel desejado e da sua capacidade de pagamento. Nossa equipe analisa seu perfil e indica o plano mais adequado.",
      },
      {
        question: "Posso comprar imóvel na planta com o consórcio?",
        answer:
          "Sim. Após a contemplação, a carta de crédito pode ser utilizada para imóveis na planta, prontos, novos ou usados, residenciais ou comerciais. O valor é pago diretamente ao vendedor ou construtora, funcionando como compra à vista.",
      },
      {
        question: "Quanto tempo leva para ser contemplado no consórcio de imóvel?",
        answer:
          "A média de contemplação nos nossos grupos é de 8,2 meses. Clientes que utilizam lances estratégicos frequentemente são contemplados em 3 a 6 meses. Cada assembleia mensal oferece oportunidades de sorteio e lance.",
      },
      {
        question: "Consórcio de imóvel compensa mais que financiamento?",
        answer:
          "Na maioria dos casos, sim. O financiamento imobiliário cobra juros compostos que podem dobrar o valor do imóvel em 30 anos. No consórcio, você paga apenas a taxa de administração, que é significativamente menor. Em média, nossos clientes economizam R$ 75.000.",
      },
      {
        question: "Posso comprar terreno com o consórcio?",
        answer:
          "Sim. A carta de crédito do consórcio imobiliário pode ser utilizada para compra de terrenos urbanos ou rurais, lotes em condomínios fechados, e até para construção em terreno próprio, dependendo das condições do grupo.",
      },
    ],
    sectionOrder: ["stats", "features", "problem-solution", "comparison", "steps", "benefits", "faq", "cross-sell"],
    statsHighlight: [
      { value: "R$ 75 mil", label: "Economia média", description: "Comparado ao financiamento bancário de 30 anos" },
      { value: "8,2 meses", label: "Contemplação média", description: "Nos grupos Servopa e Rodobens" },
      { value: "15%", label: "Desconto à vista", description: "Poder de negociação com a carta de crédito" },
    ],
    featureTitle: "Para todo tipo de imóvel",
    featureSubtitle: "A carta de crédito se adapta ao seu objetivo imobiliário",
    featureCards: [
      { title: "Casa própria", description: "Realize o sonho da casa do zero ou usada, urbana ou em condomínio." },
      { title: "Apartamento", description: "Novo, na planta ou usado. Studio, 2 quartos ou cobertura." },
      { title: "Terreno", description: "Lotes urbanos, rurais ou em condomínio fechado para construir." },
      { title: "Sala comercial", description: "Invista em ponto comercial ou consultório profissional." },
      { title: "Imóvel rural", description: "Chácara, sítio ou fazenda para moradia ou investimento." },
      { title: "Construção", description: "Use a carta para construir no seu terreno próprio." },
    ],
  },

  veiculo: {
    slug: "consorcio-veiculo",
    name: "Consórcio de Veículo",
    shortName: "Veículo",
    heroTitle: "Consórcio de Veículo",
    heroAccent: "Sem Juros",
    heroSubtitle:
      "Seu carro zero, moto ou caminhão sem pagar juros bancários. Parcelas que cabem no bolso e poder de compra à vista.",
    heroImage: "/items/veiculos.png",
    metaTitle:
      "Consórcio de Veículo Sem Juros | Carro, Moto, Caminhão - Lacosta",
    metaDescription:
      "Consórcio de veículo 100% sem juros. Carro, moto ou caminhão novo ou usado com Servopa e Rodobens. Economia média de R$ 30.000. Simule grátis!",
    ogTitle: "Consórcio de Veículo Sem Juros | Lacosta Consórcios",
    ogDescription:
      "Compre seu veículo sem juros. Carta de crédito Servopa e Rodobens com parcelas acessíveis. Simule grátis!",
    calculatorCategory: "veiculos",
    avgSaving: "R$ 30.000",
    introTitle: "Por que consórcio é o melhor caminho para seu veículo?",
    introText:
      "O financiamento de veículos no Brasil cobra juros que podem chegar a 2% ao mês. Em 60 parcelas, você paga quase o dobro do valor do carro. Com o consórcio, não há juros: apenas a taxa de administração, diluída ao longo do plano. Além disso, ao ser contemplado, você recebe uma carta de crédito com poder de negociação à vista, garantindo descontos que compradores financiados não conseguem.",
    problemTitle: "O preço escondido do financiamento de veículo",
    problemText:
      "Um carro de R$ 80.000 financiado em 60 meses a 1,8% a.m. resulta em R$ 130.000 pagos ao banco. Isso são R$ 50.000 em juros. Mais da metade do valor do carro. E o veículo deprecia ~50% nos primeiros 3 anos.",
    solutionTitle: "Com consórcio, você paga o preço justo",
    solutionText:
      "No consórcio, o mesmo veículo de R$ 80.000 tem custo total de ~R$ 95.000 (taxa admin ~18%). Você economiza R$ 35.000. E ao ser contemplado, negocia como comprador à vista, desconto que cobre parte da taxa de administração.",
    comparison: [
      { label: "Valor do veículo", financing: "R$ 80.000", consortium: "R$ 80.000", winner: "tie" },
      { label: "Juros / Taxa admin", financing: "1,8% a.m.", consortium: "~0,25% a.m.", winner: "consortium" },
      { label: "Total pago", financing: "R$ 130.000", consortium: "R$ 95.000", winner: "consortium" },
      { label: "Custo extra", financing: "R$ 50.000", consortium: "R$ 15.000", winner: "consortium" },
      { label: "Entrada obrigatória", financing: "Sim (20-40%)", consortium: "Não", winner: "consortium" },
      { label: "Negociação à vista", financing: "Não", consortium: "Sim", winner: "consortium" },
    ],
    comparisonNote: "Cenário: veículo de R$ 80.000 | Financiamento: 60 meses, 1,8% a.m. | Consórcio: 80 meses, 18% taxa admin total.",
    steps: [
      { title: "Simule grátis", description: "Informe o valor do veículo e veja as parcelas em menos de 30 segundos." },
      { title: "Escolha seu plano", description: "Nosso consultor indica o grupo ideal para o seu perfil e orçamento." },
      { title: "Seja contemplado", description: "Por sorteio mensal ou lance. Com lance estratégico, em até 3 meses." },
      { title: "Retire seu veículo", description: "A carta de crédito vale como dinheiro à vista na concessionária." },
    ],
    theme: {
      accent: "#0EA5E9",
      accentLight: "#7DD3FC",
      accentRgb: "14,165,233",
      gradient: "linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)",
      darkBg: "linear-gradient(180deg, #0C1929 0%, #0F2942 50%, #0C1929 100%)",
      benefitsLayout: "grid",
      comparisonStyle: "cards",
      stepsStyle: "timeline",
    },
    ctaHeadline: "Quero meu veículo zero sem pagar juros",
    ctaSub:
      "Descubra em 30 segundos a parcela do seu carro, moto ou caminhão sem juros bancários.",
    ctaStats: "Simular meu veículo agora",
    ctaFeatures: "Qual veículo você quer conquistar? Veja a parcela ideal.",
    ctaSteps: "Dar o primeiro passo agora",
    benefits: [
      {
        title: "Carro novo ou usado",
        description:
          "A carta de crédito serve para veículos novos, seminovos ou usados. Você escolhe o modelo, a marca e a concessionária.",
        highlight: "Total liberdade de escolha",
      },
      {
        title: "Parcelas sem juros",
        description:
          "Sem juros compostos do financiamento bancário. Economia média de R$ 30.000 no veículo comparado ao crédito tradicional.",
        highlight: "Economia média de R$ 30.000",
      },
      {
        title: "Contemplação rápida",
        description:
          "Com lances estratégicos, muitos clientes são contemplados em 3 a 6 meses. Nossa equipe orienta o melhor momento para ofertar.",
        highlight: "Contemplação em até 3 meses",
      },
      {
        title: "Poder de compra à vista",
        description:
          "Na concessionária, sua carta de crédito vale como dinheiro. Negocie descontos que só comprador à vista consegue.",
        highlight: "Desconto de comprador à vista",
      },
      {
        title: "Motos e caminhões também",
        description:
          "Além de carros, o consórcio automotivo cobre motos, caminhões, utilitários e até veículos pesados para frotas.",
        highlight: "Motos, carros e caminhões",
      },
      {
        title: "Sem entrada obrigatória",
        description:
          "Diferente do financiamento, o consórcio não exige entrada. Comece pagando apenas a primeira parcela.",
        highlight: "Zero de entrada",
      },
    ],
    faqs: [
      {
        question: "Posso comprar carro usado com o consórcio?",
        answer:
          "Sim. Após a contemplação, a carta de crédito pode ser utilizada para veículos novos ou usados, desde que atendam aos critérios da administradora (geralmente até 10 anos de fabricação). Você escolhe o veículo, e a carta funciona como pagamento à vista.",
      },
      {
        question: "Qual o prazo do consórcio de veículo?",
        answer:
          "Os planos de consórcio automotivo da Servopa e Rodobens variam de 48 a 100 meses, dependendo do valor da carta de crédito. Prazos mais longos resultam em parcelas menores. Nossa equipe ajuda a encontrar o plano ideal para seu orçamento.",
      },
      {
        question: "Preciso dar entrada no consórcio de veículo?",
        answer:
          "Não. Diferente do financiamento, o consórcio não exige entrada. Você começa pagando a primeira parcela e já participa dos sorteios e pode ofertar lances nas assembleias mensais.",
      },
      {
        question: "Como funciona o lance no consórcio automotivo?",
        answer:
          "O lance é um valor adicional que você oferece voluntariamente para tentar antecipar a contemplação. Pode ser lance livre (valor que você define) ou lance fixo. Quem oferece o maior lance na assembleia é contemplado. O valor do lance é abatido das parcelas restantes.",
      },
      {
        question: "Consórcio de veículo tem juros escondidos?",
        answer:
          "Não. O consórcio não cobra juros, apenas a taxa de administração, que é divulgada de forma transparente no contrato. Essa taxa é diluída nas parcelas e é significativamente menor que os juros de um financiamento bancário tradicional.",
      },
      {
        question: "Posso trocar de carro usando o consórcio?",
        answer:
          "Sim. Muitos clientes usam o consórcio como estratégia para trocar de carro. Você pode vender o veículo atual, usar o valor como lance para acelerar a contemplação, e adquirir o novo carro com a carta de crédito.",
      },
    ],
    sectionOrder: ["problem-solution", "features", "stats", "comparison", "benefits", "steps", "faq", "cross-sell"],
    statsHighlight: [
      { value: "R$ 30 mil", label: "Economia média", description: "Comparado ao financiamento de veículo tradicional" },
      { value: "5,4 meses", label: "Contemplação média", description: "Com lance estratégico pode ser em até 2 meses" },
      { value: "0%", label: "Entrada obrigatória", description: "Diferente do financiamento, sem valor de entrada" },
    ],
    featureTitle: "Do carro zero ao caminhão",
    featureSubtitle: "A carta de crédito se adapta ao veículo que você precisa",
    featureCards: [
      { title: "Carro zero", description: "Qualquer marca ou modelo novo com poder de compra à vista." },
      { title: "Moto", description: "Honda, Yamaha ou qualquer marca, nova ou seminova." },
      { title: "Caminhão", description: "Pesados e semipesados para frotistas e autônomos." },
      { title: "Seminovo", description: "Veículos usados conforme regras do grupo e administradora." },
      { title: "Utilitário", description: "Vans, pickups e veículos de trabalho para seu negócio." },
      { title: "Frota", description: "Múltiplas cotas para renovar a frota da empresa inteira." },
    ],
  },

  investimento: {
    slug: "consorcio-investimento",
    name: "Consórcio como Investimento",
    shortName: "Investimento",
    heroTitle: "Consórcio como",
    heroAccent: "Investimento Inteligente",
    heroSubtitle:
      "Planejamento financeiro sem juros bancários. Construa patrimônio, expanda seu negócio ou diversifique investimentos.",
    heroImage: "/items/invest.png",
    metaTitle:
      "Consórcio como Investimento | Planejamento Financeiro - Lacosta",
    metaDescription:
      "Use o consórcio como investimento inteligente. Construa patrimônio sem juros com Servopa e Rodobens. Ideal para imóvel, negócio ou diversificação. Simule grátis!",
    ogTitle: "Consórcio como Investimento | Lacosta Consórcios",
    ogDescription:
      "Planejamento financeiro inteligente sem juros. Construa patrimônio com consórcio Servopa e Rodobens. Simule grátis!",
    calculatorCategory: "investimento",
    avgSaving: "R$ 60.000",
    introTitle: "Por que usar consórcio como investimento?",
    introText:
      "O consórcio é uma das formas mais inteligentes de planejar aquisições de alto valor sem se endividar com juros. Diferente de um financiamento, onde os juros corroem seu patrimônio, no consórcio você acumula poder de compra. A carta de crédito, quando utilizada para adquirir um imóvel ou bem valorizado, funciona como um investimento. Você compra à vista (com desconto), paga parcelas menores que um aluguel, e o bem se valoriza ao longo do tempo.",
    problemTitle: "O custo de oportunidade de não investir",
    problemText:
      "Quem deixa dinheiro parado na poupança perde para a inflação. Quem financia paga juros que corroem o patrimônio. Em ambos os casos, o dinheiro trabalha contra você. A cada ano, seu poder de compra diminui enquanto os preços dos imóveis sobem.",
    solutionTitle: "Consórcio: seu dinheiro trabalha a seu favor",
    solutionText:
      "Com o consórcio, cada parcela constrói patrimônio real. Ao ser contemplado, você adquire um bem que se valoriza, enquanto as parcelas restantes ficam fixas. Quem compra imóvel por consórcio e aluga, frequentemente tem a renda do aluguel cobrindo boa parte das parcelas.",
    comparison: [
      { label: "Investimento de R$ 500.000", financing: "Financiamento", consortium: "Consórcio", winner: "tie" },
      { label: "Custo total em 15 anos", financing: "R$ 975.000", consortium: "R$ 590.000", winner: "consortium" },
      { label: "Economia total", financing: "-", consortium: "R$ 385.000", winner: "consortium" },
      { label: "Poder de compra à vista", financing: "Não", consortium: "Sim (-10 a -15%)", winner: "consortium" },
      { label: "Renda de aluguel", financing: "Parcela > aluguel", consortium: "Aluguel ≈ parcela", winner: "consortium" },
      { label: "Múltiplas cotas", financing: "Difícil aprovação", consortium: "Sim, quantas quiser", winner: "consortium" },
    ],
    comparisonNote: "Cenário: aquisição de imóvel de R$ 500.000 para investimento | Financiamento: 180 meses, 10,5% a.a. | Consórcio: 200 meses, 18% taxa admin total.",
    steps: [
      { title: "Defina seu objetivo", description: "Imóvel para renda, expansão de negócio, diversificação. Nosso consultor traça a estratégia." },
      { title: "Monte seu portfólio", description: "Você pode ter múltiplas cotas com valores e prazos diferentes, diversificando seus investimentos." },
      { title: "Acelere com lance", description: "Com lance estratégico de 30-40%, você é contemplado rápido e já começa a gerar retorno." },
      { title: "Colha os frutos", description: "Imóvel adquirido valoriza + gera renda de aluguel. Patrimônio que cresce sem juros." },
    ],
    theme: {
      accent: "#7C3AED",
      accentLight: "#A78BFA",
      accentRgb: "124,58,237",
      gradient: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
      darkBg: "linear-gradient(180deg, #1A0A33 0%, #2E1065 50%, #1A0A33 100%)",
      benefitsLayout: "bento",
      comparisonStyle: "table",
      stepsStyle: "horizontal",
    },
    ctaHeadline: "Quero construir patrimônio sem juros corroendo meu dinheiro",
    ctaSub:
      "Simule agora e veja como o consórcio pode ser a peça-chave do seu planejamento financeiro.",
    ctaStats: "Calcular meu retorno potencial",
    ctaFeatures: "Qual estratégia de investimento combina com você?",
    ctaSteps: "Montar minha estratégia agora",
    benefits: [
      {
        title: "Patrimônio sem dívida cara",
        description:
          "Construa patrimônio pagando parcelas sem juros. O bem adquirido se valoriza enquanto você paga menos que em um financiamento.",
        highlight: "Patrimônio que se valoriza",
      },
      {
        title: "Disciplina financeira",
        description:
          "O consórcio funciona como uma poupança forçada com objetivo claro. Ideal para quem quer guardar dinheiro com propósito definido.",
        highlight: "Poupança com objetivo",
      },
      {
        title: "Diversificação",
        description:
          "Use a carta de crédito para imóveis (renda de aluguel), veículos (frotas), equipamentos ou expansão de negócios.",
        highlight: "Múltiplas possibilidades",
      },
      {
        title: "Sem juros, mais retorno",
        description:
          "O dinheiro que você economiza em juros pode ser reinvestido. Em um plano de 10 anos, a economia pode superar R$ 60.000.",
        highlight: "Economia de R$ 60.000+",
      },
      {
        title: "Alavancagem inteligente",
        description:
          "Com um lance de 30-40%, você pode ser contemplado rapidamente e usar a carta completa. Retorno superior a muitos investimentos.",
        highlight: "Alto retorno sobre lance",
      },
      {
        title: "Planejamento de longo prazo",
        description:
          "Ideal para aposentadoria, educação dos filhos ou expansão de negócio. Comece agora, colha os frutos no futuro.",
        highlight: "Visão de futuro",
      },
    ],
    faqs: [
      {
        question: "Consórcio realmente vale como investimento?",
        answer:
          "Sim, especialmente para aquisição de bens que se valorizam, como imóveis. Ao comprar sem juros e com poder de negociação à vista, você obtém um ativo por um custo total muito menor do que financiado. Se o imóvel for alugado, a renda do aluguel pode até cobrir as parcelas do consórcio.",
      },
      {
        question: "Posso ter mais de um consórcio ao mesmo tempo?",
        answer:
          "Sim. Muitos investidores mantêm múltiplas cotas de consórcio como estratégia de diversificação e construção de patrimônio. Cada cota pode ter valores e prazos diferentes, adaptados aos seus objetivos.",
      },
      {
        question: "O que acontece com meu dinheiro se eu não for contemplado?",
        answer:
          "Seu dinheiro está seguro. Os recursos dos consorciados são mantidos em contas separadas, fiscalizadas pelo Banco Central. Mesmo que você não seja contemplado por lance ou sorteio, ao final do grupo você recebe a carta de crédito. Você também pode optar pelo cancelamento com devolução dos valores pagos.",
      },
      {
        question: "Consórcio é melhor que poupança ou CDB?",
        answer:
          "São instrumentos diferentes. A poupança rende pouco e o CDB exige IR. O consórcio não é um investimento financeiro tradicional. É uma ferramenta de aquisição de bens sem juros. A economia que você faz ao não pagar juros de financiamento muitas vezes supera o rendimento de aplicações conservadoras.",
      },
      {
        question: "Posso usar consórcio para expandir meu negócio?",
        answer:
          "Sim. A carta de crédito pode ser utilizada para compra de imóvel comercial, equipamentos, maquinário, veículos para frota, reformas e até capital de giro em alguns casos. É uma forma inteligente de crescer sem se endividar com empréstimos bancários.",
      },
      {
        question: "Como funciona a contemplação para fins de investimento?",
        answer:
          "A contemplação pode ser por sorteio (mensal) ou lance. Para investidores, a estratégia de lance costuma ser mais eficiente: ao ofertar um lance calculado, você pode ser contemplado rapidamente e já começar a usar o bem (ex: alugar um imóvel) enquanto continua pagando as parcelas sem juros.",
      },
    ],
    sectionOrder: ["stats", "problem-solution", "comparison", "features", "steps", "benefits", "faq", "cross-sell"],
    statsHighlight: [
      { value: "R$ 60 mil", label: "Economia vs financiamento", description: "Imóvel de R$ 500.000 sem juros compostos" },
      { value: "2x", label: "Retorno potencial", description: "Imóvel valoriza + gera renda de aluguel" },
      { value: "0", label: "Juros compostos", description: "Sem spread bancário corroendo seu patrimônio" },
    ],
    featureTitle: "Estratégias de investimento com consórcio",
    featureSubtitle: "Cada perfil de investidor encontra um caminho sem juros",
    featureCards: [
      { title: "Imóvel para renda", description: "Compre apartamento ou sala e gere renda passiva com aluguel." },
      { title: "Expansão de negócio", description: "Abra filial, compre ponto comercial ou equipe seu espaço." },
      { title: "Diversificação", description: "Múltiplas cotas com valores e prazos diferentes no portfólio." },
      { title: "Patrimônio familiar", description: "Construa herança sem dívida cara para as próximas gerações." },
    ],
  },

  ...EXTRA_CATEGORIES,
};

export const CATEGORY_PAGE_SLUGS = Object.values(CATEGORIES).map((c) => c.slug);

export function getCategoryJsonLd(cat: CategoryData) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: cat.name,
      description: cat.metaDescription,
      url: `${SITE_URL}/${cat.slug}`,
      provider: {
        "@type": "Organization",
        name: "Lacosta Consórcios",
        url: SITE_URL,
      },
      category: "Consórcio",
      areaServed: { "@type": "Country", name: "Brazil" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: cat.name,
          item: `${SITE_URL}/${cat.slug}`,
        },
      ],
    },
  ];
}
