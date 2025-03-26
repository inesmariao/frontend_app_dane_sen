import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        sm: "0.875rem",  // 14px
        base: "1rem",     // 16px (por defecto)
        lg: "1.125rem",   // 18px
        xl: "1.25rem",    // 20px
        "2xl": "1.5rem",  // 24px
      },
    },
  },
  plugins: [],
} satisfies Config;
