import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "ruby" | "outline" | "outline-light" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-cream-50 shadow-[0_8px_24px_-10px_rgb(11_25_44/0.7)] hover:bg-navy-800 hover:-translate-y-0.5",
  gold: "bg-gold-gradient text-navy-900 shadow-[0_8px_24px_-10px_rgb(212_175_55/0.8)] hover:brightness-105 hover:-translate-y-0.5",
  ruby: "bg-ruby-700 text-cream-50 shadow-[0_8px_24px_-10px_rgb(155_27_30/0.7)] hover:bg-ruby-600 hover:-translate-y-0.5",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-cream-50",
  "outline-light": "border border-gold-400/70 text-gold-200 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500",
  ghost: "text-navy-900 hover:bg-navy-50",
  white: "bg-cream-50 text-navy-900 hover:bg-white hover:-translate-y-0.5 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.35)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({ variant = "primary", size = "md", className, href, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
