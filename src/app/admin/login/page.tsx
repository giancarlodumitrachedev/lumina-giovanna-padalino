"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/app/actions/admin-blog";
import { SmartLink } from "@/components/smart-link";
import { Lock, Mail, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen bg-[#F5EBE1] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Autumn Leaves */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-36 sm:w-48 h-44 sm:h-56 opacity-50 sm:opacity-60" flipped />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-6 translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-32 sm:w-40 h-40 sm:h-48 opacity-40 sm:opacity-50" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back link */}
        <div className="mb-6">
          <SmartLink
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D58] hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna al sito principale</span>
          </SmartLink>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-xs font-semibold mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Area Riservata Professionista</span>
          </div>
          <h1 className="font-heading italic font-bold text-3xl sm:text-4xl text-[#2C1E16] mb-2">
            Dott.ssa Giovanna Padalino
          </h1>
          <p className="text-sm text-[#735948]">
            Portale Medico & Gestione Spazio Accogliente (Blog)
          </p>
        </div>

        <div className="mt-8 bg-white/95 py-8 px-6 sm:px-10 rounded-2xl sm:rounded-3xl shadow-sm border border-[#DFCEBA]">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{state.error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                Email
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6D58]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="info@giovannapadalino.it"
                  defaultValue="info@giovannapadalino.it"
                  className="block w-full pl-10 pr-3.5 py-3 border border-[#DFCEBA] rounded-xl text-sm bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-[#2C1E16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                Password di Accesso
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6D58]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3.5 py-3 border border-[#DFCEBA] rounded-xl text-sm bg-[#FAF6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-[#2C1E16]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-[#C85A32] hover:bg-[#AF4621] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C85A32] transition-all disabled:opacity-50 terracotta-glow"
              >
                {isPending ? "Accesso in corso..." : "Accedi al Portale"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#DFCEBA] text-center text-xs text-[#8C6D58]">
            <p>Accesso riservato alla Dott.ssa Giovanna Padalino.</p>
            <p className="mt-1 text-[11px] text-[#A68875]">Connessione cifrata con Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}
