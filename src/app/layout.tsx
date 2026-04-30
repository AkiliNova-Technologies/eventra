import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akili-eventra.vercel.app"),

  title: {
    default: "Eventra | Event Management SaaS Platform",
    template: "%s | Eventra",
  },

  description:
    "Eventra is an all-in-one event management SaaS platform for creating events, selling tickets, tracking revenue, and managing attendees.",

  keywords: [
    "event management software",
    "event ticketing platform",
    "event SaaS",
    "ticket sales dashboard",
    "attendee management",
    "event analytics",
    "online event registration",
    "Eventra",
  ],

  authors: [{ name: "AkiliNova Technologies" }],
  creator: "AkiliNova Technologies",
  publisher: "AkiliNova Technologies",
  applicationName: "Eventra",

  openGraph: {
    title: "Eventra | Event Management SaaS Platform",
    description:
      "Create events, sell tickets, track revenue, and manage attendees from one powerful SaaS dashboard.",
    url: "https://akili-eventra.vercel.app",
    siteName: "Eventra",
    images: [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Eventra event management platform",
  },
],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Eventra | Event Management SaaS Platform",
    description:
      "All-in-one platform for event organizers to create, manage, sell tickets, and track revenue.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}