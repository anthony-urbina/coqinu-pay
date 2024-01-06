import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "../components/navbar/navbar";

export const metadata: Metadata = {
  title: "Coqinu Pay",
  description: "Welcome to the future of chad coin payments!",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en' className='bg-zinc-900'>
      <script src='https://kit.fontawesome.com/1eec8ffaa9.js' crossOrigin='anonymous' async></script>
      <body>
        <Providers>
          <Navbar />
          <div className='px-3 md:pl-8'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
