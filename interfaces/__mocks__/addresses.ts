export const loadAddress = jest.fn((chain: string, name: string) => {
  return [`${chain}_mock_${name}_address`]
})
