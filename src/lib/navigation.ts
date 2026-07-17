import { pages, type PagePath } from "./tokens";

export interface NavChildItem {
  label: string;
  href: PagePath | string;
}

export interface NavItem {
  label: string;
  href: PagePath | string;
  children?: NavChildItem[];
}

/** Primary nav — sub-links under Events keep the menu uncluttered */
export const navItems: NavItem[] = [
  { label: "Home", href: pages.home },
  { label: "Experiences", href: pages.experiences },
  { label: "Gallery", href: pages.gallery },
  { label: "Food Menu", href: pages.menu },
  { label: "About Us", href: pages.about },
  {
    label: "Events",
    href: pages.events,
    children: [
      { label: "Attend an Event", href: pages.attendEvent },
      { label: "Event Calendar", href: pages.calendar },
    ],
  },
];

const eventsSectionPaths = [
  pages.events,
  pages.attendEvent,
  pages.calendar,
  pages.hostEvent,
] as const;

/** Whether a top-level nav item should appear active */
export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;

  if (item.href === pages.menu) {
    return pathname.startsWith(`${pages.menu}/`);
  }

  if (item.href === pages.events) {
    if (pathname.startsWith(`${pages.events}/`)) return true;
    return eventsSectionPaths.some(
      (path) => path !== pages.events && pathname === path
    );
  }

  return false;
}

/** Whether an Events sub-link should appear active */
export function isNavChildActive(pathname: string, href: string): boolean {
  if (href === pages.events) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}

/** Navbar primary CTA — aligned with Figma */
export const navCta = {
  label: "Host an Event",
  href: pages.hostEvent,
} as const;
