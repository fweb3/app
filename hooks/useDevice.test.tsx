import { renderHook } from '@testing-library/react-hooks'
import { useDevice } from './useDevice'

describe('useDevice', () => {
  it('should return the correct device', () => {
    const { result } = renderHook(() => useDevice())
    expect(result.current.device).toBe('desktop')
  })
})
