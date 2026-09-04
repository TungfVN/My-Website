import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS, type TabId } from "../data";

interface Props {
  tab: TabId;
  onTab: (t: TabId) => void;
}

export default function MobileDock({ tab, onTab }: Props) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [ripple, setRipple] = useState<{ id: number; tab: TabId } | null>(null);

  // hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 120);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handle = (t: TabId) => {
    if (navigator.vibrate) navigator.vibrate(8);
    setRipple({ id: Date.now(), tab: t });
    onTab(t);
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: hidden ? 130 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 bottom-0 z-[900] flex justify-center px-4 md:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)" }}
    >
      <nav
        className="dock-glass relative flex w-full max-w-[420px] items-center justify-between rounded-[26px] p-1.5"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <motion.button
              key={id}
              onClick={() => handle(id)}
              whileTap={{ scale: 0.88 }}
              className="relative flex flex-1 items-center justify-center py-1"
              aria-current={active ? "page" : undefined}
              aria-label={label}
            >
              {/* sliding liquid pill */}
              {active && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-[20px]"
                  style={{
                    background: "linear-gradient(160deg, rgba(var(--primary-rgb),0.28), rgba(var(--primary-rgb),0.1))",
                    border: "1px solid rgba(var(--primary-rgb),0.45)",
                    boxShadow: "0 8px 24px rgba(var(--primary-rgb),0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.8 }}
                />
              )}

              {/* ripple burst */}
              <AnimatePresence>
                {ripple && ripple.tab === id && (
                  <motion.span
                    key={ripple.id}
                    initial={{ scale: 0.3, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    onAnimationComplete={() => setRipple(null)}
                    className="pointer-events-none absolute inset-0 rounded-[20px]"
                    style={{ background: "radial-gradient(circle, rgba(var(--primary-rgb),0.45), transparent 70%)" }}
                  />
                )}
              </AnimatePresence>

              <motion.span
                layout
                className="relative z-10 flex items-center gap-1.5 px-2 py-2"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                <motion.span
                  animate={
                    active
                      ? { y: [0, -6, 0], scale: [1, 1.25, 1], rotate: [0, -8, 0] }
                      : { y: 0, scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  className="grid place-items-center"
                  style={{
                    color: active ? "var(--primary-light)" : "var(--text-secondary)",
                    filter: active ? "drop-shadow(0 0 8px rgba(var(--primary-rgb),0.9))" : "none",
                    transition: "color .3s, filter .3s",
                  }}
                >
                  <Icon width={22} height={22} strokeWidth={active ? 2.3 : 2} />
                </motion.span>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0, x: -6 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -6 }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="overflow-hidden whitespace-nowrap text-[13px] font-semibold"
                      style={{ color: "var(--primary-light)" }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>

              {/* inactive dot indicator */}
              {!active && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 transition-opacity"
                  style={{ background: "var(--text-secondary)" }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Glowing bottom accent following active */}
        <motion.span
          className="pointer-events-none absolute -bottom-6 h-10 w-24 rounded-full blur-2xl"
          style={{ background: "var(--primary-color)", opacity: 0.35 }}
          animate={{ left: `calc(${NAV_ITEMS.findIndex((n) => n.id === tab)} * 25% + 12.5% - 3rem)` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
    </motion.div>
  );
}
