// Small inline SVG icon set per trade (stroke icons, 24px grid). Decorative only.
const P: Record<string, string> = {
  painter: '<path d="M4 4h12v5H4z"/><path d="M16 6.5h3v5h-8v3"/><path d="M10 14.5h2v6h-2z"/>',
  joiner: '<path d="M3 17l9-9 4 4-9 9H3z"/><path d="M14 6l2-2 4 4-2 2"/><path d="M6 14l4 4"/>',
  landscaper: '<path d="M12 21v-8"/><path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 15c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5z"/><path d="M5 21h14"/>',
  roofer: '<path d="M3 12l9-7 9 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
  garage: '<path d="M5 16h14"/><path d="M6 16l1.6-4.5A2 2 0 0 1 9.5 10h5a2 2 0 0 1 1.9 1.5L18 16"/><path d="M4 16v3h2v-1.5h12V19h2v-3"/><circle cx="8" cy="16.8" r=".6"/><circle cx="16" cy="16.8" r=".6"/><path d="M3 9l9-5 9 5"/>',
  driving: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/><path d="M3.5 10.5h6.3M14.2 10.5h6.3M12 14.2V21"/>',
  mover: '<path d="M2 6h11v10H2z"/><path d="M13 9h4.5l3.5 3.5V16h-8"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  plumber: '<path d="M12 3s5 5.6 5 9.5a5 5 0 0 1-10 0C7 8.6 12 3 12 3z"/><path d="M10 13.5a2 2 0 0 0 2 2"/>',
  locksmith: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>',
  florist: '<circle cx="12" cy="9" r="2"/><path d="M12 5a2.5 2.5 0 1 1 0 0M12 7a3 3 0 1 0 3.5-3.2M12 7a3 3 0 1 1-3.5-3.2M10.2 10.5a3 3 0 1 0-1.5 3.6M13.8 10.5a3 3 0 1 1 1.5 3.6"/><path d="M12 11v10M12 17c-2 0-4-1.5-4-3.5M12 19c2 0 4-1.5 4-3.5"/>',
  hotel: '<path d="M3 19V7M3 13h18v6M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.6"/>',
  tiler: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 12h18M12 3v18"/>',
  sweep: '<path d="M4 21V11l8-6 8 6v10"/><path d="M15 7.5V3h3v6.8"/><path d="M9 21v-5h6v5"/>',
  generic: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  metal: '<path d="M5 4h14M5 20h14M12 4v16"/><path d="M8 4v2M16 4v2M8 18v2M16 18v2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  arrow: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
};
export const icon = (k: string, size = 22, fill = false) =>
  `<svg aria-hidden="true" focusable="false" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[k] ?? ''}</svg>`;
