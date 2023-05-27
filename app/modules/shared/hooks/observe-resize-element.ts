import { useEffect, useRef, useState } from 'react'

export const useObserveElementWidth = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0)
  const ref = useRef<T>(null)

  useEffect(() => {
    const copyRef = ref.current
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      copyRef && observer.unobserve(copyRef)
    }
  }, [])

  return {
    width,
    ref,
  }
}
