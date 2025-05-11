
import * as React from "react"

const MOBILE_BREAKPOINT = 640 // Changed from 768px to 640px (sm breakpoint in Tailwind)

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Use the appropriate event listener method
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile)
    } else {
      // For older browsers
      window.addEventListener('resize', checkMobile)
    }
    
    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkMobile)
      } else {
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  // Default to false if we don't know yet, to prevent layout shifts
  return isMobile === null ? false : isMobile
}
