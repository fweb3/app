import { COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import styled from 'styled-components'
import Link from 'next/link'

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

export const CommonText = styled.p`
  color: ${COLORS.light};
  margin: 0 0 ${SPACING.small} 0;
  padding: 0;
  text-indent: ${SPACING.large};
  font-size: 1.1rem;
  line-height: 1.3rem;

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${TEXT.p};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    font-size: ${TEXT.p};
    text-indent: 0;
  }
  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    font-size: ${TEXT.h4};
    line-height: 2.2rem;
  }
`

export const Subheading = styled.h2`
  margin: 0 0 1.2rem;
  padding: 0;
  font-size: ${TEXT.h2};
  color: ${COLORS.maize};
`

export const ErrorText = styled.p`
  color: ${COLORS.error};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${TEXT.p};
  }
`

export const HeadingText = styled.h1`
  color: white;
  font-size: calc(${TEXT.p} + 0.1rem);
  margin: 0 0 ${SPACING.small} 0;
  padding: 0;
  text-align: center;
  color: ${COLORS.violet};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${TEXT.h3};
  }
  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    font-size: 2.4rem;
    text-align: left;
  }
  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    font-size: 3rem;
  }
`

const AddColor = styled((props) => <span {...props} />)`
  color: ${(props) => props.$color};
`

export const ColoredText = ({ children, color = 'white' }) => {
  return <AddColor $color={color}>{children}</AddColor>
}
