export const MOCK_CONNECTION_STATE = {
  isConnected: true,
  connect: jest.fn(),
  account: '',
  provider: null,
  network: null,
  ensName: '',
  displayName: '',
  isConnecting: false,
  handleDisconnect: jest.fn(),
  queryDisplayName: '',
  isQueryLoad: false,
  queryAccount: '',
}

export const useConnection = jest.fn(() => {
  return MOCK_CONNECTION_STATE
})
