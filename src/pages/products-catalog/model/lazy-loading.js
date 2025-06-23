const FALLBACK_SRC = '/fallback.svg'

export const setLazyLoading = function () {
  const images = document.querySelectorAll('img[data-src]')

  const lazyLoader = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const img = /** @type {HTMLImageElement} */ (entry.target)
      img.src = img.dataset.src || FALLBACK_SRC
      img.classList.remove('lazy')
      observer.unobserve(img)
    })
  })

  this.lazyLoader = lazyLoader

  images.forEach((img) => lazyLoader.observe(img))
}

export const cleanLazyLoading = function () {
  if (!this.lazyLoader) return
  this.lazyLoader.disconnect()
  this.lazyLoader = null
}
