import "@/styles/main.css";
import { useApollo } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";
import { Karla, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

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
  const client = useApollo(pageProps.initialClientState);

  return (
    <>
      <ClerkProvider>
        <ApolloProvider client={client}>
          <main
            className={`min-h-screen w-full ${rubik.variable} ${karla.variable} font-karla`}
          >
            <Component {...pageProps} />
          </main>
          <Toaster />
        </ApolloProvider>
      </ClerkProvider>
    </>
  );
}
