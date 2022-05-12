import ERC20_ABI from "./Fweb3Token.json";
import useContract from "./useContract";

export default function useTokenContract(tokenAddress?: string) {
  return useContract(tokenAddress, ERC20_ABI.abi);
}
