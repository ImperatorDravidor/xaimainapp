import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Add this to your global CSS or as a Tailwind plugin
 * 
 * .transition-ios {
 *   transition-property: all;
 *   transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
 *   transition-duration: 300ms;
 * }
 */
