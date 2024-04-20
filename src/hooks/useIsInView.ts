import * as React from 'react'

export function useIsInView (ref: React.RefObject<Element | null>): boolean {
  const [isIntersecting, setIntersecting] = React.useState(false)
  // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    setIntersecting(entry.isIntersecting)
  })

  React.useEffect(() => {
    const currentRef = ref.current
    if (currentRef !== null) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef !== null) {
        observer.unobserve(currentRef)
      }
    }
  }, [observer, ref])
  return isIntersecting
}
