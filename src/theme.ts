export const bearCaveColors = {
  primaryDark: "#1E1E1E",
  accentGold: "#D49B41",
  slate: "#4A5A6A",
  light: "#F5F5F5",
} as const;

type ColorToken = keyof typeof bearCaveColors;

export const bearCaveGradients = {
  caveGold: "linear-gradient(135deg, #D49B41 0%, #E5B65A 100%)",
  caveDark: "linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%)",
  emergence: "linear-gradient(135deg, #1E1E1E 0%, #4A5A6A 50%, #D49B41 100%)",
  bearStrength: "linear-gradient(135deg, #D49B41 0%, #B8860B 100%)",
  darkToLight: "linear-gradient(180deg, #1E1E1E 0%, #F5F5F5 100%)",
} as const;

export type GradientToken = keyof typeof bearCaveGradients;

export const colors = bearCaveColors;
export const gradients = bearCaveGradients;
