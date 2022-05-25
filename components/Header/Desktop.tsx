import { useConnection } from '../../providers'
import { ConnectedHeader } from './Connected'
import { DisconnectedHeader } from './Disconnected'

export const DesktopHeader = () => {
  const { isConnected } = useConnection()
  return isConnected ? <ConnectedHeader /> : <DisconnectedHeader />
}
