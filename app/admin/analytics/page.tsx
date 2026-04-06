"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingDown,
  Layers,
  Timer,
  MousePointerClick,
  ShieldCheck,
  MapPin,
} from "lucide-react";
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
import { useMultiTableRealtime } from "../../lib/useRealtime";
import { Card, AnimatedCard, SectionTitle, ChartTooltip } from "../components/ChartCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AnalyticsData {
  overview: {
    uniqueSessions: number;
    pvInRange: number;
    bounceRate: number;
    pagesPerSession: number;
    avgSessionDuration: number;
    activeNow: number;
  };
  pvOverTime: { date: string; count: number }[];
  trafficSources: { source: string; count: number }[];
  devices: { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
  topPages: { page: string; views: number }[];
  durationHistogram: { label: string; count: number }[];
  heatmap: { day: number; hour: number; count: number }[];
  funnel: { stage: string; count: number }[];
  countries: { country: string; count: number }[];
  botsFiltered: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const RANGES = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "1y", label: "1 ano" },
  { value: "all", label: "Tudo" },
];

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
const BROWSER_COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#06b6d4"];
const DEVICE_ICONS: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const COUNTRY_NAMES: Record<string, string> = {
  BR: "Brasil", US: "Estados Unidos", DE: "Alemanha", IN: "Índia", PT: "Portugal",
  AR: "Argentina", CL: "Chile", CO: "Colômbia", MX: "México", GB: "Reino Unido",
  FR: "França", ES: "Espanha", IT: "Itália", CA: "Canadá", JP: "Japão",
  CN: "China", RU: "Rússia", AU: "Austrália", KR: "Coreia do Sul", NL: "Países Baixos",
  UY: "Uruguai", PY: "Paraguai", PE: "Peru", BO: "Bolívia", EC: "Equador",
};

function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const base = 0x1f1e6;
  return String.fromCodePoint(base + code.charCodeAt(0) - 65, base + code.charCodeAt(1) - 65);
}

