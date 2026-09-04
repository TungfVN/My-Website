import { LOGO_URL, type TabId } from "../data";
import { DiscordIcon } from "./Icons";

export default function Footer({ onTab }: { onTab: (t: TabId) => void }) {
  return (
    <footer className="mt-10 border-t" style={{ borderColor: "var(--border-color)", background: "rgba(0,0,0,0.35)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Hacker Hub" className="h-12 w-12 rounded-xl object-cover" style={{ border: "2px solid var(--border-color)" }} />
            <div>
              <h3 className="font-orbitron text-base font-bold tracking-widest">HACKER HUB</h3>
              <p className="text-xs text-secondary">Universal Script</p>
            </div>
          </div>
          <a href="#" className="btn btn-secondary mt-5 !px-4 !py-2.5 text-sm">
            <DiscordIcon width={16} height={16} /> Join Discord Now!
          </a>
        </div>

        <FooterCol title="Quick Links">
          <li><button onClick={() => onTab("premium")}>Premium</button></li>
          <li><button onClick={() => onTab("script")}>Script</button></li>
          <li><button onClick={() => onTab("faq")}>FAQ</button></li>
        </FooterCol>
        <FooterCol title="Support">
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Terms of Service</a></li>
        </FooterCol>
        <FooterCol title="Partner">
          <li><a href="https://www.youtube.com/@TungfVN" target="_blank" rel="noreferrer">TungfVN</a></li>
          <li><a href="mailto:tungytno1@gmail.com">tungytno1@gmail.com</a></li>
        </FooterCol>
      </div>
      <div className="border-t px-5 py-5 text-center text-xs text-secondary" style={{ borderColor: "var(--border-color)" }}>
        © 2025 Hacker Hub. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-orbitron mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">{title}</h3>
      <ul className="space-y-2.5 text-sm text-secondary [&_a]:transition-colors [&_a:hover]:text-[var(--text-color)] [&_button]:transition-colors [&_button:hover]:text-[var(--text-color)]">
        {children}
      </ul>
    </div>
  );
}
