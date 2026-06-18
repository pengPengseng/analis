import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analis - AI Equity Research & Personal Finance",
  description: "Platform AI untuk riset saham dan manajemen keuangan pribadi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 flex h-screen overflow-hidden antialiased`}>
        <Sidebar />
        <QueryClientProvider client={queryClient}>
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-950">
              {children}
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
