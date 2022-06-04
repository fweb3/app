import { COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import type { IComponentProps } from '../../types'
import styled from 'styled-components'
import Link from 'next/link'

export const HeadingText = styled.h1`
  font-size: ${TEXT.h1};
  margin: 0;
  padding: 0;
  text-align: center;
  color: ${COLORS.violet};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    padding-top: 1rem;
    font-size: ${TEXT.h1};
  }
  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    font-size: ${TEXT.h1};
    text-align: left;
  }
  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    font-size: 3rem;
  }
`

export const Subheading = styled.h2`
  margin-bottom: ${SPACING.small};
  padding: 0;
  font-size: ${TEXT.h4};
  color: ${COLORS.maize};

  // @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
  //   font-size: ${TEXT.h4};
  //   background: green;
  // }
`

export const CommonText = styled((props) => <p {...props} />)`
  color: ${COLORS.light};
  margin: 0 0 ${SPACING.small} 0;
  padding: 0;
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

const StyledLink = styled.a`
  color: ${COLORS.teaGreen};
`

interface ILinkProps extends IComponentProps {
  href?: string
}

export const CommonLink = ({ href, children }: ILinkProps) => {
  return (
    <Link href={href || '#'} passHref={true}>
      <StyledLink target="_blank" rel="noreferrer">
        {children}
      </StyledLink>
    </Link>
  )
}

export const ErrorText = styled((props) => <p {...props} />)`
  color: ${(props) => props.color || COLORS.error};
  font-size: ${(props) => props.size || '1.1rem'};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${(props) => props.size || TEXT.p};
  }
`

const AddColor = styled((props) => <span {...props} />)`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$size || 'inherit'};
`

interface ITextProps extends IComponentProps {
  color?: string
}

export const ColoredText = ({
  children,
  color = COLORS.violet,
}: ITextProps) => {
  return <AddColor $color={color}>{children}</AddColor>
}
