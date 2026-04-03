"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Card({
  children,
  className = "",
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.05] p-5 ${
        glass
          ? "bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl"
          : "bg-[#0f0f12]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function AnimatedCard({
  children,
  className = "",
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card className={className} glass={glass}>
        {children}
      </Card>
    </motion.div>
  );
}

export function SectionTitle({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      {icon}
      <h3 className="text-[13px] font-semibold text-zinc-300">{children}</h3>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#141418] px-4 py-3 shadow-2xl shadow-black/40">
      {label && (
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
          {label}
        </p>
      )}
      {payload.map((e: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: e.color }} />
          <span className="text-[11px] text-zinc-400">{e.name}</span>
          <span className="ml-auto pl-4 text-[11px] font-bold tabular-nums text-white">
            {typeof e.value === "number" ? e.value.toLocaleString("pt-BR") : e.value}
          </span>
        </div>
      ))}
    </div>
  );
}
