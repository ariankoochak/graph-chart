import "@/styles/globals.css";
import "@/styles/iranSansX.css";

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
          <body>
              {children}
          </body>
      </html>
  );
}
