import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TabId, ThemeId } from "./data";
import Navbar from "./components/Navbar";
import MobileDock from "./components/MobileDock";
import Footer from "./components/Footer";
import HomeTab from "./components/HomeTab";
import PremiumTab from "./components/PremiumTab";
import ScriptTab from "./components/ScriptTab";
import FaqTab from "./components/FaqTab";
import { Stars } from "./components/Shared";

const THEME_KEY = "hh-theme";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [theme, setTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeId | null;
    return saved ?? "default";
  });

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const changeTab = useCallback((t: TabId) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Stars />
      <Navbar tab={tab} onTab={changeTab} theme={theme} onTheme={setTheme} />

      <main className="pb-dock">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "home" && <HomeTab onTab={changeTab} />}
            {tab === "premium" && <PremiumTab onTab={changeTab} />}
            {tab === "script" && <ScriptTab />}
            {tab === "faq" && <FaqTab />}
            <Footer onTab={changeTab} />
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileDock tab={tab} onTab={changeTab} />
    </div>
  );
}
