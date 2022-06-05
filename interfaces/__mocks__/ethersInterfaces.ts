import { Network, BaseProvider } from '@ethersproject/providers'
import { BaseContract } from '@ethersproject/contracts'

export class MockContract extends BaseContract {
  constructor() {
    super('foo', 'bar')
  }
}

export class MockProvider extends BaseProvider {
  constructor() {
    super(137)
  }
  getNetwork(): Promise<Network> {
    return Promise.resolve({ chainId: 137, name: 'polygon' })
  }
}

export const createLocalProvider = jest.fn(async () => new MockProvider())
export const createAlchemyProvider = jest.fn(async () => new MockProvider())
