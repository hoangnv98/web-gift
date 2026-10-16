import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            dark ? "text-gold-300" : "text-gold-600",
          )}
        >
          <span className="h-px w-6 bg-current/60" />
          {eyebrow}
          <span className="h-px w-6 bg-current/60" />
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-cream-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-cream-200/80" : "text-ink-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
