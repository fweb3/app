import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers'
import { logger } from '../lib'

export const createLocalProvider = async (): Promise<JsonRpcProvider> => {
  const provider = await new JsonRpcProvider()
  logger.log(`[+] created rpc provider for: [localhost]`)
  return provider
}

export const createAlchemyProvider = async (
  network: string
): Promise<AlchemyProvider> => {
  const provider = new AlchemyProvider(
    network,
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  )
  logger.log(`[+] created alchemy provider for: [${network}]`)
  return provider
}
