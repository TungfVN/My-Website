import type { ComponentType, SVGProps } from "react";
import { FaqIcon, HomeIcon, PremiumIcon, ScriptIcon } from "./components/Icons";

export type TabId = "home" | "premium" | "script" | "faq";
export type ThemeId = "default" | "yellow" | "blue" | "midnight" | "emerald" | "rose";

export const LOGO_URL =
  "https://sf-static.upanhlaylink.com/img/image_20251126f64f6628475a861f8270c06c196ebd0a.jpg";
export const HERO_CARD_IMG =
  "https://sf-static.upanhlaylink.com/img/image_202511262bf8b7d8b666ef8d8bcdb2446dad9828.jpg";
export const BUY_URL = "https://maihuytung.mysellauth.com/product/maihuytung";
export const KEY_URL = "https://junkie-development.de/overview/maihuytung";
export const SCRIPT_TEXT =
  'loadstring(game:HttpGet("https://raw.githubusercontent.com/HackerHub/Scripts/main/universal.lua"))()';

export const NAV_ITEMS: {
  id: TabId;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "premium", label: "Premium", icon: PremiumIcon },
  { id: "script", label: "Script", icon: ScriptIcon },
  { id: "faq", label: "FAQ", icon: FaqIcon },
];

export const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "default", label: "Default", swatch: "linear-gradient(135deg,#cccccc,#888888)" },
  { id: "yellow", label: "Yellow", swatch: "linear-gradient(135deg,#ffcc00,#ff9500)" },
  { id: "blue", label: "Blue", swatch: "linear-gradient(135deg,#4488ff,#0066cc)" },
  { id: "midnight", label: "Midnight", swatch: "linear-gradient(135deg,#6633cc,#9944ff)" },
  { id: "emerald", label: "Emerald", swatch: "linear-gradient(135deg,#10b981,#059669)" },
  { id: "rose", label: "Rose", swatch: "linear-gradient(135deg,#f43f5e,#e11d48)" },
];

export const CREDITS = [
  {
    name: "! MT | @its_mtung",
    role: "Owner",
    avatar: "https://sf-static.upanhlaylink.com/img/image_20260315dca794d5314fe0fa161a0b2e7c1f978a.jpg",
    link: "https://guns.lol/tungfvn",
  },
  {
    name: "Torawa Noya | @torawa_noya",
    role: "Manager",
    avatar: "https://sf-static.upanhlaylink.com/img/image_202607308da3c1463c807afd6b40429188f28dc3.jpg",
    link: "https://torawanoya.github.io/",
  },
];

export const GAMES = [
  {
    name: "Blox Fruits",
    img: "https://sf-static.upanhlaylink.com/img/image_20251126a02e8b7206d134bb5edbf583ba0d9898.jpg",
  },
  {
    name: "Dead Rails",
    img: "https://sf-static.upanhlaylink.com/img/image_20251126b591653fa9a4b0ddcb540f2038aac2cb.jpg",
  },
  {
    name: "All in One",
    img: "https://sf-static.upanhlaylink.com/img/image_2025112686edf6c650ac628fdc897a3fccdb8ebd.jpg",
  },
  {
    name: "Peta Peta",
    img: "https://sf-static.upanhlaylink.com/img/image_202511266181c2c5b26ff02fb002401b35dcf0db.jpg",
  },
];

export const PLANS = [
  {
    title: "1 WEEK",
    price: "$1",
    tagline: "Try all features",
    features: ["Full Access", "All Games", "Priority Support", "Perfect for testing"],
    popular: false,
  },
  {
    title: "1 MONTH",
    price: "$3",
    tagline: "Most Popular Choice",
    features: ["Full Access", "All Games", "Priority Support", "Updates Included", "Best Value"],
    popular: true,
  },
  {
    title: "LIFETIME",
    price: "$7",
    tagline: "One-time Payment",
    features: ["Full Access", "All Games", "Priority Support", "Lifetime Updates", "Best Deal"],
    popular: false,
  },
];

export const FAQS = [
  {
    q: "Is Hacker Hub safe to use?",
    a: "Yes, Hacker Hub is designed with security as a top priority. Our utilities are fully undetected and regularly updated to ensure your safety while using our tools.",
  },
  {
    q: "Which platforms are supported?",
    a: "Hacker Hub currently supports Windows 10 and 11. We are working on expanding to other platforms in the future.",
  },
  {
    q: "Do I need to pay for Hacker Hub?",
    a: "Hacker Hub offers both free and premium versions. The free version includes basic features, while the premium version unlocks advanced functionality and priority support.",
  },
  {
    q: "How do I get support?",
    a: "You can get support through our official Discord server where our team and community members are available to help with any issues you may encounter.",
  },
];
