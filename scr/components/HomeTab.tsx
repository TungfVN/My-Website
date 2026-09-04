import { useState } from "react";
import { motion } from "framer-motion";
import { CREDITS, HERO_CARD_IMG, type TabId } from "../data";
import { Card, Reveal, SectionHeader } from "./Shared";
import {
  CrownIcon,
  DiscordIcon,
  ExternalIcon,
  HeartIcon,
  LoginIcon,
  RocketIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  WavesIcon,
  ZapIcon,
} from "./Icons";

const ABOUT = [
  {
    icon: UsersIcon,
    title: "Our Community",
    text: "With over 500,000 active users and growing every day, Hacker Hub has built one of the most vibrant and engaged communities in the scripting world. Our Discord server hosts thousands of members who share scripts, report issues, suggest features, and help each other troubleshoot problems. Whether you are a beginner looking for guidance or an experienced developer wanting to contribute, our community welcomes everyone with open arms.",
  },
  {
    icon: ShieldIcon,
    title: "Security First",
    text: "Security is at the core of everything we do. Our team of dedicated developers works around the clock to ensure that every script remains fully undetected by both game anti-cheat systems and the platform itself. We employ advanced obfuscation techniques, regular detection monitoring, and proactive updates to stay ahead of any potential threats. We never compromise on security, ever.",
  },
  {
    icon: ZapIcon,
    title: "Cutting-Edge Technology",
    text: "Our universal script executor is built on the latest Lua execution technology, delivering lightning-fast performance with minimal resource consumption. We support a wide range of scripts across multiple games, with continuous updates to ensure compatibility with the latest game versions and platform changes.",
  },
  {
    icon: RocketIcon,
    title: "Our Mission",
    text: "Our mission is simple yet ambitious: to provide the most reliable, accessible, and user-friendly scripting platform for everyone. We believe that powerful tools should be available to all. That is why our core script will always be free. Our roadmap includes expanded game support, a custom script marketplace, and enhanced developer tools.",
  },
];

export default function HomeTab({ onTab }: { onTab: (t: TabId) => void }) {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative mx-auto flex min-h-[calc(100svh-80px)] max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-16 text-center md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium md:text-sm"
          style={{ borderColor: "var(--border-color)", background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)" }}
        >
          <span className="dot-pulse h-2 w-2 rounded-full" style={{ background: "var(--primary-color)" }} />
          Trusted by 500,000+ users worldwide
        </motion.div>

        <motion.h1
          data-text="HACKER HUB"
          className="hero-title"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          HACKER HUB
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="my-5 flex items-center gap-3"
        >
          <span className="h-px w-16 md:w-28" style={{ background: "linear-gradient(90deg,transparent,var(--primary-color))" }} />
          <CrownIcon className="anim-float text-primary" width={22} height={22} />
          <span className="h-px w-16 md:w-28" style={{ background: "linear-gradient(90deg,var(--primary-color),transparent)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-orbitron text-lg font-medium tracking-[0.3em] text-primary md:text-xl"
        >
          UNIVERSAL SCRIPT
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-secondary md:text-lg"
        >
          The ultimate solution for undetected, stable, and performant automation. Execute powerful scripts across your
          favorite games with unmatched speed and reliability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <button onClick={() => onTab("premium")} className="btn btn-primary">
            <LoginIcon width={20} height={20} /> Get Started
          </button>
          <a href="#" className="btn btn-secondary">
            <DiscordIcon width={20} height={20} /> Join Discord
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1 } } }}
          className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-3"
        >
          {[
            ["500K+", "Active Users"],
            ["99.9%", "Uptime"],
            ["24/7", "Support"],
          ].map(([v, l]) => (
            <motion.div
              key={l}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="glass rounded-2xl px-2 py-4 md:py-5"
            >
              <div className="font-orbitron text-xl font-bold text-primary glow-text md:text-3xl">{v}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-secondary md:text-xs">{l}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 w-full max-w-md"
          style={{ perspective: 1000 }}
        >
          <div
            className="group relative overflow-hidden rounded-3xl border p-1"
            style={{
              borderColor: "rgba(var(--primary-rgb),0.35)",
              background: "linear-gradient(160deg, rgba(var(--primary-rgb),0.2), rgba(0,0,0,0.5))",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(var(--primary-rgb),0.18)",
            }}
          >
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src={HERO_CARD_IMG}
                alt="Hacker Hub"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <p className="font-orbitron text-lg font-bold tracking-widest text-white">HACKER HUB</p>
                <p className="text-xs text-secondary">Universal Script Platform</p>
              </div>
              <span
                className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: "var(--accent-gradient)", color: "#0a0a0a" }}
              >
                v2.0
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader
          icon={<WavesIcon />}
          title="About"
          subtitle="Discover what makes Hacker Hub the trusted choice for script enthusiasts worldwide"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {ABOUT.map(({ icon: Icon, title, text }, i) => (
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
      </section>

      {/* ---------- CREDITS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader
          icon={<HeartIcon />}
          iconClass="anim-pulse"
          title="Credits"
          subtitle="Thank you to everyone who has contributed to making Hacker Hub possible"
        />
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {CREDITS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <Card className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                    style={{ border: "2px solid rgba(var(--primary-rgb),0.5)", boxShadow: "0 0 20px rgba(var(--primary-rgb),0.3)" }}
                  />
                  <span
                    className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black"
                    style={{ background: "#22c55e" }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{c.name}</p>
                  <span
                    className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ background: "rgba(var(--primary-rgb),0.15)", color: "var(--primary-color)" }}
                  >
                    {c.role}
                  </span>
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit profile"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform hover:-translate-y-1 hover:rotate-6"
                  style={{ background: "var(--accent-gradient)", color: "#0a0a0a" }}
                >
                  <ExternalIcon width={18} height={18} strokeWidth={2.5} />
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- RATING ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader icon={<StarIcon />} title="Rate Our Service" subtitle="Help us improve by rating your experience with Hacker Hub" />
        <Reveal className="mx-auto max-w-md">
          <Card className="text-center">
            <div className="rating" role="radiogroup">
              {[5, 4, 3, 2, 1].map((n) => (
                <span key={n} className="contents">
                  <input type="radio" id={`star${n}`} name="rate" value={n} checked={rating === n} onChange={() => setRating(n)} />
                  <label htmlFor={`star${n}`} title={`${n} stars`}>
                    <StarIcon width={40} height={40} fill="currentColor" stroke="none" />
                  </label>
                </span>
              ))}
            </div>
            <motion.p key={rating} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-secondary">
              {rating === 0 ? "Tap a star to rate" : rating >= 4 ? "Thank you! We're glad you love it ❤️" : "Thanks! We'll keep improving."}
            </motion.p>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
