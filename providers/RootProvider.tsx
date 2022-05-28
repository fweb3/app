import { IComponentProps } from '../components/component'
import { ConnectionProvider } from './ConnectionProvider'
import { LoadingProvider } from './LoadingProvider'
import { NetworkProvider } from './NetworkProvider'
import { ErrorProvider } from './ErrorProvider'
import { GameProvider } from './GameProvider'
import { UrlProvider } from './UrlProvider'

export const RootProvider = ({ children }: IComponentProps) => {
  return (
    <LoadingProvider>
      <ErrorProvider>
        <ConnectionProvider>
          <NetworkProvider>
            <UrlProvider>
              <GameProvider>{children}</GameProvider>
            </UrlProvider>
          </NetworkProvider>
        </ConnectionProvider>
      </ErrorProvider>
    </LoadingProvider>
  )
}
