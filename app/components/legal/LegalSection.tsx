import type { ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
};

export default function LegalSection({ title, children, id }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-bold text-[var(--primary-3)] tracking-tight mb-4">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}
