"use client";

import { useEffect, useState } from "react";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";

const LIGHT_VARS: Record<string, string> = {
  "--background": "#f0f4ff",
  "--foreground": "#1e293b",
  "--surface": "#ffffff",
  "--surface-muted": "#f1f5f9",
  "--text-primary": "#0f172a",
  "--text-secondary": "#334155",
  "--text-muted": "#64748b",
  "--text-body": "#334155",
  "--border-card-light": "rgba(148, 163, 184, 0.3)",
  "--border-card-default": "rgba(148, 163, 184, 0.5)",
  "--border-card-strong": "rgba(100, 116, 139, 0.7)",
  "--button-secondary-bg": "#e2e8f0",
  "--button-secondary-text": "#334155",
  "--button-secondary-border": "rgba(148, 163, 184, 0.6)",
  "--button-ghost-text": "#334155",
  "--button-ghost-border": "rgba(148, 163, 184, 0.6)",
  "--button-disabled-bg": "rgba(148, 163, 184, 0.2)",
  "--button-disabled-text": "rgba(51, 65, 85, 0.45)",
};

function applyTheme(dark: boolean) {
  const html = document.documentElement;
  if (!dark) {
    for (const [key, value] of Object.entries(LIGHT_VARS)) {
      html.style.setProperty(key, value);
    }
  } else {
    for (const key of Object.keys(LIGHT_VARS)) {
      html.style.removeProperty(key);
    }
  }
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agora-theme");
    const dark = stored !== "light";
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem("agora-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="cursor-pointer p-2 rounded-lg transition-all duration-150 text-[var(--text-secondary)] hover:text-teal-400 hover:scale-105 active:scale-95">
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
