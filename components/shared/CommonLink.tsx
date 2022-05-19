import Link from 'next/link'
import styled from 'styled-components'
import { COLORS } from '../styles'

const StyledLink = styled.a`
  text-decoration: none;
  color: ${COLORS.violet};
`
export const CommonLink = (props) => {
  return (
    <Link href={props.href} passHref>
      <StyledLink {...props}>{props.children}</StyledLink>
    </Link>
  )
}
