import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GAMES, KEY_URL, SCRIPT_TEXT } from "../data";
import { Card, Reveal, SectionHeader } from "./Shared";
import { CheckIcon, CopyIcon, GamepadIcon, KeyIcon, ScriptIcon } from "./Icons";

export default function ScriptTab() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SCRIPT_TEXT);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SCRIPT_TEXT;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:pt-36">
      <SectionHeader icon={<ScriptIcon />} title="Copy Script" subtitle="Paste this into your executor and you're ready to go" />

      <Reveal className="mx-auto max-w-3xl">
        <div
          className="overflow-hidden rounded-3xl border"
          style={{ borderColor: "var(--border-color)", background: "var(--card-bg)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
        >
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-color)", background: "rgba(0,0,0,0.3)" }}>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-secondary">universal.lua</span>
            </div>
            <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ background: "rgba(var(--primary-rgb),0.15)", color: "var(--primary-color)" }}>
              Lua
            </span>
          </div>
          <div className="p-5">
            <pre className="code-block whitespace-pre-wrap">
              <span className="text-secondary">{"-- Hacker Hub | Universal Script\n"}</span>
              {SCRIPT_TEXT}
            </pre>
          </div>
          <div className="p-4 pt-0">
            <motion.button
              onClick={copy}
              whileTap={{ scale: 0.97 }}
              className="btn w-full"
              style={{
                background: copied ? "linear-gradient(135deg,#22c55e,#4ade80)" : "var(--accent-gradient)",
                color: "#0a0a0a",
                boxShadow: "0 8px 25px rgba(var(--primary-rgb),0.3)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
                    <CheckIcon width={20} height={20} strokeWidth={3} /> Copied!
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
                    <CopyIcon width={20} height={20} /> Copy Script
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 text-center">
        <a href={KEY_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
          <KeyIcon width={20} height={20} /> Get Key
        </a>
      </Reveal>

      <div className="mt-20">
        <SectionHeader icon={<GamepadIcon />} title="Supported Games" subtitle="Every game below is fully supported and actively updated" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08}>
              <Card className="!p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={g.img} alt={g.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-semibold">{g.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-secondary">
                    <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-green-400" /> Fully Supported
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
