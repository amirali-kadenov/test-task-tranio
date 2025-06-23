import { filterProducts } from './data'

const CATEGORY = 'category'
const MIN_PRICE = 'minPrice'
const MAX_PRICE = 'maxPrice'
const SORT_BY = 'sortBy'

export const updateUrlParams = function () {
  const urlParams = new URLSearchParams()

  if (this.state.filters.category) {
    urlParams.set(CATEGORY, this.state.filters.category)
  }

  if (this.state.filters.minPrice != null) {
    urlParams.set(MIN_PRICE, this.state.filters.minPrice.toString())
  }

  if (this.state.filters.maxPrice != null) {
    urlParams.set(MAX_PRICE, this.state.filters.maxPrice.toString())
  }

  if (this.state.filters.sortBy !== 'name') {
    urlParams.set(SORT_BY, this.state.filters.sortBy)
  }

  const pathname = window.location.pathname
  const params = urlParams.toString()
  const newURL = params ? `${pathname}?${params}` : pathname

  window.history.pushState({}, '', newURL)
}

export const getParams = function () {
  const urlParams = new URLSearchParams(window.location.search)

  const category = urlParams.get(CATEGORY)
  const minPrice = String(urlParams.get(MIN_PRICE))
  const maxPrice = String(urlParams.get(MAX_PRICE))
  const sortBy = urlParams.get(SORT_BY)

  const filters = {
    category: category || '',
    minPrice: Number.parseFloat(minPrice) || 0,
    maxPrice: Number.parseFloat(maxPrice) || null,
    sortBy: sortBy || 'name',
  }

  return filters
}

export const getFiltersFromParams = function () {
  const filters = getParams()
  this.setState({ filters })
}

export const updateParams = function (filters) {
  this.setState({
    filters: {
      ...this.state.filters,
      ...filters,
    },
  })
  updateUrlParams.call(this)
  filterProducts.call(this)
}
