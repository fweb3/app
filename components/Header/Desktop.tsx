import { DisconnectedHeader } from './Disconnected'
import { ConnectedHeader } from './Connected'
import { useEthers } from '../../providers'

export const DesktopHeader = () => {
  const { isConnected } = useEthers()
  return isConnected ? <ConnectedHeader /> : <DisconnectedHeader />
}
