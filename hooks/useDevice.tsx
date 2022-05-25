import { useEffect, useState } from 'react'

interface IDeviceInfo {
  device: string
  windowSize: {
    width?: number
    height?: number
  }
}

export const useDevice = (): IDeviceInfo => {
  const [device, setDevice] = useState<string>('')
  const [windowSize, setWindowSize] = useState({
    width: 1024,
    height: 900,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth
        if (width <= 480) {
          setDevice('mobile')
        } else if (width <= 1024) {
          setDevice('tablet')
        } else {
          setDevice('desktop')
        }
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return {
    device,
    windowSize,
  }
}
