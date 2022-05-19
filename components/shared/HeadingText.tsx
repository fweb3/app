import styled from 'styled-components'

const StyledHeading = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
`

export const HeadingText = ({ children }) => {
  return <StyledHeading>{children}</StyledHeading>
}
