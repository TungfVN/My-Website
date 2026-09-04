import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "../data";
import { Card, Reveal, SectionHeader } from "./Shared";
import { ChevronIcon, HelpIcon, InfoIcon, KeyIcon } from "./Icons";

const STEPS = [
  ["Choose Provider", "Select either Lootlabs or Linkvertise based on your preference."],
  ["Complete Tasks", "Follow the instructions on the key provider's website."],
  ["Use Your Key", "Copy the generated key and use it in Hacker Hub."],
];

export default function FaqTab() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 pb-16 md:pt-36">
      <SectionHeader
        icon={<HelpIcon />}
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers. Find everything you need to know about Hacker Hub."
      />

      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.06}>
              <div
                className="overflow-hidden rounded-2xl border transition-colors"
                style={{
                  borderColor: isOpen ? "rgba(var(--primary-rgb),0.5)" : "var(--border-color)",
                  background: "var(--card-bg)",
                  boxShadow: isOpen ? "0 0 30px rgba(var(--primary-rgb),0.12)" : "none",
                }}
              >
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold"
                    style={{ background: "rgba(var(--primary-rgb),0.15)", color: "var(--primary-color)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-semibold" style={{ color: isOpen ? "var(--primary-light)" : "var(--text-color)" }}>
                    {f.q}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="text-secondary">
                    <ChevronIcon width={20} height={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-5 pb-5 pl-[68px] text-sm leading-relaxed text-secondary">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-16">
        <Reveal>
          <Card>
            <h3 className="font-orbitron mb-6 flex items-center gap-2 text-lg font-bold">
              <KeyIcon className="text-primary" width={22} height={22} /> How to Get Your Key
            </h3>
            <div className="relative grid gap-4 md:grid-cols-3">
              {STEPS.map(([t, d], i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative rounded-2xl border p-4"
                  style={{ borderColor: "var(--border-color)", background: "rgba(255,255,255,0.03)" }}
                >
                  <span
                    className="font-orbitron mb-3 grid h-10 w-10 place-items-center rounded-xl text-lg font-black"
                    style={{ background: "var(--accent-gradient)", color: "#0a0a0a", boxShadow: "0 6px 18px rgba(var(--primary-rgb),0.35)" }}
                  >
                    {i + 1}
                  </span>
                  <h4 className="font-semibold">{t}</h4>
                  <p className="mt-1 text-sm text-secondary">{d}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(var(--primary-rgb),0.1)", color: "var(--text-secondary)" }}>
              <InfoIcon className="mt-0.5 shrink-0 text-primary" width={18} height={18} />
              <span>
                <strong className="text-primary">Note:</strong> Keys help maintain our services for free.
              </span>
            </div>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
