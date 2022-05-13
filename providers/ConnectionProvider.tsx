declare let window: any;

import { FWEB3_GAME_ADDRESS, FWEB3_TOKEN_ADDRESS } from "../interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import fweb3TokenInterface from "../interfaces/Fweb3Token.json";
import fweb3GameInterface from "../interfaces/Fweb3Game.json";
import { Contract, ethers } from "ethers";

interface IConnectionContext {
  isConnected: boolean;
  connect: () => void;
  account: string;
  provider: ethers.providers.AlchemyProvider | ethers.providers.JsonRpcProvider;
  network: ethers.providers.Network;
  isConnecting: boolean;
  error: string;
  tokenContract: Contract;
  gameContract: Contract;
  ensName: string;
}

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: "",
  provider: null,
  network: null,
  isConnecting: false,
  error: "",
  tokenContract: null,
  gameContract: null,
  ensName: "",
};

const ConnectionContext = createContext(defaultConnectionContext);

const ConnectionProvider = ({ children }) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tokenContract, setTokenContract] = useState<Contract>(null);
  const [gameContract, setGameContract] = useState<Contract>(null);
  const [network, setNetwork] = useState<ethers.providers.Network>(null);
  const [account, setAccount] = useState<string>("");
  const [ensName, setEnsName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [provider, setProvider] = useState(null);

  const connect = async () => {
    try {
      if (window?.ethereum) {
        setIsConnecting(true);
        setError("");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await provider.send("eth_requestAccounts", []);
        const currentNetwork = await provider.getNetwork();
        const tokenContract = await loadTokenContract(provider);
        const gameContract = await loadGameContract(provider);
        const ensName = await fetchEnsName(account[0]);
        setTokenContract(tokenContract);
        setGameContract(gameContract);
        setNetwork(currentNetwork);
        setIsConnecting(false);
        setAccount(account[0]);
        setProvider(provider);
        setIsConnected(true);
        setEnsName(ensName);
        setError("");
      }
    } catch (err) {
      // todo toastify
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

  const loadTokenContract = (provider) => {
    const contract = new ethers.Contract(
      FWEB3_TOKEN_ADDRESS,
      fweb3TokenInterface.abi,
      provider
    );
    return contract;
  };

  const loadGameContract = (provider) => {
    const contract = new ethers.Contract(
      FWEB3_GAME_ADDRESS,
      fweb3GameInterface.abi,
      provider
    );
    return contract;
  };

  const fetchEnsName = async (account) => {
    const provider = new ethers.providers.AlchemyProvider(
      "homestead",
      process.env.NEXT_PUBLIC_ALCHEMY_KEY
    );
    const ensName = await provider.lookupAddress(account);
    return ensName;
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
    <ConnectionContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        account,
        provider,
        network,
        error,
        tokenContract,
        gameContract,
        ensName,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

const useConnection = () => useContext(ConnectionContext);

export { useConnection, ConnectionProvider };
