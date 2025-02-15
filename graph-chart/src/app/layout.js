import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Graph Charts",
  description: "generating graph chart with highchart",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <head>
              <link rel="icon" href="/favicon.svg" />
          </head>
          <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              {children}
          </body>
      </html>
  );
}
