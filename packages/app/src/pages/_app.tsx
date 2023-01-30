import "@/styles/main.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <main
        className={`min-h-screen w-full ${rubik.variable} ${karla.variable} font-karla`}
      >
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
}
