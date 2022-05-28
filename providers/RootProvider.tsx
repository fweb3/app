import { IComponentProps } from '../components/component'
import { AccountProvider } from './AccountProvider'
import { LoadingProvider } from './LoadingProvider'
import { ErrorProvider } from './ErrorProvider'
import { GameProvider } from './GameProvider'
import { UrlProvider } from './UrlProvider'
import { EthersProvider } from './EthersProvider'

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
