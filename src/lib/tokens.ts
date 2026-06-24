/**
 * Danyame Recreational Village — Design Tokens
 *
 * Single source of truth for all design decisions.
 * Source: Figma file xbI0tCR1Y3dQFFI5PXxb5X (Color Sheet, Typography)
 *
 * These values mirror the CSS custom properties in globals.css.
 * Use these in JS/TS contexts (e.g. dynamic styles, chart config, tests).
 */

// ── Colors ────────────────────────────────────────────────────
export const colors = {
  /** Primary brand — deep teal */
  teal: "#125E65",
  teal50: "#e8f3f4",
  teal100: "#c4dfe1",
  teal200: "#9dcacb",
  teal800: "#0d4a50",
  teal900: "#0a393d",

  /** P 1 — rust / terracotta */
  rust: "#C84F38",

  /** P 3 — warm amber */
  amber: "#F39D57",

  /** P 4 — crimson */
  crimson: "#D03F50",

  /** Neutral */
  ink: "#1E1E1E",
  subtext: "#575757",
  muted: "#DDDDDD",
  surface: "#FFFFFF",
  surface2: "#F8F8F6",
} as const;

export type ColorKey = keyof typeof colors;

// ── Typography ────────────────────────────────────────────────
export const fonts = {
  heading: "'Clash Grotesk', sans-serif",
  body: "'Satoshi', sans-serif",
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ── Spacing ───────────────────────────────────────────────────
export const spacing = {
  /** 56px — horizontal page padding on 1440px canvas */
  containerX: 56,

  /** 130px — top padding per section (from Figma) */
  sectionY: 130,

  xs: 8,
  sm: 16,
  md: 32,
  lg: 64,
  xl: 96,
} as const;

// ── Layout ────────────────────────────────────────────────────
export const layout = {
  /** Max content width derived from Figma canvas */
  maxWidth: 1440,

  /** Navbar height */
  navHeight: 114,

  /** Primary button height */
  buttonHeight: 50,
} as const;

// ── Border radius ─────────────────────────────────────────────
export const radius = {
  /** Buttons */
  pill: 100,

  /** Image cards */
  card: 16,

  /** Form inputs */
  input: 8,
} as const;

// ── Motion ────────────────────────────────────────────────────
export const motion = {
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: 150,
  durationBase: 300,
  durationSlow: 600,
} as const;

// ── Site pages ────────────────────────────────────────────────
export const pages = {
  home: "/",
  experiences: "/experiences",
  about: "/about",
  gallery: "/gallery",
  events: "/events",
  attendEvent: "/attend-event",
  calendar: "/calendar",
  hostEvent: "/host-event",
  privacy: "/privacy",
  contact: "/contact",
} as const;

export type PageKey = keyof typeof pages;
export type PagePath = (typeof pages)[PageKey];