function fmtDuration(s: number) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30d");
  const [clock, setClock] = useState(new Date());
  const lastFetch = useRef(0);

  const fetchData = useCallback(() => {
    const now = Date.now();
    if (now - lastFetch.current < 2000) return;
    lastFetch.current = now;

    fetch(`/api/admin/stats?range=${range}`)
      .then((r) => r.json())
      .then((raw) => {
        setData({
          overview: {
            uniqueSessions: raw.overview.uniqueSessions,
            pvInRange: raw.overview.pvInRange,
            bounceRate: raw.overview.bounceRate,
            pagesPerSession: raw.overview.pagesPerSession,
            avgSessionDuration: raw.overview.avgSessionDuration,
            activeNow: raw.overview.activeNow,
          },
          pvOverTime: raw.pvOverTime,
          trafficSources: raw.trafficSources,
          devices: raw.devices,
          browsers: raw.browsers,
          topPages: raw.topPages,
          durationHistogram: raw.durationHistogram,
          heatmap: raw.heatmap,
          funnel: raw.funnel,
          countries: raw.countries ?? [],
          botsFiltered: raw.botsFiltered ?? 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [range]);

  useEffect(() => {
    setLoading(true);
    lastFetch.current = 0;
    fetchData();
    const poll = setInterval(fetchData, 15_000);
    return () => clearInterval(poll);
  }, [fetchData]);

  useEffect(() => {
    const tick = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useMultiTableRealtime(["page_views", "events"], fetchData);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 w-72 rounded-xl bg-white/[0.03]" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-[100px] rounded-2xl bg-white/[0.03]" />)}
        </div>
        <div className="h-[300px] rounded-2xl bg-white/[0.03]" />
      </div>
    );
  }

  if (!data) return <p className="py-20 text-center text-zinc-500">Erro ao carregar.</p>;

  const o = data.overview;
  const rangeLabel = RANGES.find((r) => r.value === range)?.label ?? range;
  const totalTraffic = data.trafficSources.reduce((s, t) => s + t.count, 0);

  const metricCards = [
    {
      icon: <Globe className="h-4 w-4" />,
      label: "Sessões",
      value: o.uniqueSessions.toLocaleString("pt-BR"),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      label: "Page views",
      value: o.pvInRange.toLocaleString("pt-BR"),
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: <TrendingDown className="h-4 w-4" />,
      label: "Bounce rate",
      value: `${o.bounceRate}%`,
      color: o.bounceRate > 70 ? "text-red-400" : o.bounceRate > 50 ? "text-amber-400" : "text-emerald-400",
      bg: o.bounceRate > 70 ? "bg-red-500/10" : o.bounceRate > 50 ? "bg-amber-500/10" : "bg-emerald-500/10",
    },
    {
      icon: <Timer className="h-4 w-4" />,
      label: "Pg/sessão",
      value: String(o.pagesPerSession),
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
      {/* ---- HEADER ---- */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">Analytics</h1>
          <div className="mt-1 flex items-center gap-3 text-[12px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
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
            {data.botsFiltered > 0 && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="inline-flex items-center gap-1 text-zinc-600" title="Page views de bots filtrados neste período">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  {data.botsFiltered} bots filtrados
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.05] bg-[#0f0f12] p-1">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
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

      {/* ---- METRIC CARDS ---- */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metricCards.map((m) => (
          <motion.div key={m.label} variants={fadeUp}>
            <Card glass className="group transition-all hover:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${m.bg} ${m.color}`}>
                  {m.icon}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{m.label}</p>
                  <p className="text-lg font-extrabold tabular-nums text-white">{m.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ---- TRAFFIC OVER TIME ---- */}
      <AnimatedCard glass>
        <SectionTitle>Tráfego · {rangeLabel}</SectionTitle>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.pvOverTime} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} tick={{ fill: "#3f3f46", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3f3f46", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} width={32} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={2} fill="url(#analyticsGrad)" name="Page views" animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </AnimatedCard>

      {/* ---- TRAFFIC SOURCES + BROWSERS ---- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatedCard glass>
          <SectionTitle icon={<Globe className="h-3.5 w-3.5 text-cyan-400" />}>
            Fontes de tráfego
          </SectionTitle>
          <div className="flex items-center gap-6">
            <div className="h-[200px] w-[200px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.trafficSources}
                    dataKey="count"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={85}
                    paddingAngle={4}
                    cornerRadius={6}
                    animationDuration={1000}
                  >
                    {data.trafficSources.map((s, i) => (
                      <Cell key={i} fill={SOURCE_COLORS[s.source] || "#52525b"} stroke="transparent" />
                    ))}
                  </Pie>
                  <text x="50%" y="44%" textAnchor="middle" fill="#fafafa" fontSize={22} fontWeight={800}>
                    {totalTraffic.toLocaleString("pt-BR")}
                  </text>
                  <text x="50%" y="57%" textAnchor="middle" fill="#52525b" fontSize={10}>
                    visitas
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex-1">
              {data.trafficSources.map((s) => {
                const pct = totalTraffic ? Math.round((s.count / totalTraffic) * 100) : 0;
                return (
                  <div key={s.source}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-2 text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded" style={{ backgroundColor: SOURCE_COLORS[s.source] || "#52525b" }} />
                        {SOURCE_LABELS[s.source] || s.source}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums text-zinc-500">{s.count}</span>
                        <span className="font-bold tabular-nums text-white">{pct}%</span>
                      </div>
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
        </AnimatedCard>

        <AnimatedCard glass>
          <SectionTitle>Navegadores</SectionTitle>
          {data.browsers.length > 0 ? (
            <div className="flex items-center gap-5">
              <div className="h-[200px] w-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.browsers.slice(0, 6)}
                      dataKey="count"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={72}
                      paddingAngle={3}
                      cornerRadius={5}
                      animationDuration={800}
                    >
                      {data.browsers.slice(0, 6).map((_, i) => (
                        <Cell key={i} fill={BROWSER_COLORS[i]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1">
                {data.browsers.slice(0, 6).map((b, i) => {
                  const total = data.browsers.reduce((s, x) => s + x.count, 0);
                  const pct = total ? Math.round((b.count / total) * 100) : 0;
                  return (
                    <div key={b.browser} className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-2 text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded" style={{ backgroundColor: BROWSER_COLORS[i] }} />
                        {b.browser}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums text-zinc-500">{b.count}</span>
                        <span className="font-bold tabular-nums text-white">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="py-10 text-center text-xs text-zinc-600">Sem dados</p>
          )}
        </AnimatedCard>
      </div>

      {/* ---- COUNTRIES ---- */}
      {data.countries.length > 0 && (
        <AnimatedCard glass>
          <SectionTitle icon={<MapPin className="h-3.5 w-3.5 text-rose-400" />}>
            Tráfego por país
          </SectionTitle>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.countries.slice(0, 12).map((c, i) => {
              const total = data.countries.reduce((s, x) => s + x.count, 0);
              const pct = total ? Math.round((c.count / total) * 100) : 0;
              return (
                <div key={c.country}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="text-sm">{countryFlag(c.country)}</span>
                      {COUNTRY_NAMES[c.country] || c.country}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums text-zinc-500">{c.count.toLocaleString("pt-BR")}</span>
                      <span className="font-bold tabular-nums text-zinc-200">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, 1)}%` }}
                      transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>
      )}

      {/* ---- DEVICES + DURATION HISTOGRAM ---- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatedCard glass>
          <SectionTitle>Dispositivos</SectionTitle>
          <div className="space-y-5">
            {data.devices.map((d) => {
              const total = data.devices.reduce((s, x) => s + x.count, 0);
              const pct = total ? Math.round((d.count / total) * 100) : 0;
              const DeviceIcon = DEVICE_ICONS[d.device] || Monitor;
              const gradients: Record<string, string> = {
                mobile: "from-blue-500 to-cyan-400",
                desktop: "from-violet-500 to-purple-400",
                tablet: "from-amber-500 to-orange-400",
              };
              return (
                <div key={d.device}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                        <DeviceIcon className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold capitalize text-zinc-200">{d.device}</p>
                        <p className="text-[10px] tabular-nums text-zinc-500">{d.count.toLocaleString("pt-BR")} sessões</p>
                      </div>
                    </div>
                    <p className="text-lg font-extrabold tabular-nums text-white">{pct}%</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${gradients[d.device] || "from-zinc-500 to-zinc-400"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        <AnimatedCard glass>
          <SectionTitle icon={<Timer className="h-3.5 w-3.5 text-amber-400" />}>
            Duração das sessões
          </SectionTitle>
          <div className="mb-3 flex items-center gap-4 text-[11px]">
            <span className="text-zinc-500">
              Média: <span className="font-bold text-white">{fmtDuration(o.avgSessionDuration)}</span>
            </span>
            <span className="text-zinc-500">
              Bounce: <span className={`font-bold ${o.bounceRate > 70 ? "text-red-400" : o.bounceRate > 50 ? "text-amber-400" : "text-emerald-400"}`}>{o.bounceRate}%</span>
            </span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.durationHistogram} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="label" tick={{ fill: "#52525b", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525b", fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Sessões" radius={[6, 6, 0, 0]} animationDuration={800}>
                  {data.durationHistogram.map((_, i) => (
                    <Cell key={i} fill={`hsl(${200 + i * 20}, 75%, ${50 - i * 2}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* ---- HEATMAP ---- */}
      <AnimatedCard glass>
        <SectionTitle>Mapa de calor · tráfego por hora e dia</SectionTitle>
        <AnalyticsHeatmap data={data.heatmap} />
      </AnimatedCard>

      {/* ---- TOP PAGES + FUNNEL ---- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatedCard glass>
          <SectionTitle>Páginas mais visitadas</SectionTitle>
          <div className="space-y-3">
            {data.topPages.map((p, i) => {
              const maxViews = data.topPages[0]?.views || 1;
              const pct = Math.round((p.views / maxViews) * 100);
              return (
                <div key={p.page}>
                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] text-[9px] font-bold tabular-nums text-zinc-500">
                        {i + 1}
                      </span>
                      <span className="max-w-[180px] truncate font-medium">{p.page}</span>
                    </span>
                    <span className="font-bold tabular-nums text-white">{p.views.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
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

        <AnimatedCard glass>
          <SectionTitle icon={<MousePointerClick className="h-3.5 w-3.5 text-indigo-400" />}>
            Funil de engajamento
          </SectionTitle>
          <div className="space-y-3">
            {data.funnel.map((stage, i) => {
              const maxCount = data.funnel[0]?.count || 1;
              const pct = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
              const colors = ["#818cf8", "#3b82f6", "#0ea5e9", "#10b981", "#22c55e"];
              return (
                <div key={stage.stage}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{stage.stage}</span>
                    <span className="font-bold tabular-nums text-white">{stage.count.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: colors[i] || "#52525b" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, 1)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics Heatmap                                                  */
/* ------------------------------------------------------------------ */

function AnalyticsHeatmap({ data }: { data: { day: number; hour: number; count: number }[] }) {
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
    return { backgroundColor: `hsl(${185 + ratio * 35}, ${60 + ratio * 25}%, ${12 + ratio * 45}%)` };
  }

  return (
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
                  className="h-5 flex-1 rounded-[4px] transition-all duration-200 hover:ring-1 hover:ring-white/20"
                  style={cellStyle(count)}
                  title={`${DAY_LABELS[day]} ${String(hour).padStart(2, "0")}h · ${count} visitas`}
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
                backgroundColor: r === 0
                  ? "rgba(255,255,255,0.015)"
                  : `hsl(${185 + r * 35}, ${60 + r * 25}%, ${12 + r * 45}%)`,
              }}
            />
          ))}
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
