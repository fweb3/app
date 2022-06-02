export const MOCK_ACCOUNT_CONTEXT = {
  ensName: '',
  displayName: '',
  queryDisplayName: '',
  queryAccount: '',
  isQueryLoad: false,
  account: '',
}

export const useAccount = jest.fn(() => {
  return MOCK_ACCOUNT_CONTEXT
})
