"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  ExternalLink,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MousePointerClick,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
} from "lucide-react";
import { useMultiTableRealtime } from "../lib/useRealtime";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Card, AnimatedCard, SectionTitle, ChartTooltip } from "./components/ChartCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Stats {
  range: string;
  overview: {
    totalLeads: number;
    leadsToday: number;
    leadsWeek: number;
    pageViewsToday: number;
    avgSessionDuration: number;
    uniqueSessions: number;
    activeNow: number;
    leadsInRange: number;
    pvInRange: number;
    prevLeads: number;
    prevPv: number;
    bounceRate: number;
    pagesPerSession: number;
    conversionRate: number;
  };
  leadsOverTime: { date: string; count: number }[];
  pvOverTime: { date: string; count: number }[];
  trafficSources: { source: string; count: number }[];
  topPages: { page: string; views: number }[];
  devices: { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
  objectives: { objective: string; count: number }[];
  statusBreakdown: { status: string; count: number }[];
  durationHistogram: { label: string; count: number }[];
  recentLeads: {
    id: string;
    name: string;
    phone: string;
    objective: string;
    status: string;
    value: number;
    created_at: string;
  }[];
  funnel: { stage: string; count: number }[];
  heatmap: { day: number; hour: number; count: number }[];
  utmCampaigns: { campaign: string; visits: number; leads: number; rate: number }[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SOURCE_COLORS: Record<string, string> = {
  organic: "#10b981",
  paid: "#f59e0b",
  direct: "#818cf8",
  social: "#ec4899",
  referral: "#3b82f6",
  campaign: "#a78bfa",
};
const SOURCE_LABELS: Record<string, string> = {
  organic: "Orgânico",
  paid: "Pago",
  direct: "Direto",
  social: "Social",
  referral: "Referência",
  campaign: "Campanha",
};
const OBJ_LABELS: Record<string, string> = {
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
const OBJ_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#ef4444", "#84cc16", "#f97316", "#14b8a6", "#6366f1"];
const STATUS_COLORS: Record<string, string> = {
  new: "#60a5fa",
  contacted: "#fbbf24",
  qualified: "#a78bfa",
  converted: "#34d399",
  disqualified: "#71717a",
  lost: "#f87171",
};
const STATUS_LABELS: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  converted: "Convertido",
  disqualified: "Desqualificado",
  lost: "Perdido",
};
const FUNNEL_GRADIENTS = [
  { from: "#818cf8", to: "#6366f1" },
  { from: "#3b82f6", to: "#2563eb" },
  { from: "#0ea5e9", to: "#0284c7" },
  { from: "#10b981", to: "#059669" },
  { from: "#22c55e", to: "#16a34a" },
];
const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DEVICE_ICONS: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmtDuration(s: number) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
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

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function deltaInfo(curr: number, prev: number) {
  if (prev === 0 && curr === 0) return { label: "—", direction: "neutral" as const };
  if (prev === 0) return { label: "+100%", direction: "up" as const };
  const pct = Math.round(((curr - prev) / prev) * 100);
  if (pct > 0) return { label: `+${pct}%`, direction: "up" as const };
  if (pct < 0) return { label: `${pct}%`, direction: "down" as const };
  return { label: "0%", direction: "neutral" as const };
}

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 w-80 rounded-xl bg-white/[0.03]" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[140px] rounded-2xl bg-white/[0.03]" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="h-[340px] rounded-2xl bg-white/[0.03] lg:col-span-3" />
        <div className="h-[340px] rounded-2xl bg-white/[0.03] lg:col-span-2" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const RT_TABLES = ["leads", "page_views", "events"];
const POLL_MS = 10_000;

const RANGES = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "1y", label: "1 ano" },
  { value: "all", label: "Tudo" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [range, setRange] = useState("30d");
  const lastFetch = useRef(0);

  const fetchStats = useCallback(() => {
    const now = Date.now();
    if (now - lastFetch.current < 2000) return;
    lastFetch.current = now;
    fetch(`/api/admin/stats?range=${range}`)
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setPulse(true);
        setTimeout(() => setPulse(false), 1200);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [range]);

  useEffect(() => {
    setLoading(true);
    lastFetch.current = 0;
    fetchStats();
    const poll = setInterval(fetchStats, POLL_MS);
    return () => clearInterval(poll);
  }, [fetchStats]);

  useEffect(() => {
    const tick = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useMultiTableRealtime(RT_TABLES, fetchStats);

  if (loading) return <Skeleton />;
  if (!stats)
    return <p className="py-20 text-center text-zinc-500">Erro ao carregar dados.</p>;

  const o = stats.overview;
  const totalTraffic = stats.trafficSources.reduce((s, t) => s + t.count, 0);
  const rangeLabel = RANGES.find((r) => r.value === range)?.label ?? range;
  const leadsDelta = deltaInfo(o.leadsInRange, o.prevLeads);
  const pvDelta = deltaInfo(o.pvInRange, o.prevPv);

  const combinedChart = stats.leadsOverTime.map((l) => {
    const pv = stats.pvOverTime.find((p) => p.date === l.date);
    return { date: l.date, leads: l.count, views: pv?.count ?? 0 };
  });
  stats.pvOverTime.forEach((p) => {
    if (!combinedChart.find((c) => c.date === p.date)) {
      combinedChart.push({ date: p.date, leads: 0, views: p.count });
    }
  });
  combinedChart.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
      {/* ---- HEADER ---- */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">Dashboard</h1>
            <div className="mt-1 flex items-center gap-3 text-[12px] text-zinc-500">
              <span className={`inline-flex items-center gap-1.5 transition-colors ${pulse ? "text-emerald-400" : ""}`}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-bold text-emerald-400">{o.activeNow}</span> ao vivo
              </span>
              <span className="text-zinc-700">·</span>
              <span className="tabular-nums font-mono text-zinc-600">
                {clock.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.05] bg-[#0f0f12] p-1">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                range === r.value
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-blue-400 shadow-sm shadow-blue-500/10"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ---- STAT CARDS ---- */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label={`Leads (${rangeLabel})`}
          value={o.leadsInRange}
          delta={leadsDelta}
          gradient="from-blue-500/15 to-blue-600/5"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          sparkline={stats.leadsOverTime.slice(-14)}
          sparkColor="#3b82f6"
        />
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label={`Page views (${rangeLabel})`}
          value={o.pvInRange}
          delta={pvDelta}
          gradient="from-violet-500/15 to-violet-600/5"
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10"
          sparkline={stats.pvOverTime.slice(-14)}
          sparkColor="#8b5cf6"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Taxa de conversão"
          value={o.conversionRate}
          suffix="%"
          gradient="from-emerald-500/15 to-emerald-600/5"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="Tempo médio"
          value={fmtDuration(o.avgSessionDuration)}
          rawNumber={false}
          gradient="from-amber-500/15 to-amber-600/5"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          extra={
            <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-600">
              <span>{o.bounceRate}% bounce</span>
              <span>·</span>
              <span>{o.pagesPerSession} pg/sessão</span>
            </div>
          }
        />
      </div>

      {/* ---- MAIN CHART + TRAFFIC ---- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <Card glass>
            <SectionTitle>Evolução — {rangeLabel}</SectionTitle>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedChart} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) => d.slice(5)}
                    tick={{ fill: "#3f3f46", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#3f3f46", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    width={32}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gViews)" name="Views" animationDuration={1200} />
                  <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fill="url(#gLeads)" name="Leads" animationDuration={1400} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card glass className="flex h-full flex-col">
            <SectionTitle icon={<Globe className="h-3.5 w-3.5 text-cyan-400" />}>
              Fontes de tráfego
            </SectionTitle>
            <div className="flex flex-1 items-center gap-5">
              <div className="h-[190px] w-[190px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.trafficSources}
                      dataKey="count"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      cornerRadius={6}
                      animationDuration={1000}
                    >
                      {stats.trafficSources.map((s, i) => (
                        <Cell key={i} fill={SOURCE_COLORS[s.source] || "#52525b"} stroke="transparent" />
                      ))}
                    </Pie>
                    <text x="50%" y="44%" textAnchor="middle" fill="#fafafa" fontSize={24} fontWeight={800}>
                      {totalTraffic.toLocaleString("pt-BR")}
                    </text>
                    <text x="50%" y="58%" textAnchor="middle" fill="#52525b" fontSize={10} fontWeight={500}>
                      visitas
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2.5 flex-1">
                {stats.trafficSources.map((s) => {
                  const pct = totalTraffic ? Math.round((s.count / totalTraffic) * 100) : 0;
                  return (
                    <div key={s.source} className="group">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-2 text-zinc-400">
                          <span className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: SOURCE_COLORS[s.source] || "#52525b" }} />
                          {SOURCE_LABELS[s.source] || s.source}
                        </span>
                        <span className="font-bold tabular-nums text-zinc-200">{pct}%</span>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: SOURCE_COLORS[s.source] || "#52525b" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ---- FUNNEL ---- */}
      <motion.div variants={fadeUp}>
        <Card glass>
          <SectionTitle icon={<MousePointerClick className="h-3.5 w-3.5 text-indigo-400" />}>
            Funil de conversão
          </SectionTitle>
          <FunnelChart data={stats.funnel} />
        </Card>
      </motion.div>

      {/* ---- STATUS PIPELINE + DEVICES + DURATION ---- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AnimatedCard glass>
          <SectionTitle>Pipeline de leads</SectionTitle>
          <div className="space-y-2.5">
            {stats.statusBreakdown.map((s) => {
              const total = stats.statusBreakdown.reduce((acc, x) => acc + x.count, 0);
              const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
              return (
                <div key={s.status}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[s.status] || "#52525b" }} />
                      {STATUS_LABELS[s.status] || s.status}
                    </span>
                    <span className="font-bold tabular-nums text-zinc-200">
                      {s.count} <span className="font-normal text-zinc-600">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[s.status] || "#52525b" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, 1)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        <AnimatedCard glass>
          <SectionTitle>Dispositivos</SectionTitle>
          <div className="space-y-4">
            {stats.devices.map((d) => {
              const total = stats.devices.reduce((s, x) => s + x.count, 0);
              const pct = total ? Math.round((d.count / total) * 100) : 0;
              const DeviceIcon = DEVICE_ICONS[d.device] || Monitor;
              return (
                <div key={d.device} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                    <DeviceIcon className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="capitalize text-zinc-400">{d.device}</span>
                      <span className="font-bold tabular-nums text-zinc-200">{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        <AnimatedCard glass>
          <SectionTitle>Duração das sessões</SectionTitle>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.durationHistogram} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="label" tick={{ fill: "#52525b", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525b", fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Sessões" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {stats.durationHistogram.map((_, i) => (
                    <Cell key={i} fill={`hsl(${210 + i * 15}, 70%, ${55 - i * 3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* ---- HEATMAP ---- */}
      <motion.div variants={fadeUp}>
        <Heatmap data={stats.heatmap} />
      </motion.div>

      {/* ---- OBJECTIVES + TOP PAGES + BROWSERS ---- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AnimatedCard glass className="h-full">
          <SectionTitle>Leads por objetivo</SectionTitle>
          {stats.objectives.length > 0 ? (
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.objectives} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <XAxis type="number" tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="objective" tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={false} tickLine={false} width={80} tickFormatter={(v) => OBJ_LABELS[v] || v} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Leads" animationDuration={1000}>
                    {stats.objectives.map((_, i) => (
                      <Cell key={i} fill={OBJ_COLORS[i % OBJ_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="py-8 text-center text-xs text-zinc-600">Sem dados</p>
          )}
        </AnimatedCard>

        <AnimatedCard glass className="h-full">
          <SectionTitle>Top páginas</SectionTitle>
          <div className="space-y-2.5">
            {stats.topPages.map((p, i) => {
              const maxViews = stats.topPages[0]?.views || 1;
              const pct = Math.round((p.views / maxViews) * 100);
              return (
                <div key={p.page}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.04] text-[9px] font-bold tabular-nums text-zinc-600">
                        {i + 1}
                      </span>
                      <span className="max-w-[140px] truncate">{p.page}</span>
                    </span>
                    <span className="font-bold tabular-nums text-zinc-200">{p.views}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        <AnimatedCard glass className="h-full">
          <SectionTitle>Navegadores</SectionTitle>
          {stats.browsers.length > 0 ? (
            <div className="flex items-center gap-4">
              <div className="h-[180px] w-[120px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.browsers.slice(0, 5)}
                      dataKey="count"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={52}
                      paddingAngle={3}
                      cornerRadius={4}
                      animationDuration={800}
                    >
                      {stats.browsers.slice(0, 5).map((_, i) => (
                        <Cell key={i} fill={["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"][i]} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-1">
                {stats.browsers.slice(0, 5).map((b, i) => {
                  const total = stats.browsers.reduce((s, x) => s + x.count, 0);
                  const pct = total ? Math.round((b.count / total) * 100) : 0;
                  return (
                    <div key={b.browser} className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-2 text-zinc-400">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"][i] }} />
                        {b.browser}
                      </span>
                      <span className="font-bold tabular-nums text-zinc-200">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-xs text-zinc-600">Sem dados</p>
          )}
        </AnimatedCard>
      </div>

      {/* ---- UTM CAMPAIGNS ---- */}
      {stats.utmCampaigns.length > 0 && (
        <AnimatedCard glass>
          <SectionTitle icon={<Megaphone className="h-3.5 w-3.5 text-amber-400" />}>
            Campanhas UTM
          </SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.05] text-[10px] uppercase tracking-wider text-zinc-600">
                  <th className="pb-3 pr-4 font-medium">Campanha</th>
                  <th className="pb-3 pr-4 font-medium text-right">Visitas</th>
                  <th className="pb-3 pr-4 font-medium text-right">Leads</th>
                  <th className="pb-3 pr-4 font-medium">Performance</th>
                  <th className="pb-3 font-medium text-right">Conversão</th>
                </tr>
              </thead>
              <tbody>
                {stats.utmCampaigns.map((c) => {
                  const maxVisits = stats.utmCampaigns[0]?.visits || 1;
                  const barPct = Math.round((c.visits / maxVisits) * 100);
                  return (
                    <tr key={c.campaign} className="border-b border-white/[0.03] last:border-0">
                      <td className="py-3 pr-4 font-medium text-zinc-300">{c.campaign}</td>
                      <td className="py-3 pr-4 text-right tabular-nums text-zinc-400">{c.visits}</td>
                      <td className="py-3 pr-4 text-right tabular-nums text-zinc-400">{c.leads}</td>
                      <td className="py-3 pr-4 w-32">
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${barPct}%` }} />
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`font-bold tabular-nums ${c.rate >= 5 ? "text-emerald-400" : c.rate >= 2 ? "text-amber-400" : "text-zinc-400"}`}>
                          {c.rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      )}

      {/* ---- RECENT LEADS ---- */}
      {stats.recentLeads.length > 0 && (
        <AnimatedCard glass>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>Leads recentes</SectionTitle>
            <a
              href="/admin/leads"
              className="flex items-center gap-1 text-[11px] font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Ver todos <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.05] text-[10px] uppercase tracking-wider text-zinc-600">
                  <th className="pb-3 pr-4 font-medium">Lead</th>
                  <th className="pb-3 pr-4 font-medium hidden sm:table-cell">Objetivo</th>
                  <th className="pb-3 pr-4 font-medium hidden md:table-cell">Valor</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Quando</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map((l) => (
                  <tr key={l.id} className="border-b border-white/[0.03] last:border-0 transition-colors hover:bg-white/[0.02]">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-[10px] font-bold text-blue-300">
                          {initials(l.name)}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200">{l.name}</p>
                          <a
                            href={`https://wa.me/55${l.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-zinc-500 transition-colors hover:text-emerald-400"
                          >
                            {l.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-zinc-400 hidden sm:table-cell">
                      {OBJ_LABELS[l.objective] || l.objective}
                    </td>
                    <td className="py-3 pr-4 tabular-nums text-zinc-400 hidden md:table-cell">
                      {l.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[l.status] || "#52525b" }} />
                        <span className="text-zinc-400">{STATUS_LABELS[l.status] || l.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-right tabular-nums text-zinc-500">{timeAgo(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Card with Sparkline                                           */
/* ------------------------------------------------------------------ */

function StatCard({
  icon,
  label,
  value,
  suffix = "",
  delta,
  gradient,
  iconColor,
  iconBg,
  sparkline,
  sparkColor,
  rawNumber = true,
  extra,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
  delta?: { label: string; direction: "up" | "down" | "neutral" };
  gradient: string;
  iconColor: string;
  iconBg: string;
  sparkline?: { date: string; count: number }[];
  sparkColor?: string;
  rawNumber?: boolean;
  extra?: React.ReactNode;
}) {
  const DeltaIcon = delta?.direction === "up" ? ArrowUpRight : delta?.direction === "down" ? ArrowDownRight : Minus;
  const gradientId = `spark-${label.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <motion.div variants={fadeUp}>
      <Card glass className="group relative overflow-hidden transition-all duration-300 hover:border-white/[0.08] hover:shadow-lg hover:shadow-black/20">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className={`inline-flex rounded-xl p-2 ${iconBg} ${iconColor}`}>
              {icon}
            </div>
            {delta && delta.label !== "—" && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-[10px] font-bold ${
                  delta.direction === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : delta.direction === "down"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-zinc-500/10 text-zinc-500"
                }`}
              >
                <DeltaIcon className="h-3 w-3" />
                {delta.label}
              </span>
            )}
          </div>

          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-extrabold tabular-nums tracking-tight text-white">
            {rawNumber && typeof value === "number" ? value.toLocaleString("pt-BR") : value}
            {suffix && <span className="text-lg text-zinc-400">{suffix}</span>}
          </p>

          {extra}

          {sparkline && sparkline.length > 2 && (
            <div className="mt-2 h-8 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkline} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={sparkColor} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={sparkColor}
                    strokeWidth={1.5}
                    fill={`url(#${gradientId})`}
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Funnel Chart                                                       */
/* ------------------------------------------------------------------ */

function FunnelChart({ data }: { data: Stats["funnel"] }) {
  const maxCount = data[0]?.count || 1;

  return (
    <div className="space-y-2.5">
      {data.map((stage, i) => {
        const pct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
        const dropoff =
          i > 0 && data[i - 1].count > 0
            ? Math.round(((data[i - 1].count - stage.count) / data[i - 1].count) * 100)
            : 0;
        const grad = FUNNEL_GRADIENTS[i] || FUNNEL_GRADIENTS[4];
        return (
          <div key={stage.stage} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-right text-[11px] font-medium text-zinc-400">
              {stage.stage}
            </span>
            <div className="relative flex-1 h-9 rounded-xl overflow-hidden bg-white/[0.02]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(pct, 2)}%` }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
              />
              <div className="relative z-10 flex h-full items-center justify-between px-3.5">
                <span className="text-[12px] font-bold text-white drop-shadow-sm">
                  {stage.count.toLocaleString("pt-BR")}
                </span>
                {dropoff > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] font-medium text-zinc-400/80">
                    <ArrowDownRight className="h-3 w-3" />
                    {dropoff}%
                  </span>
                )}
              </div>
            </div>
            <span className="w-10 text-right text-[10px] tabular-nums font-medium text-zinc-600">
              {Math.round(pct)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heatmap                                                            */
/* ------------------------------------------------------------------ */

function Heatmap({ data }: { data: Stats["heatmap"] }) {
  const grid = useMemo(() => {
    const map: Record<string, number> = {};
    let max = 0;
    data.forEach(({ day, hour, count }) => {
      map[`${day}-${hour}`] = count;
      if (count > max) max = count;
    });
    return { map, max };
  }, [data]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  function cellStyle(count: number): React.CSSProperties {
    if (count === 0 || grid.max === 0) return { backgroundColor: "rgba(255,255,255,0.015)" };
    const ratio = count / grid.max;
    const h = 210 + ratio * 30;
    const s = 60 + ratio * 20;
    const l = 15 + ratio * 40;
    return { backgroundColor: `hsl(${h}, ${s}%, ${l}%)` };
  }

  return (
    <Card glass>
      <SectionTitle>Mapa de calor — visitas por dia e hora</SectionTitle>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="mb-1 flex items-center gap-[2px] pl-10">
            {hours.map((h) => (
              <div key={h} className="flex-1 text-center text-[8px] tabular-nums text-zinc-700">
                {h % 3 === 0 ? `${String(h).padStart(2, "0")}` : ""}
              </div>
            ))}
          </div>

          {[1, 2, 3, 4, 5, 6, 0].map((day) => (
            <div key={day} className="flex items-center gap-[2px] mb-[2px]">
              <span className="w-9 shrink-0 text-right text-[10px] font-medium text-zinc-600 pr-1">
                {DAY_LABELS[day]}
              </span>
              {hours.map((hour) => {
                const count = grid.map[`${day}-${hour}`] || 0;
                return (
                  <div
                    key={hour}
                    className="h-5 flex-1 rounded-[4px] transition-all duration-200 hover:ring-1 hover:ring-white/20 hover:scale-110"
                    style={cellStyle(count)}
                    title={`${DAY_LABELS[day]} ${String(hour).padStart(2, "0")}h — ${count} visitas`}
                  />
                );
              })}
            </div>
          ))}

          <div className="mt-3 flex items-center justify-end gap-1.5 text-[9px] text-zinc-700">
            <span>Menos</span>
            {[0, 0.25, 0.5, 0.75, 1].map((r) => (
              <div
                key={r}
                className="h-3 w-3 rounded-[3px]"
                style={{
                  backgroundColor:
                    r === 0
                      ? "rgba(255,255,255,0.015)"
                      : `hsl(${210 + r * 30}, ${60 + r * 20}%, ${15 + r * 40}%)`,
                }}
              />
            ))}
            <span>Mais</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
