export const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "1400px",
} as const;

export const semanticColors = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",
} as const;

export const typographyClasses = {
  heading: "type-heading",
  subheading: "type-subheading",
  paragraph: "type-paragraph",
  caption: "type-caption",
  price: "type-price",
  badge: "type-badge",
} as const;
