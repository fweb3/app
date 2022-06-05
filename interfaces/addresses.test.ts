import { loadAddress } from './addresses'

describe('addresses', () => {
  it('throws if bad chain', () => {
    try {
      loadAddress(69420, 'fweb3_token')
    } catch (err) {
      expect(err?.message?.includes('No address found for')).toBeTruthy()
    }
  })
})
