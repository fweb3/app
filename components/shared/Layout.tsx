import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { HtmlHead } from './HtmlHead'
import { COLORS } from '../styles'
import { Header } from './Header'
import { Footer } from './Footer'

const MainGrid = styled.div`
  display: grid;
  background: ${COLORS.background};
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr 100px;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer theme="dark" />
      <HtmlHead />
      <MainGrid>
        <Header />
        {children}
        <Footer />
      </MainGrid>
    </>
  )
}
