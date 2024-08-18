import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Tools",
  description: "Easier moderation for Reddit.",
};

export default function RootLayout({
  children,
  sidebar,
  content,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} border border-solid border-zinc-950 bg-zinc-950/10 max-h-lvh h-screen p-2 overflow-hidden flex`}
      >
        <aside className="border border-solid bg-zinc-950/10 border-zinc-950 has-[:focus]:border-4 basis-3/12 p-2">
          {sidebar}
        </aside>
        <main className="col-span-4 overflow-hidden border border-solid bg-zinc-950/10 border-zinc-950 basis-9/12">
          {content}
        </main>
      </body>
    </html>
  );
}
