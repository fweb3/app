declare let window: any // eslint-disable-line

import { MockContract, MockProvider } from '../__mocks__/ethersInterfaces'
import { Contract } from '@ethersproject/contracts'
import { loadFweb3Contracts } from '../contracts'
// eslint-disable-next-line
import { GameError } from './../../types'

jest.unmock('../contracts')

describe('contracts interfaces', () => {
  it('throws without provider', async () => {
    try {
      await loadFweb3Contracts(null)
    } catch (err: GameError) {
      expect(err.message).toBe('No provider to load contracts')
    }
  })

  it('loads the game contracts', async () => {
    jest.mocked(Contract).mockReturnValueOnce(new MockContract())
    const contracts = await loadFweb3Contracts(new MockProvider())
    expect(contracts.gameContract?.connect).toBeTruthy()
    expect(contracts.tokenContract?.connect).toBeTruthy()
  })

  it('returns empty address if in cypress', async () => {
    window.Cypress = true
    const contracts = await loadFweb3Contracts(new MockProvider())
    expect(contracts.gameContract).toBeNull()
    expect(contracts.tokenContract).toBeNull()
  })
})
