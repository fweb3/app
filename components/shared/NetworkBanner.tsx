import { useNetwork, useConnection } from '../../hooks'
import styled from 'styled-components'
import { NETWORKS } from '../../lib'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  position: fixed;
  z-index: 6;
  top: 100px;
  left: 0;
  right: 0;
`

const InfoText = styled.p`
  maring: 0;
  padding: 0;
  color: white;
  font-size: 1.1rem;
`

export const NetworkBanner = () => {
  const { isConnected } = useConnection()
  const { chainId, isAllowed } = useNetwork()
  const networkName = NETWORKS[chainId]
  return !isAllowed && isConnected ? (
    <Container>
      <InfoText>{`${networkName} network is not supported. Change networks`}</InfoText>
    </Container>
  ) : (
    <></>
  )
}
