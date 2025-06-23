import { CATEGORY, SORT } from '../../model/constants'
import { updateParams } from '../../model/params'
import { ProductsPriceRange } from './price-range/products-price-range'
import { Option } from './products-filters-option'
import './product-filters.css'

const SORT_OPTIONS = [
  { value: 'name', text: 'По названию' },
  { value: 'price-asc', text: 'По цене (возр.)' },
  { value: 'price-desc', text: 'По цене (убыв.)' },
  { value: 'rating', text: 'По рейтингу' },
]

export const ProductFilters = function (productsCatalog) {
  const { filters, categories, products } = productsCatalog.state

  const productsPrices = products.reduce(
    (result, product) => {
      result.min = Math.min(result.min, product.price)
      result.max = Math.max(result.max, product.price)
      return result
    },
    { min: 0, max: 0 }
  )

  const handlePriceRangeChange = ({ min, max }) => {
    const newFilters = {}
    if (min != null) newFilters.minPrice = min
    if (max != null) newFilters.maxPrice = max
    updateParams.call(productsCatalog, newFilters)
  }

  return /* html */ `
    <div class="catalog-filters">
      <div class="controls">
        <div class="control-group">
          <label for="${SORT}">Сортировка</label>
          <select
            id="${SORT}"
            class="sort-select input"
            value="${filters.sortBy}"
          >
            ${SORT_OPTIONS.map((option) =>
              Option({
                selected: filters.sortBy === option.value,
                value: option.value,
                text: option.text,
              })
            ).join('')}
          </select>
        </div>

        <div class="control-group">
          <label for="${CATEGORY}">Категория</label>
          <select
            id="${CATEGORY}"
            class="category-select input"
            value="${filters.category}"
          >
            ${Option({
              selected: filters.category === '',
              value: '',
              text: 'Все категории',
            })}
            ${categories
              .map((category) =>
                Option({
                  selected: filters.category === category,
                  value: category,
                  text: category,
                })
              )
              .join('')}
          </select>
        </div>

        ${new ProductsPriceRange({
          minPrice: productsPrices.min,
          maxPrice: productsPrices.max,
          currentMinPrice: filters.minPrice || productsPrices.min,
          currentMaxPrice: filters.maxPrice || productsPrices.max,
          onChange: handlePriceRangeChange,
        })}
      </div>
    </div>
    `
}
