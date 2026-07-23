import { Header } from "@/components/Header";
import { LanguageProvider } from "@/lib/language";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <Header />
      {children}
    </LanguageProvider>
  );
}
