"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useRealtimeTable } from "../../lib/useRealtime";

interface ToastData {
  id: string;
  name: string;
  objective: string;
}

const OBJ: Record<string, string> = {
  imoveis: "Imóvel",
  veiculos: "Veículos",
  investimento: "Investimento",
  reforma: "Reforma",
  servicos: "Serviços",
  educacao: "Educação",
  saude: "Saúde",
  estetica: "Estética",
  embarcacoes: "Embarcações",
  agronegocio: "Agronegócio",
  outro: "Outro",
};

export default function NewLeadToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const onInsert = useCallback((row: Record<string, unknown>) => {
    const name = String(row.name || "Novo lead");
    const objective = String(row.objective || "outro");
    const id = String(row.id || Date.now());

    setToast({ id, name, objective });
    setTimeout(() => setToast(null), 5000);
  }, []);

  useRealtimeTable(
    "leads",
    useCallback(() => {}, []),
    onInsert
  );

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -40, x: "-50%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed left-1/2 top-4 z-[100] flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3.5 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20">
            <UserPlus className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-300">
              Novo lead agora!
            </p>
            <p className="text-[11px] text-zinc-400">
              {toast.name} · {OBJ[toast.objective] || toast.objective}
            </p>
          </div>
          <div className="ml-2 flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
