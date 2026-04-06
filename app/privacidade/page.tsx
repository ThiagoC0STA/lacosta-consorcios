import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import LegalSection from "../components/legal/LegalSection";
import {
  ADDRESS_LINES,
  COMPANY_CNPJ_RAW,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  formatCnpj,
  LAST_LEGAL_UPDATE,
  LEGAL_COMPANY_NAME,
  SITE_DISPLAY_NAME,
  SITE_PUBLIC_URL,
} from "../lib/legal";
import { SITE_URL } from "../lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Lacosta Consórcios trata dados pessoais, cookies e seus direitos sob a LGPD.",
  alternates: { canonical: `${SITE_URL}/privacidade` },
  robots: { index: true, follow: true },
};

function displayCnpj(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 14 ? formatCnpj(raw) : raw;
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pb-28 pt-10 md:pt-14">
      <Container maxWidth="3xl" className="pb-16">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--primary-5)]">
          Transparência
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--primary-3)] md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-neutral-500">Última atualização: {LAST_LEGAL_UPDATE}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
          Esta Política descreve como{" "}
          <strong className="text-neutral-900">{SITE_DISPLAY_NAME}</strong> (“nós”) trata dados
          pessoais quando você utiliza o site{" "}
          <Link href="/" className="font-semibold text-[var(--primary-1)] underline">
            {SITE_PUBLIC_URL.replace(/^https?:\/\//, "")}
          </Link>
          . Ao utilizar o site, você declara que leu esta Política.
        </p>

        <article className="mt-10 space-y-10">
          <LegalSection title="1. Controlador e contato">
            <p>
              O controlador dos dados pessoais tratados por meio deste site é a pessoa jurídica{" "}
              <strong>{LEGAL_COMPANY_NAME}</strong>, inscrita no CNPJ nº{" "}
              <strong>{displayCnpj(COMPANY_CNPJ_RAW)}</strong>, com sede em {ADDRESS_LINES[0]},{" "}
              {ADDRESS_LINES[1]}, {ADDRESS_LINES[2]}.
            </p>
            <p>
              <strong>{SITE_DISPLAY_NAME}</strong> é o nome fantasia e a marca sob a qual atuamos no
              mercado, inclusive neste site.
            </p>
            <p>
              Para exercer direitos previstos na Lei Geral de Proteção de Dados (Lei nº 13.709/2018,
              “LGPD”) ou esclarecer dúvidas sobre privacidade, fale conosco:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-[var(--primary-1)] underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              ou{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="font-semibold text-[var(--primary-1)] underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Quais dados coletamos">
            <p>Podemos tratar, conforme a interação:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-4)]">
              <li>
                <strong>Dados de navegação e dispositivo:</strong> endereço IP, tipo de navegador,
                idioma, páginas visitadas, tempo aproximado de uso, origem da visita e identificadores
                gerados por cookies ou tecnologias similares.
              </li>
              <li>
                <strong>Dados fornecidos por você:</strong> por exemplo, textos que você envia ao
                iniciar conversa via WhatsApp ou outros canais acessados a partir do site.
              </li>
              <li>
                <strong>Dados agregados ou anonimizados</strong> para métricas de desempenho do site
                (como relatórios de audiência).
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Finalidades e bases legais">
            <p>Tratamos dados pessoais para:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-4)]">
              <li>
                <strong>Prestar atendimento e responder solicitações</strong> (execução de
                procedimentos preliminares ou contrato, legítimo interesse ou consentimento, conforme
                o caso).
              </li>
              <li>
                <strong>Melhorar o site e a experiência do usuário</strong> (legítimo interesse e/ou
                consentimento quando exigido).
              </li>
              <li>
                <strong>Medição de audiência e campanhas</strong> (cookies e tags de parceiros:
                consentimento quando aplicável, e legítimo interesse para medições estritamente
                necessárias, conforme a configuração das ferramentas).
              </li>
              <li>
                <strong>Cumprir obrigações legais e regulatórias</strong>, inclusive respostas a
                autoridades competentes.
              </li>
              <li>
                <strong>Defesa em processos administrativos ou judiciais</strong> (legítimo
                interesse ou cumprimento de obrigação legal).
              </li>
            </ul>
            <p>
              <em>
                Observação: consórcios são contratados junto às administradoras reguladas pelo Banco
                Central. Este site é um canal de divulgação e captação de interesse; a formalização
                ocorre nos fluxos oficiais da administradora e da corretora, com documentação
                própria.
              </em>
            </p>
          </LegalSection>

          <LegalSection title="4. Cookies e tecnologias semelhantes" id="cookies">
            <p>
              Utilizamos cookies e tecnologias de armazenamento local para lembrar preferências,
              medir tráfego e apoiar anúncios. Ferramentas de terceiros (por exemplo, provedores de
              análise e publicidade) podem definir seus próprios cookies sujeitos às políticas
              desses fornecedores.
            </p>
            <p>
              Você pode gerenciar cookies no próprio navegador (bloqueio, exclusão). O bloqueio de
              cookies pode afetar recursos do site.
            </p>
          </LegalSection>

          <LegalSection title="5. Compartilhamento">
            <p>Podemos compartilhar dados com:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-4)]">
              <li>
                <strong>Prestadores de serviço</strong> que hospedam o site, fazem análise de
                acessos ou operam ferramentas de marketing, sob contratos e instruções adequadas.
              </li>
              <li>
                <strong>Autoridades públicas</strong>, quando houver exigência legal ou ordem
                válida.
              </li>
            </ul>
            <p>Não vendemos seus dados pessoais.</p>
          </LegalSection>

          <LegalSection title="6. Transferência internacional">
            <p>
              Alguns fornecedores podem processar dados fora do Brasil. Quando aplicável, adotamos
              cláusulas contratuais e medidas compatíveis com a LGPD.
            </p>
          </LegalSection>

          <LegalSection title="7. Segurança e retenção">
            <p>
              Aplicamos medidas técnicas e organizacionais razoáveis para proteger dados pessoais.
              Mantemos dados apenas pelo tempo necessário para as finalidades descritas, salvo
              prazos legais maiores ou necessidade legítima documentada.
            </p>
          </LegalSection>

          <LegalSection title="8. Seus direitos (LGPD)">
            <p>Você pode solicitar, conforme a lei:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[var(--primary-4)]">
              <li>confirmação da existência de tratamento;</li>
              <li>acesso e correção de dados incompletos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
                desconformidade;</li>
              <li>portabilidade, quando aplicável;</li>
              <li>informação sobre compartilhamentos;</li>
              <li>revogação do consentimento, quando o tratamento se basear nele;</li>
              <li>oposição a tratamentos fundados em legítimo interesse, quando cabível.</li>
            </ul>
            <p>
              Encaminhe pedidos para{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[var(--primary-1)] underline">
                {CONTACT_EMAIL}
              </a>
              . Você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </LegalSection>

          <LegalSection title="9. Crianças e adolescentes">
            <p>
              Este site não é direcionado a menores de 16 anos de forma intencional. Se você é
              responsável legal e acredita que tratamos dados de menor sem fundamento adequado,
              contate-nos.
            </p>
          </LegalSection>

          <LegalSection title="10. Alterações">
            <p>
              Podemos atualizar esta Política para refletir mudanças legais ou no site. A data da
              última versão aparece no topo desta página. Revise periodicamente.
            </p>
          </LegalSection>
        </article>

        <p className="mt-12 text-sm text-neutral-500">
          <Link href="/" className="font-semibold text-[var(--primary-1)] hover:underline">
            ← Voltar ao início
          </Link>
        </p>
      </Container>
    </main>
  );
}
