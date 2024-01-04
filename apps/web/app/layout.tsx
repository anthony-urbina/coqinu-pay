import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coqinu Pay",
  description: "Welcome to the future of chad coin payments!",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en' className='bg-primary'>
      <script src='https://kit.fontawesome.com/1eec8ffaa9.js' crossOrigin='anonymous' async></script>
      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
