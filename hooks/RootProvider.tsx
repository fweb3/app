import type { IComponentProps } from '../types'
import { AccountProvider } from './Account'
import { LoadingProvider } from './Loading'
import { EthersProvider } from './Ethers'
import { ErrorProvider } from './Error'
import { GameProvider } from './Game'
import { UrlProvider } from './Url'

export const RootProvider = ({ children }: IComponentProps) => {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <EthersProvider>
          <AccountProvider>
            <UrlProvider>
              <GameProvider>{children}</GameProvider>
            </UrlProvider>
          </AccountProvider>
        </EthersProvider>
      </LoadingProvider>
    </ErrorProvider>
  )
}
