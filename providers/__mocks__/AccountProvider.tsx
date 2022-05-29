export const MOCK_ACCOUNT_STATE = {
  ensName: '',
  displayName: '',
  queryDisplayName: '',
  queryAccount: '',
  account: '',
}

export const useAccount = jest.fn(() => {
  return MOCK_ACCOUNT_STATE
})
