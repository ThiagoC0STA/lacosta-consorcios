"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowser } from "../lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Zap,
} from "lucide-react";
import NewLeadToast from "./components/NewLeadToast";

const NAV_MAIN = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex h-screen overflow-hidden bg-[#08080a]">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-white/[0.04] bg-[#0a0a0c] transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-black text-white shadow-lg shadow-blue-500/20">
              LC
              <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0c] bg-emerald-400" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white tracking-tight">
                Lacosta
              </p>
              <p className="text-[10px] font-medium text-zinc-600">
                Painel de controle
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-500 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <nav className="flex-1 space-y-1 px-3 pt-2">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            Principal
          </p>
          {NAV_MAIN.map((nav) => {
            const active = isActive(nav.href);
            const Icon = nav.icon;
            return (
              <Link
                key={nav.href}
                href={nav.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-500/[0.12] to-blue-500/[0.04] text-blue-400 shadow-sm shadow-blue-500/5"
                    : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                    active
                      ? "bg-blue-500/15 text-blue-400"
                      : "bg-white/[0.03] text-zinc-600 group-hover:bg-white/[0.06] group-hover:text-zinc-400"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                {nav.label}
                {active && (
                  <Zap className="ml-auto h-3 w-3 fill-blue-400 text-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="p-3 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-600 transition-all hover:bg-white/[0.03] hover:text-zinc-400"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.03]">
              <ArrowLeft className="h-3.5 w-3.5" />
            </div>
            Voltar ao site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-600 transition-all hover:bg-red-500/[0.08] hover:text-red-400"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.03]">
              <LogOut className="h-3.5 w-3.5" />
            </div>
            Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.04] bg-[#08080a]/90 px-4 backdrop-blur-2xl md:px-6">
          <button
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-semibold text-zinc-300">
            {NAV_MAIN.find((n) => isActive(n.href))?.label ?? "Admin"}
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#08080a] p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <NewLeadToast />
      </div>
    </div>
  );
}
