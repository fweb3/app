import { COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import styled from 'styled-components'
import Link from 'next/link'

const StyledLink = styled.a`
  color: ${COLORS.teaGreen};
`
export const CommonLink = (props) => {
  return (
    <Link href={props.href || '#'} passHref>
      <StyledLink {...props} target="_blank" rel="noreferrer">
        {props.children}
      </StyledLink>
    </Link>
  )
}

export const CommonText = styled((props) => <p {...props} />)`
  color: ${COLORS.light};
  margin: 0 0 ${SPACING.small} 0;
  padding: 0;
  text-indent: ${SPACING.large};
  font-size: ${(props) => props.size || '1.1rem'};
  line-height: 1.3rem;

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${TEXT.p};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    font-size: ${TEXT.p};
    text-indent: 0;
    line-height: 1.7rem;
  }
  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    font-size: ${TEXT.h4};
    line-height: 2.2rem;
  }
`

export const Subheading = styled.h2`
  margin-bottom: ${SPACING.small};
  padding: 0;
  font-size: ${TEXT.h4};
  color: ${COLORS.maize};

  // @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
  //   font-size: ${TEXT.h4};
  // }
`

export const ErrorText = styled((props) => <p {...props} />)`
  color: ${(props) => props.color || COLORS.error};
  font-size: ${(props) => props.size || '1.1rem'};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${(props) => props.size || TEXT.p};
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
    font-size: ${TEXT.h4};
    text-align: left;
  }
  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    font-size: 3rem;
  }
`

const AddColor = styled((props) => <span {...props} />)`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$size || 'inherit'};
`

export const ColoredText = ({ children, color = COLORS.violet }) => {
  return <AddColor $color={color}>{children}</AddColor>
}
