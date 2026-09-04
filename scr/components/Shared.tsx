import { useMemo, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  icon,
  title,
  subtitle,
  iconClass = "anim-float",
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  iconClass?: string;
}) {
  return (
    <Reveal className="mb-10 text-center">
      <h2 className="section-title">
        <span className={iconClass}>{icon}</span>
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm text-secondary md:text-base">{subtitle}</p>}
      <span
        className="mx-auto mt-4 block h-[3px] w-20 rounded-full"
        style={{ background: "var(--accent-gradient)", boxShadow: "0 0 14px var(--shadow-color)" }}
      />
    </Reveal>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`card ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}

export function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() > 0.8 ? 3 : 2,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, width: s.size, height: s.size }}
        />
      ))}
    </div>
  );
}
