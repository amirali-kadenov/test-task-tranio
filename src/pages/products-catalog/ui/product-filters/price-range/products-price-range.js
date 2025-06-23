import { Component } from '@/shared/lib/components'
import {
  MAX_PRICE_ID,
  MAX_SLIDER_ID,
  MIN_PRICE_ID,
  MIN_SLIDER_ID,
  PriceRangeModel,
  SLIDER_RANGE_ID,
} from './model'
import './products-price-range.css'

export class ProductsPriceRange extends Component {
  constructor({
    minPrice,
    maxPrice,
    currentMinPrice,
    currentMaxPrice,
    onChange,
  }) {
    super({
      className: 'control-group',
      onMount() {
        this.model.init()
        return () => this.model.cleanupEvents()
      },
      render() {
        const minPercent = this.model.getMinPercent(currentMinPrice)
        const maxPercent = this.model.getMaxPercent(currentMaxPrice)

        return /* html */ `
            <label
            for="minPrice"
            class="price-label"
            >Цена</label
          >

          <div class="slider-wrapper">
            <div class="slider-track">
              <div
                class="slider-range"
                id="${SLIDER_RANGE_ID}"
                style="left: ${minPercent}%; width: ${maxPercent -
                minPercent}%;"
              ></div>
            </div>
            <input
              type="range"
              class="slider-input"
              id="${MIN_SLIDER_ID}"
              min="${minPrice}"
              max="${maxPrice}"
              value="${currentMinPrice}"
              step="${maxPrice / 100}"
            />
            <input
              type="range"
              class="slider-input"
              id="${MAX_SLIDER_ID}"
              min="${minPrice}"
              max="${maxPrice}"
              value="${currentMaxPrice}"
              step="${maxPrice / 100}"
            />
          </div>

          <div class="price-values">
            <input
              type="text"
              class="price-input input"
              id="${MIN_PRICE_ID}"
              value="${currentMinPrice}"
            />
            <div class="price-separator">—</div>
            <input
              type="text"
              class="price-input input"
              id="${MAX_PRICE_ID}"
              value="${currentMaxPrice}"
            />
          </div>
      `
      },
    })

    this.model = new PriceRangeModel({
      minPrice,
      maxPrice,
      onChange,
      containerId: this.id,
    })
  }
}
