import { renderHook, act } from '@testing-library/react-hooks'
import { IComponentProps } from '../../components/component'
import { ErrorProvider } from './ErrorProvider'
import { useLoading } from '../Loading'
import { useError } from './useError'

const mockSetIsLoading = jest.fn()

jest.mock('../Loading/useLoading')
jest.mock('react-toastify')

const mockUseLoading = useLoading as jest.MockedFunction<typeof useLoading>

mockUseLoading.mockReturnValue({
  isLoading: true,
  setIsLoading: mockSetIsLoading,
})

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
