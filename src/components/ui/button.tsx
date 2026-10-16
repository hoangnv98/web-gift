import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson-700 text-cream-50 shadow-[0_8px_24px_-10px_rgb(136_25_23/0.6)] hover:bg-crimson-600 hover:shadow-[0_12px_28px_-10px_rgb(136_25_23/0.7)] hover:-translate-y-0.5",
  gold:
    "bg-gold-500 text-ink-900 hover:bg-gold-400 hover:-translate-y-0.5 shadow-[0_8px_24px_-10px_rgb(201_162_39/0.7)]",
  outline:
    "border border-crimson-700 text-crimson-700 hover:bg-crimson-700 hover:text-cream-50",
  ghost: "text-crimson-700 hover:bg-crimson-50",
  white:
    "bg-cream-50 text-crimson-800 hover:bg-white hover:-translate-y-0.5 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.35)]",
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

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
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
