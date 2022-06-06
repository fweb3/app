import { renderHook } from '@testing-library/react-hooks'
import { useDevice } from '../Device'

jest.unmock('../Device/useDevice')

describe('useDevice', () => {
  it('should return the correct device', () => {
    global.innerWidth = 1200
    const { result } = renderHook(() => useDevice())
    expect(result.current.device).toBe('desktop')
  })
  it('should return tablet for tablet size', () => {
    global.innerWidth = 1024
    const { result } = renderHook(() => useDevice())
    expect(result.current.device).toBe('tablet')
  })
  it('should return mobile for tablet size', () => {
    global.innerWidth = 480
    const { result } = renderHook(() => useDevice())
    expect(result.current.device).toBe('mobile')
  })
})
