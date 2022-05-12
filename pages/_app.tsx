import type { AppProps } from "next/app";
import { EthersProvider } from "../providers";
import "../styles/globals.css";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <EthersProvider>
      <Component {...pageProps} />
    </EthersProvider>
  );
}

export default NextWeb3App;
