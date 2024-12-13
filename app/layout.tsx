import type { Metadata } from "next";
import localFont from "next/font/local";
import { Exo } from "next/font/google";
import "./globals.css";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const SatoshiBold = localFont({
  src: "./font/Satoshi-Bold.otf",
  variable: "--font-satoshi-bold",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Proattire coming soon",
  description: "",
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SatoshiBold.variable} ${exo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
