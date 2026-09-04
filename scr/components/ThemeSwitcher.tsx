import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { THEMES, type ThemeId } from "../data";
import { CheckIcon, ThemeIcon } from "./Icons";

interface Props {
  theme: ThemeId;
  onChange: (t: ThemeId) => void;
  align?: "right" | "center";
}

export default function ThemeSwitcher({ theme, onChange, align = "right" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <motion.button
        aria-label="Change theme"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        className="relative grid h-10 w-10 place-items-center rounded-xl border text-[var(--text-color)]"
        style={{
          borderColor: "var(--border-color)",
          background: "rgba(255,255,255,0.06)",
          boxShadow: open ? "0 0 22px rgba(var(--primary-rgb),0.35)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid place-items-center"
          style={{ color: open ? "var(--primary-color)" : undefined }}
        >
          <ThemeIcon width={20} height={20} />
        </motion.span>
        <span
          className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-black/60"
          style={{ background: THEMES.find((t) => t.id === theme)?.swatch }}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={`absolute top-[calc(100%+10px)] z-50 w-52 origin-top rounded-2xl p-2 ${
              align === "right" ? "right-0 origin-top-right" : "left-1/2 -translate-x-1/2"
            }`}
            style={{
              background: "rgba(10,10,12,0.9)",
              border: "1px solid var(--border-color)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.55), 0 0 30px rgba(var(--primary-rgb),0.12)",
            }}
          >
            <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
              Theme
            </p>
            {THEMES.map((t, i) => {
              const active = t.id === theme;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  onClick={() => {
                    onChange(t.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    background: active ? "rgba(var(--primary-rgb),0.14)" : "transparent",
                    color: active ? "var(--primary-color)" : "var(--text-color)",
                  }}
                >
                  <span
                    className="h-5 w-5 rounded-full ring-2 ring-white/10"
                    style={{ background: t.swatch, boxShadow: active ? "0 0 12px rgba(var(--primary-rgb),0.6)" : "none" }}
                  />
                  <span className="flex-1 text-left">{t.label}</span>
                  {active && <CheckIcon width={16} height={16} />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
