import { useState } from "react";
import { motion } from "framer-motion";
import { BUY_URL, PLANS, type TabId } from "../data";
import { Card, Reveal, SectionHeader } from "./Shared";
import { ActivityIcon, CheckIcon, CpuIcon, InfoIcon, ListIcon, PremiumIcon, ShieldIcon, SparklesIcon, ZapIcon } from "./Icons";

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "Undetected",
    text: "Fully undetected by games and the platform itself, giving you a safe experience. Our dedicated developers constantly monitor for detections and work proactively to maintain security.",
  },
  {
    icon: ActivityIcon,
    title: "Stable",
    text: "A stable experience with minimal crashes or issues. Our responsive support team actively receives reports of any problems and immediately notifies developers, ensuring quick resolutions.",
  },
  {
    icon: ZapIcon,
    title: "Performant",
    text: "Lightning-fast execution with exceptional performance optimization. Engineered for speed and efficiency, delivering rapid results while maintaining minimal resource usage on your device.",
  },
  {
    icon: CpuIcon,
    title: "Script Support",
    text: "Amazing script support allowing you to run nearly every script available. Any reports of scripts not working are addressed actively by our development team for maximum compatibility.",
  },
];

export default function PremiumTab({ onTab }: { onTab: (t: TabId) => void }) {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:pt-36">
      <SectionHeader icon={<SparklesIcon />} title="Premium Features" subtitle="Unlock the full potential with our premium subscription" />

      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <Card className="h-full">
              <div className="icon-box mb-4">
                <Icon width={26} height={26} strokeWidth={1.8} />
              </div>
              <h3 className="font-orbitron mb-2 text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{text}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Pricing */}
      <div className="mt-20">
        <SectionHeader icon={<ListIcon />} title="Choose Your Plan" subtitle="Tap a card to flip it and see the deal" />
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div
                className={`flip-card ${flipped === i ? "flipped" : ""} ${p.popular ? "md:-translate-y-3" : ""}`}
                onClick={() => setFlipped(flipped === i ? null : i)}
              >
                <div className="flip-inner">
                  {/* Front */}
                  <div
                    className="flip-face"
                    style={p.popular ? { borderColor: "rgba(var(--primary-rgb),0.5)", boxShadow: "0 0 40px rgba(var(--primary-rgb),0.18)" } : {}}
                  >
                    {p.popular && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: "var(--accent-gradient)", color: "#0a0a0a", boxShadow: "0 6px 18px rgba(var(--primary-rgb),0.4)" }}
                      >
                        Most Popular
                      </span>
                    )}
                    <div className="mb-4 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
                      <div>
                        <p className="font-orbitron text-sm font-semibold tracking-widest text-secondary">{p.title}</p>
                        <p className="font-orbitron mt-1 text-4xl font-black text-primary glow-text">{p.price}</p>
                      </div>
                      <div className="icon-box !h-12 !w-12">
                        <PremiumIcon width={22} height={22} />
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: "rgba(var(--primary-rgb),0.18)", color: "var(--primary-color)" }}>
                            <CheckIcon width={12} height={12} strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-4 text-center text-[11px] uppercase tracking-widest text-secondary">Tap to flip</p>
                  </div>
                  {/* Back */}
                  <div className="flip-face flip-back">
                    <p className="font-orbitron text-sm font-semibold tracking-widest text-secondary">{p.title}</p>
                    <p className="font-orbitron my-3 text-5xl font-black text-primary glow-text">{p.price}</p>
                    <p className="mb-6 text-sm text-secondary">{p.tagline}</p>
                    <a href={BUY_URL} target="_blank" rel="noreferrer" className="btn btn-primary w-full" onClick={(e) => e.stopPropagation()}>
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <a href={BUY_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
          <PremiumIcon width={20} height={20} /> Get Premium
        </a>
        <button onClick={() => onTab("faq")} className="btn btn-secondary">
          <InfoIcon width={20} height={20} /> Learn More
        </button>
      </motion.div>
    </div>
  );
}
