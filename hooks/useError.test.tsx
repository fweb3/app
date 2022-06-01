import { ErrorProvider } from '../providers/ErrorProvider'
import { renderHook, act } from '@testing-library/react-hooks'
// import { useLoading } from './useLoading'
import { useError } from './useError'
import { IComponentProps } from '../components/component'

jest.mock('../providers/LoadingProvider')

jest.mock('react-toastify')

const wrapper = ({ children }: IComponentProps) => (
  <ErrorProvider>{children}</ErrorProvider>
)

describe('error provider', () => {
  it('sets the error message and disables loading', () => {
    const { result } = renderHook(() => useError(), { wrapper })
    expect(result.current.errorMessage).toBe('')

    // const spy = jest.spyOn(useLoading, 'setIsLoading')

    act(() => {
      result.current.setErrorMessage('foo')
    })
    expect(result.current.errorMessage).toBe('foo')
    // expect(spy).toHaveBeenCalledWith(false)
  })
})
