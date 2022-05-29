export const MOCK_ETHERS_STATE = {
  isConnected: true,
  account: '',
  web3Provider: null,
  network: null,
  isConnecting: false,
  isLocal: false,
  isAllowedNetwork: true,
  isInitialized: true,
  chainId: 137,
  needsWallet: false,
  connectAccount: jest.fn(),
}

export const useEthers = jest.fn(() => {
  return MOCK_ETHERS_STATE
})
