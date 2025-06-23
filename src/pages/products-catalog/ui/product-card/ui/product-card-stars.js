import './product-card-stars.css'

/**
 * @param {number} rating
 */
export const ProductCardStars = (rating) => {
  let stars = ''

  for (let i = 1; i <= 5; i++) {
    const fillPercent = Math.max(0, Math.min(100, (rating - (i - 1)) * 100))
    const gradientId = `star-gradient-${i}-${rating.toString().replace('.', '-')}`

    stars += /* html */ `
      <svg
        class="star"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient
            id="${gradientId}"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stop-color="#ffd700"
            />
            <stop
              offset="${fillPercent}%"
              stop-color="#ffd700"
            />
            <stop
              offset="${fillPercent}%"
              stop-color="#e0e0e0"
            />
            <stop
              offset="100%"
              stop-color="#e0e0e0"
            />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#${gradientId})"
        />
      </svg>
    `
  }

  return /* html */ `
    <div class="star-rating">
      <div class="stars">${stars}</div>
      <span class="rating-text">(${rating})</span>
    </div>
  `
}
