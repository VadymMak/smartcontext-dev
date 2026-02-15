export const SITE_CONFIG = {
  name: "SmartContext",
  url: "https://smartcontext.dev",
  author: "Vadym Mak",
  description:
    "Full-stack web development with AI integration. Modern websites built on Next.js with built-in SEO and AI features.",
  email: "hello@smartcontext.dev",
  location: "Erdemli, Turkey",
  social: {
    github: "https://github.com/VadymMak",
    linkedin: "https://linkedin.com/in/vadymmak",
  },
} as const;

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;