import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "DJ Golden Bling - Premium DJ & Music Producer",
  description:
    "Experience luxury entertainment with DJ Golden Bling. Book now for weddings, corporate events, and exclusive parties.",
  keywords: [
    "DJ",
    "Golden Bling",
    "Wedding DJ",
    "Event DJ",
    "Music Producer",
    "Luxury Entertainment",
  ],
  openGraph: {
    title: "DJ Golden Bling - Premium DJ & Music Producer",
    description:
      "Experience luxury entertainment with DJ Golden Bling. Book now for weddings, corporate events, and exclusive parties.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Golden Bling - Premium DJ & Music Producer",
    description:
      "Experience luxury entertainment with DJ Golden Bling. Book now for weddings, corporate events, and exclusive parties.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased text-white",
          inter.variable,
          playfair.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
