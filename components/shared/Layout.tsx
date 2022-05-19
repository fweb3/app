import { ToastContainer } from 'react-toastify'
import { HtmlHead } from './HtmlHead'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} theme="dark" />
      <HtmlHead />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
