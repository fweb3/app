import { renderHook, act } from '@testing-library/react-hooks'
import { IComponentProps } from '../../components/component'
import { LoadingProvider } from './LoadingProvider'
import { useLoading } from './useLoading'

const wrapper = ({ children }: IComponentProps) => (
  <LoadingProvider>{children}</LoadingProvider>
)

describe('loading provider', () => {
  it('sets the loading state', () => {
    const { result } = renderHook(() => useLoading(), { wrapper })
    expect(result.current.isLoading).toBe(false)

    act(() => {
      result.current.setIsLoading(true)
    })
    expect(result.current.isLoading).toBe(true)
  })
})
