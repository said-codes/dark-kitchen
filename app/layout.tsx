import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import { Metadata } from "next";
import Script from "next/script";
import { ToastProvider, Toaster } from "../components/ui/Toast";
import PageTransition from "../components/animations/PageTransition";

const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dark Kitchen Curumaní | Arroz chino, almuerzos y más",
  description: "Pedidos por WhatsApp. Arroz chino, almuerzos, desayunos, yogurt casero y suero en Curumaní, Cesar.",
  openGraph: {
    title: "Dark Kitchen Curumaní",
    description: "Pedidos por WhatsApp. Arroz chino, almuerzos, desayunos, yogurt casero y suero.",
    type: "website",
    locale: "es_CO",
    siteName: "Dark Kitchen Curumaní"
  },
  robots: {
    index: true,
    follow: true
  }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Dark Kitchen Curumaní",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cra. 17 # 9A-68",
    addressLocality: "Curumaní",
    addressRegion: "Cesar",
    addressCountry: "CO"
  },
  telephone: "+57 313 6467910",
  servesCuisine: ["China", "Colombiana"],
  url: "https://example.com",
  priceRange: "$"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans bg-white text-neutral-900`}>
        <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <ToastProvider>
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}