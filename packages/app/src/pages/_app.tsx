import { trpc } from "@/lib/trpc";
import "@/styles/main.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  },
);

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

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider>
        <main
          className={`min-h-screen w-full ${rubik.variable} ${karla.variable} font-karla`}
        >
          <Component {...pageProps} />
        </main>
        <Toaster />
      </ClerkProvider>
    </>
  );
}

export default trpc.withTRPC(App);
