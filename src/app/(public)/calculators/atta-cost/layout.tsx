import { LanguageProvider } from "@/features/calculators/atta-cost/components/language-provider";

export default function AttaCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
