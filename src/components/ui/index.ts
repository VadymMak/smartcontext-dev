// ============================================================
// src/components/ui/index.ts
// ⚠️ REQUIRED: barrel export — always import from here
// import { ThemeToggle, FAQ, ContactForm } from '@/components/ui'
// ============================================================

// Core — always keep
export { ThemeToggle } from "./ThemeToggle/ThemeToggle";
export { TypedText } from "./TypedText/TypedText";
export { ScrollReveal } from "./ScrollReveal/ScrollReveal";
export { FAQ } from "./FAQ/FAQ";
export { ContactForm } from "./ContactForm/ContactForm";
export { CookieBanner } from "./CookieBanner/CookieBanner";
export { GoogleAnalytics } from "./GoogleAnalytics/GoogleAnalytics";

// [optional] — delete the export AND the folder if feature not needed
export { AnnouncementBar } from "./AnnouncementBar/AnnouncementBar";
export { WhatsAppButton } from "./WhatsAppButton/WhatsAppButton";
export { ProtectedImage } from "./ProtectedImage/ProtectedImage";
export { Gallery } from "./Gallery/Gallery";
export { ChatWidget } from "./ChatWidget/ChatWidget";
