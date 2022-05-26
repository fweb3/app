export {}

jest.mock('./providers/ConnectionProvider')
jest.mock('./providers/GameProvider')
jest.mock('./hooks/useDevice')

afterEach(() => {
  jest.clearAllMocks()
})
