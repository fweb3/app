import { HeadingText, CommonText } from '../../shared/Elements'
import { loadAddress } from '../../../interfaces'

export const BurnToken = (): JSX.Element => {
  return (
    <>
      <HeadingText>Burn a token</HeadingText>
      <CommonText>Do this by sending at least 1 $FWEB3 token to: </CommonText>
      <pre>{loadAddress('burn')[0]}</pre>
      <CommonText>
        This is kind of like throwing a dollar bill in a river. It won&apos;t be
        reflected in the totalSupply function universally, but there is a paper
        trail that you effectively destroyed one token. Deflation!
      </CommonText>
    </>
  )
}
