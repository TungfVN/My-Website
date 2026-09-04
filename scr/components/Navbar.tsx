import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_URL, NAV_ITEMS, type TabId, type ThemeId } from "../data";
import ThemeSwitcher from "./ThemeSwitcher";
import { DiscordIcon, PremiumIcon } from "./Icons";

interface Props {
  tab: TabId;
  onTab: (t: TabId) => void;
  theme: ThemeId;
  onTheme: (t: ThemeId) => void;
}

export default function Navbar({ tab, onTab, theme, onTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const select = (t: TabId) => {
    onTab(t);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
        className="fixed left-1/2 z-[1000] flex w-[calc(100%-24px)] max-w-[1320px] -translate-x-1/2 items-center justify-between rounded-2xl px-3 py-2 md:w-[calc(100%-40px)] md:px-4 md:py-2.5"
        style={{
          top: scrolled ? 8 : 14,
          background: scrolled ? "rgba(8,8,10,0.78)" : "rgba(12,12,14,0.5)",
          border: `1px solid ${scrolled ? "var(--border-color)" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: `blur(${scrolled ? 28 : 16}px) saturate(160%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 28 : 16}px) saturate(160%)`,
          boxShadow: scrolled
            ? "0 8px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px var(--glow-1)"
            : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "top .5s cubic-bezier(.16,1,.3,1), background .5s, box-shadow .5s, border-color .5s",
        }}
      >
        {/* top highlight line */}
        <AnimatePresence>
          {scrolled && (
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.7, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              className="pointer-events-none absolute left-[20%] right-[20%] top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,var(--primary-color),transparent)" }}
            />
          )}
        </AnimatePresence>

        {/* Logo */}
        <button
          onClick={() => select("home")}
          className="group flex items-center gap-2.5"
          aria-label="Hacker Hub Home"
        >
          <motion.img
            src={LOGO_URL}
            alt="Hacker Hub"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-xl object-cover md:h-11 md:w-11"
            style={{
              border: `2px solid ${scrolled ? "var(--border-color)" : "transparent"}`,
              filter: scrolled ? "brightness(1.1) drop-shadow(0 0 12px var(--shadow-color))" : "brightness(0.9)",
              transition: "filter .4s, border-color .4s",
            }}
          />
          <span className="font-orbitron hidden text-sm font-bold tracking-widest sm:block md:hidden lg:block">
            HACKER<span className="text-primary">HUB</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="relative flex items-center gap-1 rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.03)" }}>
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => select(id)}
                  className="relative flex min-w-[92px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300"
                  style={{ color: active ? "var(--primary-color)" : "var(--text-secondary)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(var(--primary-rgb),0.12)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(var(--primary-rgb),0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="desktop-underline"
                      className="absolute -bottom-[3px] left-1/2 h-[3px] w-[55%] -translate-x-1/2 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,transparent,var(--primary-color),transparent)",
                        boxShadow: "0 0 12px var(--primary-color)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <motion.span
                    animate={active ? { scale: [0.8, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                  >
                    <Icon width={18} height={18} />
                  </motion.span>
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher theme={theme} onChange={onTheme} />

          {/* Mobile hamburger (morphing) */}
          <motion.button
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            className="relative grid h-10 w-10 place-items-center rounded-xl border md:hidden"
            style={{
              borderColor: menuOpen ? "rgba(var(--primary-rgb),0.5)" : "var(--border-color)",
              background: menuOpen ? "rgba(var(--primary-rgb),0.14)" : "rgba(255,255,255,0.06)",
              color: menuOpen ? "var(--primary-color)" : "var(--text-color)",
              boxShadow: menuOpen ? "0 0 22px rgba(var(--primary-rgb),0.35)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
              transition: "background .3s, border-color .3s, box-shadow .3s, color .3s",
            }}
          >
            <span className="flex w-5 flex-col items-end gap-[5px]">
              <motion.span
                className="hamburger-line"
                animate={menuOpen ? { rotate: 45, y: 7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.span
                className="hamburger-line"
                animate={menuOpen ? { opacity: 0, x: 10, width: 14 } : { opacity: 1, x: 0, width: 14 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="hamburger-line"
                animate={menuOpen ? { rotate: -45, y: -7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </span>
          </motion.button>
        </div>
      </motion.nav>

      {/* ---------- Mobile sheet menu ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[990] md:hidden"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            />
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.96, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed left-3 right-3 top-[76px] z-[995] origin-top overflow-hidden rounded-3xl p-3 md:hidden"
              style={{
                background: "linear-gradient(180deg, rgba(18,18,22,0.92), rgba(8,8,10,0.96))",
                border: "1px solid rgba(var(--primary-rgb),0.25)",
                backdropFilter: "blur(30px) saturate(180%)",
                WebkitBackdropFilter: "blur(30px) saturate(180%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(var(--primary-rgb),0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Decorative glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "var(--primary-color)" }}
              />

              <div className="mb-2 flex items-center justify-between px-2 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary">Navigation</p>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-secondary">
                  <span className="dot-pulse h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary-color)" }} />
                  Online
                </span>
              </div>

              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                }}
                className="grid grid-cols-2 gap-2"
              >
                {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                  const active = tab === id;
                  return (
                    <motion.li
                      key={id}
                      variants={{
                        hidden: { opacity: 0, y: 16, scale: 0.94 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 26 } },
                      }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => select(id)}
                        className="relative flex w-full flex-col items-start gap-3 overflow-hidden rounded-2xl p-4 text-left"
                        style={{
                          background: active ? "rgba(var(--primary-rgb),0.16)" : "rgba(255,255,255,0.045)",
                          border: `1px solid ${active ? "rgba(var(--primary-rgb),0.55)" : "rgba(255,255,255,0.07)"}`,
                          boxShadow: active ? "0 0 26px rgba(var(--primary-rgb),0.25), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                          transition: "background .3s, border-color .3s, box-shadow .3s",
                        }}
                      >
                        {active && (
                          <motion.span
                            layoutId="sheet-active"
                            className="absolute right-3 top-3 h-2 w-2 rounded-full"
                            style={{ background: "var(--primary-color)", boxShadow: "0 0 10px var(--primary-color)" }}
                          />
                        )}
                        <span
                          className="grid h-11 w-11 place-items-center rounded-xl"
                          style={{
                            background: active ? "var(--accent-gradient)" : "rgba(255,255,255,0.06)",
                            color: active ? "#0a0a0a" : "var(--text-color)",
                            boxShadow: active ? "0 8px 20px rgba(var(--primary-rgb),0.35)" : "none",
                          }}
                        >
                          <Icon width={22} height={22} />
                        </span>
                        <span>
                          <span
                            className="block text-[15px] font-semibold"
                            style={{ color: active ? "var(--primary-light)" : "var(--text-color)" }}
                          >
                            {label}
                          </span>
                          <span className="block text-[11px] text-secondary">
                            {id === "home" && "Overview & about"}
                            {id === "premium" && "Plans & features"}
                            {id === "script" && "Copy & get key"}
                            {id === "faq" && "Questions answered"}
                          </span>
                        </span>
                      </motion.button>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 flex gap-2"
              >
                <a href="#" className="btn btn-secondary flex-1 !py-3 text-sm">
                  <DiscordIcon width={18} height={18} /> Discord
                </a>
                <button onClick={() => select("premium")} className="btn btn-primary flex-1 !py-3 text-sm">
                  <PremiumIcon width={18} height={18} /> Get Premium
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
