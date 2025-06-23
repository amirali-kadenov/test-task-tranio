/**
 * Format price with currency using Intl.NumberFormat
 *
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price)
}

/**
 * @typedef {import('../../model/type').ProductImage} ProductImage
 */

/**
 * Get responsive image URL based on screen size
 *
 * @param {ProductImage} imageObj - Image object with different sizes
 * @returns {string} Appropriate image URL for current screen size
 */
export const getResponsiveImageUrl = (imageObj) => {
  const width = window.innerWidth
  if (width <= 768) return imageObj.mobile
  if (width <= 1024) return imageObj.tablet
  return imageObj.desktop
}
