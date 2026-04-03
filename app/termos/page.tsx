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
  title: "Termos de Uso",
  description:
    "Regras de uso do site Lacosta Consórcios, limitações de responsabilidade e contato.",
  alternates: { canonical: `${SITE_URL}/termos` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pb-28 pt-10 md:pt-14">
      <Container maxWidth="3xl" className="pb-16">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--primary-5)]">
          Transparência
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--primary-3)] md:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-3 text-sm text-neutral-500">Última atualização: {LAST_LEGAL_UPDATE}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
          Estes Termos regulam o uso do site{" "}
          <Link href="/" className="font-semibold text-[var(--primary-1)] underline">
            {SITE_PUBLIC_URL.replace(/^https?:\/\//, "")}
          </Link>
          , operado sob a marca <strong className="text-neutral-900">{SITE_DISPLAY_NAME}</strong> pela
          pessoa jurídica <strong>{LEGAL_COMPANY_NAME}</strong>, inscrita no CNPJ nº{" "}
          <strong>{formatCnpj(COMPANY_CNPJ_RAW)}</strong>, com sede em {ADDRESS_LINES.join(", ")}.
          Ao acessar ou utilizar o site, você concorda com estes Termos.
        </p>

        <article className="mt-10 space-y-10">
          <LegalSection title="1. Natureza da informação">
            <p>
              O conteúdo disponível no site tem caráter informativo e promocional sobre consórcios
              ofertados em parceria com administradoras autorizadas a operar pelo Banco Central do
              Brasil. Nada neste site constitui oferta vinculante, promessa de resultado, garantia
              de contemplação ou aprovação de crédito.
            </p>
            <p>
              Condições comerciais, taxas, prazos, documentação e aprovações seguem exclusivamente
              as regras da administradora e o instrumento contratual firmado pelo cliente.
            </p>
          </LegalSection>

          <LegalSection title="2. Uso permitido">
            <p>
              Você compromete-se a utilizar o site de forma lícita, sem violar direitos de terceiros,
              sem tentar obter acesso não autorizado a sistemas, e sem disseminar malware ou conteúdo
              ilícito. Podemos suspender ou restringir o acesso em caso de uso abusivo.
            </p>
          </LegalSection>

          <LegalSection title="3. Propriedade intelectual">
            <p>
              Marcas, logotipos, textos, imagens, layout e demais elementos do site — salvo quando
              indicado de outra forma — pertencem à {LEGAL_COMPANY_NAME} ou a licenciantes. É proibida
              reprodução ou uso comercial sem autorização prévia por escrito.
            </p>
          </LegalSection>

          <LegalSection title="4. Links e serviços de terceiros">
            <p>
              O site pode conter links para redes sociais, WhatsApp, vídeos hospedados em
              plataformas terceiras (por exemplo, YouTube) e ferramentas de medição. Esses serviços
              possuem termos e políticas próprias; recomendamos a leitura deles.
            </p>
          </LegalSection>

          <LegalSection title="5. Limitação de responsabilidade">
            <p>
              Na extensão máxima permitida pela lei aplicável, a {LEGAL_COMPANY_NAME} não se
              responsabiliza por indisponibilidade temporária do site, interrupções, erros de
              conteúdo corrigidos quando comunicados, decisões de negócio tomadas com base apenas
              em informações resumidas no site sem validação com a equipe, ou prejuízos indiretos
              ou lucros cessantes.
            </p>
          </LegalSection>

          <LegalSection title="6. Privacidade">
            <p>
              O tratamento de dados pessoais é descrito na nossa{" "}
              <Link href="/privacidade" className="font-semibold text-[var(--primary-1)] underline">
                Política de Privacidade
              </Link>
              , parte integrante desta relação com o usuário do site.
            </p>
          </LegalSection>

          <LegalSection title="7. Alterações">
            <p>
              Podemos alterar estes Termos a qualquer momento. A data da versão vigente aparece no
              topo desta página. O uso continuado do site após alterações implica ciência das
              mudanças.
            </p>
          </LegalSection>

          <LegalSection title="8. Lei aplicável e foro">
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o
              foro da comarca de Curitiba, Estado do Paraná, salvo hipótese de foro específico
              impositivo ao consumidor.
            </p>
          </LegalSection>

          <LegalSection title="9. Contato">
            <p>
              Dúvidas sobre estes Termos:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[var(--primary-1)] underline">
                {CONTACT_EMAIL}
              </a>{" "}
              ou{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="font-semibold text-[var(--primary-1)] underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
              .
            </p>
          </LegalSection>
        </article>

        <p className="mt-12 text-sm text-neutral-500">
          <Link href="/" className="font-semibold text-[var(--primary-1)] hover:underline">
            ← Voltar ao início
          </Link>
          {" · "}
          <Link href="/privacidade" className="font-semibold text-[var(--primary-1)] hover:underline">
            Política de Privacidade
          </Link>
        </p>
      </Container>
    </main>
  );
}
