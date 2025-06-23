import { debounce } from '@/shared/lib/debounce'
import { NodesMap } from '@/shared/lib/nodes-map'

export const MIN_SLIDER_ID = 'minSlider'
export const MAX_SLIDER_ID = 'maxSlider'
export const MIN_PRICE_ID = 'minPrice'
export const MAX_PRICE_ID = 'maxPrice'
export const SLIDER_RANGE_ID = 'sliderRange'
export const CONTAINER_ID = 'products-price-range'

export class PriceRangeModel {
  #nodes = new NodesMap()

  constructor({ minPrice, maxPrice, onChange, containerId }) {
    this.min = minPrice
    this.max = maxPrice
    this.onChange = onChange
    this.containerId = containerId
    this.init()
  }

  get container() {
    return this.#nodes.get(this.containerId)
  }
  get minSlider() {
    return this.#nodes.get(MIN_SLIDER_ID)
  }
  get maxSlider() {
    return this.#nodes.get(MAX_SLIDER_ID)
  }
  get minPrice() {
    return this.#nodes.get(MIN_PRICE_ID)
  }
  get maxPrice() {
    return this.#nodes.get(MAX_PRICE_ID)
  }
  get sliderRange() {
    return this.#nodes.get(SLIDER_RANGE_ID)
  }

  init() {
    this.updateSliderRange()
    this.bindEvents()
  }

  bindEvents() {
    this.debouncedSliderChangeHandler = debounce(
      this.handleSliderChange.bind(this),
      300
    )

    this.handleInputEvents = this.handleInputEvents.bind(this)
    this.handleChangeEvents = this.handleChangeEvents.bind(this)

    this.container?.addEventListener('input', this.handleInputEvents)
    this.container?.addEventListener('change', this.handleChangeEvents)
  }

  cleanupEvents() {
    this.container?.removeEventListener('input', this.handleInputEvents)
    this.container?.removeEventListener('change', this.handleChangeEvents)
  }

  handleInputEvents(event) {
    if (!event.target) return

    const targetId = event.target.id

    switch (targetId) {
      case MIN_SLIDER_ID:
        this.handleMinSlider()
        break

      case MAX_SLIDER_ID:
        this.handleMaxSlider()
        break
    }
  }

  handleChangeEvents(event) {
    if (!event.target) return

    const targetId = event.target.id

    switch (targetId) {
      case MIN_SLIDER_ID:
      case MAX_SLIDER_ID:
        this.debouncedSliderChangeHandler()
        break

      case MIN_PRICE_ID:
        this.handleMinPriceChange()
        break

      case MAX_PRICE_ID:
        this.handleMaxPriceChange()
        break
    }
  }

  handleSliderChange() {
    const minVal = this.format(this.minSlider.value)
    const maxVal = this.format(this.maxSlider.value)

    this.onChange({ min: minVal, max: maxVal })
  }

  handlePriceChange() {
    const minVal = this.format(this.minPrice.value)
    const maxVal = this.format(this.maxPrice.value)

    this.onChange({ min: minVal, max: maxVal })
  }

  handleMinPriceChange() {
    const value = this.format(this.minPrice.value)
    const maxVal = this.format(this.maxSlider.value)

    if (value >= maxVal) {
      this.minPrice.value = this.format(maxVal)
      this.minSlider.value = maxVal
    } else if (value < this.min) {
      this.minPrice.value = this.format(this.min)
      this.minSlider.value = this.min
    } else {
      this.minSlider.value = value
    }

    this.updateSliderRange()
    this.handlePriceChange()
  }

  handleMaxPriceChange() {
    const value = this.format(this.maxPrice.value)
    const minVal = this.format(this.minSlider.value)

    if (value < minVal) {
      this.maxPrice.value = this.format(minVal)
      this.maxSlider.value = minVal
    } else if (this.max && value > this.max) {
      this.maxPrice.value = this.format(this.max)
      this.maxSlider.value = this.max
    } else {
      this.maxSlider.value = value
    }

    this.updateSliderRange()
    this.handlePriceChange()
  }

  handleMinSlider() {
    const minVal = this.format(this.minSlider.value)
    const maxVal = this.format(this.maxSlider.value)

    if (minVal >= maxVal) {
      this.minSlider.value = maxVal
    }

    this.minPrice.value = this.format(this.minSlider.value)

    this.updateSliderRange()
  }

  handleMaxSlider() {
    const minVal = this.format(this.minSlider.value)
    const maxVal = this.format(this.maxSlider.value)

    if (maxVal <= minVal) {
      this.maxSlider.value = minVal
    }

    this.maxPrice.value = this.format(this.maxSlider.value)

    this.updateSliderRange()
  }

  updateSliderRange() {
    if (!this.sliderRange || !this.minSlider || !this.maxSlider) return

    const minVal = this.minSlider.value
    const maxVal = this.maxSlider.value
    const minPercent = this.getMinPercent(minVal)
    const maxPercent = this.getMaxPercent(maxVal)

    this.sliderRange.style.left = minPercent + '%'
    this.sliderRange.style.width = maxPercent - minPercent + '%'
  }

  format(value) {
    return Number(Number(value).toFixed(2))
  }

  getMinPercent(minVal) {
    return ((minVal - this.min) / (this.max - this.min)) * 100
  }

  getMaxPercent(maxVal) {
    return ((maxVal - this.min) / (this.max - this.min)) * 100
  }
}
