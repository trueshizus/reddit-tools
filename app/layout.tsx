import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Tools",
  description: "Easier moderation for Reddit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} border border-solid border-zinc-950 bg-zinc-950/5 max-h-lvh h-screen p-2 overflow-hidden flex`}
      >
        <aside className="border border-solid bg-zinc-950/5 border-zinc-950 has-[:focus]:border-4 basis-4/12 p-2">
          <Sidebar />
        </aside>
        <main className="col-span-4 overflow-hidden border border-solid bg-zinc-950/5 border-zinc-950 basis-8/12">
          {/* {content}  */}
          {children}
        </main>
      </body>
    </html>
  );
}
