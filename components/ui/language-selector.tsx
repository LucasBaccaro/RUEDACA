"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-2 bg-[hsl(var(--soft-bg))] rounded-full p-1 border border-[hsl(var(--border))]">
      <button
        onClick={() => setLanguage("es")}
        className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        aria-label="Cambiar a español"
      >
        {language === "es" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-[hsl(var(--primary))] rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span
          className={`relative z-10 ${
            language === "es"
              ? "text-white"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          ES
        </span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        aria-label="Switch to English"
      >
        {language === "en" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-[hsl(var(--primary))] rounded-full"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span
          className={`relative z-10 ${
            language === "en"
              ? "text-white"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          EN
        </span>
      </button>
    </div>
  );
}
