export const DEFAULT_CONNECTION_STATE = {
  isConnected: true,
  isQueryLoad: false,
}

export const useConnection = jest.fn(() => {
  return DEFAULT_CONNECTION_STATE
})
