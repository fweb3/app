import { render, screen } from '@testing-library/react'
import { IComponentProps } from '../../types'
import IndexPage from '../index.page'

jest.mock('../../components/GameView/ContentSection', () => ({
  ContentSection: () => <div>foo</div>,
}))

jest.mock('../../components/Chest/ChestSection', () => ({
  ChestSection: () => <div>bar</div>,
}))

jest.mock('../../components/shared/Layout', () => ({
  Layout: (props: IComponentProps) => <div>{props.children}</div>,
}))

describe('app', () => {
  it('renders without crashing', () => {
    render(<IndexPage />)
    expect(screen.getByText('foo')).toBeTruthy()
    expect(screen.getByText('bar')).toBeTruthy()
  })
})
