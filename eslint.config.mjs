import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables that start with _
      "@typescript-eslint/no-unused-vars": [
        "off"  // Temporarily disabled for migration
      ],
      // Warn instead of error for console.log
      "no-console": "off",
      // Allow async components
      "@typescript-eslint/no-floating-promises": "off",
      // Allow any type temporarily during migration
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unescaped entities
      "react/no-unescaped-entities": "off",
      // Allow prefer-const
      "prefer-const": "warn",
      // Relax hooks rules
      "react-hooks/exhaustive-deps": "warn",
      // Allow img elements
      "@next/next/no-img-element": "warn",
      // Allow alt text warnings
      "jsx-a11y/alt-text": "warn"
    }
  }
];

export default eslintConfig;
