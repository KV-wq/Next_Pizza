import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pizza 🍕",
  description: "Вкуснее уже не будет!",
  openGraph: {
    type: "website",
    url: "https://next-pizza.vercel.app/",
    title: "Pizza 🍕",
    description: "Вкуснее уже не будет!",
    images: [
      {
        url: "https://next-pizza.vercel.app/og-image.png",
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.variable}>{children}</body>
    </html>
  );
}
