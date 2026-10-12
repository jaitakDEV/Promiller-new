import { LanguageProvider } from "@/features/calculators/atta-cost/language-provider";

export default function AttaCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
