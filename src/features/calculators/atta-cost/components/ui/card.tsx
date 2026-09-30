import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  accent?: "wheat" | "indigo" | "orange" | "none";
  sticky?: boolean;
  className?: string;
  children: ReactNode;
}

const accentMap: Record<string, string> = {
  wheat: "border-l-amber-700",
  indigo: "border-l-indigo-600",
  orange: "border-l-orange-500",
  none: "border-l-transparent",
};

export default function Card({
  title,
  subtitle,
  accent = "wheat",
  sticky = false,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`mb-5 rounded-2xl border border-stone-200 border-l-4 bg-white p-5 shadow-[0_10px_30px_rgba(43,36,32,0.06)] sm:p-6 ${accentMap[accent]} ${
        sticky ? "lg:sticky lg:top-5" : ""
      } ${className}`}
    >
      {title && (
        <h2 className="mb-1 text-[16px] font-bold text-stone-900">{title}</h2>
      )}
      {subtitle && (
        <p className="mb-4 text-[12px] leading-relaxed text-stone-500">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
