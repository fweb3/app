import { createLocalProvider, createAlchemyProvider } from '../ethersInterfaces'
import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers'

jest.unmock('../ethersInterfaces')

jest.mock('@ethersproject/providers')

describe('ethers interfaces', () => {
  it('creates a json rpc provider', () => {
    createLocalProvider()
    expect(JsonRpcProvider).toBeCalled()
  })
  it('creates an alchemy provider', () => {
    createAlchemyProvider('foo')
    expect(AlchemyProvider).toBeCalled()
  })
})
