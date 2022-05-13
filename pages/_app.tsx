import type { AppProps } from "next/app";
import { ConnectionProvider } from "../providers";
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider>
      <Component {...pageProps} />
    </ConnectionProvider>
  );
}

export default NextWeb3App;
