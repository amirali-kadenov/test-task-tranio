/**
 * Debounce function for performance optimization
 * Delays function execution until after wait milliseconds have elapsed
 * since the last time it was invoked
 *
 * @param {(...args: unknown[]) => void} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {(...args: unknown[]) => void} Debounced function
 */
export const debounce = (fn, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
