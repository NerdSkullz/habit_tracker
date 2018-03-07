/*
 * Detects if device has touch.
 * Returns Boolean
 */
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints !== 0;       // works on IE10/11 and Surface
};

/*
 * Detects if browser width is less than indicated size
 * returns Boolean
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export default function() {}
