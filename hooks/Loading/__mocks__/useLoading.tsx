export const useLoading = jest.fn(() => {
  return {
    isLoading: false,
    setIsLoading: jest.fn(),
  }
})
