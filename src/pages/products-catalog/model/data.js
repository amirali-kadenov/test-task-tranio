export const getProducts = async function () {
  this.setState({
    loading: true,
    error: null,
  })

  try {
    const response = await fetch('./data.json')
    const data = await response.json()

    this.setState({
      products: data.products,
      categories: data.categories,
      loading: false,
    })

    filterProducts.call(this)
  } catch (error) {
    console.error('Error loading products:', error)

    this.setState({
      error: error.message,
      loading: false,
    })
  }
}

export const filterProducts = function () {
  let filtered = [...this.state.products]

  if (this.state.filters.category) {
    filtered = filtered.filter(
      (product) => product.category === this.state.filters.category
    )
  }

  if (this.state.filters.minPrice || this.state.filters.maxPrice) {
    filtered = filtered.filter(
      (product) =>
        product.price >= this.state.filters.minPrice &&
        product.price <= this.state.filters.maxPrice
    )
  }

  if (this.state.filters.sortBy) {
    filtered.sort((a, b) => {
      switch (this.state.filters.sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'ru')
      }
    })
  }

  this.setState({ filteredProducts: filtered })
}
