import { DisconnectedHeader } from './Disconnected'
import { ConnectedHeader } from './Connected'
import { useEthers } from '../../hooks'

export const DesktopHeader = () => {
  const { isConnected } = useEthers()
  return isConnected ? <ConnectedHeader /> : <DisconnectedHeader />
}
