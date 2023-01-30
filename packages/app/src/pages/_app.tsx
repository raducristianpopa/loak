import "@/styles/main.css";
import type { AppProps } from "next/app";
import { Rubik, Karla } from "@next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

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
