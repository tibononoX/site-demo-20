// Loads the per-client data file (src/data/client.json) and derives theme values.
import raw from '../data/client.json';
import type { ImageMetadata } from 'astro';

export type Lang = 'en' | 'fr';
export type Trade = 'painter' | 'joiner' | 'landscaper' | 'roofer' | 'garage' | 'driving' | 'mover' | 'plumber' | 'locksmith' | 'florist' | 'hotel' | 'tiler' | 'sweep' | 'metal' | 'generic';
export interface Phone { label: string; display: string; tel: string }
export interface Pic { image: string; alt: string; caption?: string }
export interface Client {
  lang: Lang;
  name: string;
  /** letter used in the favicon (defaults to the first letter of name) */
  initial?: string;
  trade: Trade;
  tradeLabel: string;
  location?: string;
  theme: { mode: 'light' | 'dark'; accent: string; display: 'serif' | 'sans'; hero: 'split' | 'type' };
  hero: { eyebrow?: string; title: string; titleEm?: string; lead: string; image?: string; alt?: string; position?: string };
  rating?: { score: string; count: number; source: string } | null;
  intro?: { title: string; paragraphs: string[]; facts?: string[]; image?: string; alt?: string };
  services: { title: string; lead?: string; items: { title: string; text: string; bullets?: string[] }[] };
  gallery?: { title: string; lead?: string; label?: string; items: Pic[] } | null;
  band?: { image: string; alt: string } | null;
  /** optional price list: ONLY prices the business publishes itself */
  prices?: { title: string; lead?: string; note?: string; groups: { title: string; items: { label: string; detail?: string; price: string }[] }[] } | null;
  steps: { title: string; items: { title: string; text: string }[] };
  contact: { title: string; lead: string; phones: Phone[]; email: string; address: string[]; hours?: string[] };
  footer?: { note?: string };
}
export const c = raw as unknown as Client;

const imgs = import.meta.glob<{ default: ImageMetadata }>('../data/img/*.{jpg,jpeg,png,webp}', { eager: true });
export function img(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  const hit = Object.entries(imgs).find(([k]) => k.endsWith('/' + name));
  if (!hit) throw new Error(`Image not found in src/data/img: ${name}`);
  return hit[1].default;
}

// ---- colour helpers: keep the brand accent, but derive accessible variants ----
const hex = (h: string) => h.replace('#', '').match(/../g)!.map((x) => parseInt(x, 16));
const toHex = (r: number[]) => '#' + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const lum = (h: string) => { const [r, g, b] = hex(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a: string, b: string, t: number) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
/** shift colour toward black/white until it reaches the target contrast against bg */
export function reach(col: string, bg: string, target = 4.6) {
  const toward = lum(bg) > 0.4 ? '#000000' : '#ffffff';
  for (let t = 0; t <= 1; t += 0.02) { const m = mix(col, toward, t); if (contrast(m, bg) >= target) return m; }
  return toward;
}
export function palette() {
  const dark = c.theme.mode === 'dark';
  const bg = dark ? '#0f1311' : '#f7f5f0';
  const surface = dark ? '#171c19' : '#ffffff';
  const ink = dark ? '#eef1ec' : '#191c1a';
  const muted = dark ? '#b4bcb4' : '#4f5550';
  const accent = c.theme.accent;
  const accentText = reach(accent, bg, 4.6); // accent used as text/link on page bg
  const accentTextSurf = reach(accent, surface, 4.6);
  // button: brand accent as fill when label contrast works, else deepen it
  const onW = contrast(accent, '#ffffff'), onB = contrast(accent, '#111111');
  let btn = accent, btnInk = onW >= onB ? '#ffffff' : '#111111';
  if (Math.max(onW, onB) < 4.6) { btn = reach(accent, '#ffffff', 4.6); btnInk = '#ffffff'; }
  const tint = mix(bg, accent, dark ? 0.14 : 0.1);
  return { bg, surface, ink, muted, accent, accentText, accentTextSurf, btn, btnInk, tint, line: dark ? '#2a312d' : '#e3dfd6' };
}

export const L = {
  en: { skip: 'Skip to content', services: 'Services', work: 'Recent work', steps: 'How it works', contact: 'Contact', call: 'Call', email: 'Email', reviews: 'reviews on', rating: 'Rated', address: 'Address', hours: 'Hours', menu: 'Sections', top: 'Back to top', write: 'Send an email', quick: 'Quick contact', prices: 'Prices' },
  fr: { skip: 'Aller au contenu', services: 'Prestations', work: 'Réalisations', steps: 'Comment ça marche', contact: 'Contact', call: 'Appeler', email: 'Email', reviews: 'avis sur', rating: 'Noté', address: 'Adresse', hours: 'Horaires', menu: 'Sections', top: 'Haut de page', write: 'Écrire un email', quick: 'Contact rapide', prices: 'Tarifs' },
}[c.lang];

export const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
