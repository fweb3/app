import { renderHook, act } from '@testing-library/react-hooks'
import type { IComponentProps } from '../../types'
import { ErrorProvider } from '../Error/ErrorProvider'
import { useError } from '../Error/useError'

const mockSetIsLoading = jest.fn()

jest.mock('react-toastify')
jest.mock('../Loading', () => ({
  useLoading: () => ({
    setIsLoading: mockSetIsLoading,
    isLoading: false,
  }),
}))

const wrapper = ({ children }: IComponentProps) => (
  <ErrorProvider>{children}</ErrorProvider>
)

describe('error provider', () => {
  it('sets the error message', () => {
    const { result } = renderHook(() => useError(), { wrapper })
    expect(result.current.errorMessage).toBe('')

    act(() => {
      result.current.setErrorMessage('foo')
    })
    expect(result.current.errorMessage).toBe('foo')
  })

  it('calls toast and stops loading', () => {
    const { result } = renderHook(() => useError(), { wrapper })

    act(() => {
      result.current.errorWithToast('foo')
    })
    expect(mockSetIsLoading).toHaveBeenCalled()
  })
})
