declare let window: any;

import { Network, Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

interface IEthersContext {
  isConnected: boolean;
  connect: () => void;
  account: string;
  provider: Provider;
  network: Network;
  isConnecting: boolean;
  error: string;
}

const defaultEthersContext: IEthersContext = {
  isConnected: false,
  connect: () => {},
  account: "",
  provider: null,
  network: null,
  isConnecting: false,
  error: "",
};

const EthersContext = createContext(defaultEthersContext);

const EthersProvider = ({ children }) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider>(null);
  const [network, setNetwork] = useState<Network>(null);
  const [account, setAccount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const connect = async () => {
    try {
      if (window?.ethereum) {
        console.log("connecting...");
        setIsConnecting(true);
        setError("");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await provider.send("eth_requestAccounts", []);
        const currentNetwork = await provider.getNetwork();
        setAccount(account[0]);
        setNetwork(currentNetwork);
        setProvider(provider);
        setIsConnected(true);
        setIsConnecting(false);
        setError("");
      }
    } catch (err) {
      // todo toastify
      // import { UserRejectedRequestError } from '@web3-react/injected-connector'

      console.error(err);
      setError(err.message);
    }
  };

  const handleAccountChange = async (accounts) => {
    if (accounts?.[0] !== account) {
      await connect();
    }
  };

  const handleChainChange = () => {
    if (window?.location) {
      window.location.reload();
    }
  };
  const handleDisconnect = () => {
    setIsConnected(false);
    setNetwork(null);
    setAccount(null);
    setProvider(null);
  };

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);
      window.ethereum.on("disconnect", handleDisconnect);
    }
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
      window.ethereum.removeListener("chainChanged", handleChainChange);
      window.ethereum.removeListener("disconnect", handleDisconnect);
    };
  }, []); // eslint-disable-line

  return (
    <EthersContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        account,
        provider,
        network,
        error,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

const useEthers = () => useContext(EthersContext);

export { useEthers, EthersProvider };
