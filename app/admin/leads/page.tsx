"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Trash2,
  CheckSquare,
  Square,
  X,
} from "lucide-react";
import { useRealtimeTable } from "../../lib/useRealtime";

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface Lead {
  id: string;
  name: string;
  phone: string;
  objective: string;
  simulation_type: string;
  value: number;
  source: string;
  status: string;
  notes: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

const STATUSES = [
  { value: "", label: "Todos os status" },
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "qualified", label: "Qualificado" },
  { value: "converted", label: "Convertido" },
  { value: "disqualified", label: "Desqualificado" },
  { value: "lost", label: "Perdido" },
];

const STATUS_STYLE: Record<string, { dot: string; text: string; bg: string }> = {
  new: { dot: "bg-blue-400", text: "text-blue-400", bg: "bg-blue-500/10" },
  contacted: { dot: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-500/10" },
  qualified: { dot: "bg-purple-400", text: "text-purple-400", bg: "bg-purple-500/10" },
  converted: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  disqualified: { dot: "bg-zinc-500", text: "text-zinc-400", bg: "bg-zinc-500/10" },
  lost: { dot: "bg-red-400", text: "text-red-400", bg: "bg-red-500/10" },
};

const OBJECTIVES = [
  { value: "", label: "Todos objetivos" },
  { value: "imoveis", label: "Imóvel" },
  { value: "veiculos", label: "Veículos" },
  { value: "investimento", label: "Investimento" },
  { value: "embarcacoes", label: "Embarcações" },
  { value: "servicos", label: "Serviços" },
  { value: "agronegocio", label: "Agronegócio" },
  { value: "educacao", label: "Educação" },
  { value: "saude", label: "Saúde" },
  { value: "reforma", label: "Reforma" },
  { value: "estetica", label: "Estética" },
  { value: "outro", label: "Outro" },
];

const OBJ_LABEL: Record<string, string> = Object.fromEntries(
  OBJECTIVES.filter((o) => o.value).map((o) => [o.value, o.label])
);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmtPhone(p: string) {
  if (p.length === 11) return `(${p.slice(0, 2)}) ${p.slice(2, 7)}-${p.slice(7)}`;
  if (p.length === 10) return `(${p.slice(0, 2)}) ${p.slice(2, 6)}-${p.slice(6)}`;
  return p;
}

function fmtCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min}min`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  return `${Math.floor(hr / 24)}d`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [objective, setObjective] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [rtTick, setRtTick] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  useRealtimeTable(
    "leads",
    useCallback(() => {
      setLiveUpdate(true);
      setRtTick((t) => t + 1);
      setTimeout(() => setLiveUpdate(false), 1500);
    }, [])
  );

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (objective) params.set("objective", objective);

    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch {
      console.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, search, status, objective, rtTick]);

  useEffect(() => {
    fetchLeads();
    const poll = setInterval(fetchLeads, 30_000);
    return () => clearInterval(poll);
  }, [fetchLeads]);

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Apagar este lead permanentemente?")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setExpandedId(null);
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
    fetchLeads();
  };

  const deleteSelected = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Apagar ${selected.size} lead(s) permanentemente?`)) return;
    setDeleting(true);
    await Promise.all(
      Array.from(selected).map((id) =>
        fetch("/api/admin/leads", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
      )
    );
    setSelected(new Set());
    setExpandedId(null);
    setDeleting(false);
    fetchLeads();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (selected.size === leads.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.map((l) => l.id)));
    }
  };

  const exportCsv = async () => {
    const params = new URLSearchParams({ page: "1" });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (objective) params.set("objective", objective);

    let allLeads: Lead[] = [];
    let currentPage = 1;
    let hasMore = true;
    while (hasMore) {
      params.set("page", String(currentPage));
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      allLeads = [...allLeads, ...(data.leads ?? [])];
      hasMore = allLeads.length < (data.total ?? 0);
      currentPage++;
      if (currentPage > 50) break;
    }

    const headers = ["Nome", "Telefone", "Objetivo", "Tipo simulação", "Valor", "Status", "Origem", "UTM Source", "UTM Medium", "UTM Campaign", "Observações", "Data"];
    const rows = allLeads.map((l) => [
      l.name, l.phone, OBJ_LABEL[l.objective] || l.objective, l.simulation_type,
      String(l.value), l.status, l.source, l.utm_source || "", l.utm_medium || "",
      l.utm_campaign || "", (l.notes || "").replace(/[\n\r]/g, " "),
      new Date(l.created_at).toLocaleString("pt-BR"),
    ]);
    const csvContent = [headers.join(";"), ...rows.map((r) => r.map((v) => `"${v}"`).join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-lacosta-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / 20);
  const hasFilters = search || status || objective;
  const allSelected = leads.length > 0 && selected.size === leads.length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Leads</h1>
          <p className="mt-0.5 flex items-center gap-2 text-[12px] text-zinc-500">
            <span className="tabular-nums font-medium">{total}</span> lead{total !== 1 ? "s" : ""} capturados
            <span className={`inline-flex items-center gap-1 transition-colors ${liveUpdate ? "text-emerald-400" : "text-zinc-700"}`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${liveUpdate ? "animate-ping opacity-75" : "opacity-0"}`} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Realtime
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={deleteSelected}
              disabled={deleting}
              className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Apagar {selected.size}
            </motion.button>
          )}
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-[#0f0f12] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.04]"
          >
            <Download className="h-3.5 w-3.5" />
            CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-white/[0.05] bg-[#0f0f12] py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-zinc-700 outline-none transition-all focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/10"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-white/[0.05] bg-[#0f0f12] px-4 py-2.5 text-[13px] text-zinc-300 outline-none transition-all focus:border-blue-500/30"
        >
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select
          value={objective}
          onChange={(e) => { setObjective(e.target.value); setPage(1); }}
          className="rounded-xl border border-white/[0.05] bg-[#0f0f12] px-4 py-2.5 text-[13px] text-zinc-300 outline-none transition-all focus:border-blue-500/30"
        >
          {OBJECTIVES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setStatus(""); setObjective(""); setPage(1); }}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <X className="h-3 w-3" /> Limpar
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0f0f12]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.05] text-[10px] uppercase tracking-wider text-zinc-600">
                <th className="px-4 py-3 w-10">
                  <button onClick={toggleAll} className="text-zinc-600 hover:text-zinc-400 transition-colors">
                    {allSelected ? <CheckSquare className="h-4 w-4 text-blue-400" /> : <Square className="h-4 w-4" />}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Objetivo</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Origem</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-800 border-t-blue-500" />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-sm text-zinc-600">
                    Nenhum lead encontrado
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const isOpen = expandedId === lead.id;
                  const isSelected = selected.has(lead.id);
                  const st = STATUS_STYLE[lead.status] || { dot: "bg-zinc-500", text: "text-zinc-400", bg: "bg-zinc-500/10" };
                  return (
                    <tbody key={lead.id}>
                      <tr
                        className={`cursor-pointer border-b border-white/[0.03] transition-all ${
                          isSelected ? "bg-blue-500/[0.04]" : "hover:bg-white/[0.015]"
                        }`}
                      >
                        <td className="px-4 py-3" onClick={(e) => { e.stopPropagation(); toggleSelect(lead.id); }}>
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Square className="h-4 w-4 text-zinc-700 hover:text-zinc-500 transition-colors" />
                          )}
                        </td>
                        <td className="px-4 py-3" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 text-[10px] font-bold text-blue-300">
                              {initials(lead.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-200">{lead.name}</p>
                              <a
                                href={`https://wa.me/55${lead.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[11px] tabular-nums text-zinc-500 transition-colors hover:text-emerald-400"
                              >
                                {fmtPhone(lead.phone)}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 text-zinc-400 sm:table-cell" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          {OBJ_LABEL[lead.objective] || lead.objective}
                        </td>
                        <td className="hidden px-4 py-3 tabular-nums text-zinc-400 md:table-cell" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          {fmtCurrency(lead.value)}
                        </td>
                        <td className="px-4 py-3" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium ${st.text} ${st.bg}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                            {STATUSES.find((s) => s.value === lead.status)?.label || lead.status}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-[11px] text-zinc-500 lg:table-cell" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          {[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || lead.source}
                        </td>
                        <td className="px-4 py-3" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          <div>
                            <p className="text-[11px] tabular-nums text-zinc-500">{timeAgo(lead.created_at)}</p>
                            <p className="text-[9px] tabular-nums text-zinc-700">{fmtDate(lead.created_at)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-600" onClick={() => setExpandedId(isOpen ? null : lead.id)}>
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </td>
                      </tr>

                      <AnimatePresence>
                        {isOpen && (
                          <tr>
                            <td colSpan={8} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="border-b border-white/[0.05] bg-white/[0.01] px-5 py-5">
                                  <div className="flex flex-wrap gap-5">
                                    <div>
                                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                                        Status
                                      </p>
                                      <select
                                        value={lead.status}
                                        onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                                        className="rounded-xl border border-white/[0.06] bg-[#0f0f12] px-3 py-2 text-xs text-white outline-none transition-all focus:border-blue-500/30"
                                      >
                                        {STATUSES.filter((s) => s.value).map((s) => (
                                          <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className="flex-1 min-w-[200px]">
                                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                                        Observações
                                      </p>
                                      <textarea
                                        defaultValue={lead.notes || ""}
                                        onBlur={(e) => updateLead(lead.id, { notes: e.target.value })}
                                        rows={2}
                                        className="w-full rounded-xl border border-white/[0.06] bg-[#0f0f12] px-3 py-2 text-xs text-white placeholder:text-zinc-700 outline-none transition-all focus:border-blue-500/30"
                                        placeholder="Anotações sobre este lead..."
                                      />
                                    </div>

                                    <div className="flex flex-col justify-end gap-2">
                                      <a
                                        href={`https://wa.me/55${lead.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                                      >
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        WhatsApp
                                      </a>
                                      <button
                                        onClick={() => deleteLead(lead.id)}
                                        className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Apagar
                                      </button>
                                    </div>
                                  </div>

                                  {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      {lead.utm_source && (
                                        <span className="rounded-lg bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500">
                                          source: <span className="font-medium text-zinc-300">{lead.utm_source}</span>
                                        </span>
                                      )}
                                      {lead.utm_medium && (
                                        <span className="rounded-lg bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500">
                                          medium: <span className="font-medium text-zinc-300">{lead.utm_medium}</span>
                                        </span>
                                      )}
                                      {lead.utm_campaign && (
                                        <span className="rounded-lg bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500">
                                          campaign: <span className="font-medium text-zinc-300">{lead.utm_campaign}</span>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded-xl border border-white/[0.05] bg-[#0f0f12] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) {
                p = i + 1;
              } else if (page <= 4) {
                p = i + 1;
              } else if (page >= totalPages - 3) {
                p = totalPages - 6 + i;
              } else {
                p = page - 3 + i;
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${
                    page === p
                      ? "bg-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/10"
                      : "text-zinc-600 hover:bg-white/[0.04] hover:text-zinc-300"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-xl border border-white/[0.05] bg-[#0f0f12] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
