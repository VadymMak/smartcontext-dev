import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Typed navigation helpers — use these instead of next/navigation
// Link, redirect, usePathname, useRouter — all locale-aware
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
