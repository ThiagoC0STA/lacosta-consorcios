import Link from "next/link";
import Container from "./components/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white">
      <Container maxWidth="lg" className="py-20 text-center">
        <p className="text-8xl font-black text-[var(--primary-5)]/20">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-neutral-900 sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-base text-neutral-600">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-1)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--primary-2)]"
          >
            Voltar ao início
          </Link>
          <Link
            href="/#simulacao"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Simular consórcio
          </Link>
        </div>
      </Container>
    </main>
  );
}
