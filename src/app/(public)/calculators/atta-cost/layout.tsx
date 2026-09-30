import { LanguageProvider } from "@/features/calculators/atta-cost/components/LanguageProvider";

export default function AttaCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
