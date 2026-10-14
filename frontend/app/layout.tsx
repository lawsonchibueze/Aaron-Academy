import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Aaron's Soccer Academy",
  description: "Train with purpose. Play with pride.",
  icons: {
    icon: "/asa-logo.jpeg",
    shortcut: "/asa-logo.jpeg",
    apple: "/asa-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>{children}<Toaster position="top-right" richColors closeButton /></body>
    </html>
  );
}
