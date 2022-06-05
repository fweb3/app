import { render, screen } from '@testing-library/react'
import { IComponentProps } from '../../types'
import { Layout } from './Layout'

jest.mock('./ErrorBanner', () => ({
  ErrorBanner: () => <></>,
}))

jest.mock('./Footer', () => ({
  Footer: () => <></>,
}))

jest.mock('../Header/Header', () => ({
  Header: () => <></>,
}))

jest.mock('./HtmlHead', () => ({
  HtmlHead: () => <></>,
}))

const renderComponent = (props: IComponentProps) =>
  render(<Layout {...props} />)

describe('<Layout />', () => {
  it('renders without crashing', () => {
    renderComponent({ children: <>foo</> })
    expect(screen.getByTestId('layout-container')).toBeInTheDocument()
  })
})
