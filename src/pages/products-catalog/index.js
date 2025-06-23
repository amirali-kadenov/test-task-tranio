import { Component } from '@/shared/lib/components'
import { getProducts } from './model/data'
import { setEvents, cleanupEvents } from './model/events'
import { getFiltersFromParams, getParams } from './model/params'
import { ProductFilters } from './ui/product-filters/products-filters'
import { ProductsList } from './ui/product-list/products-list'

export class ProductCatalog extends Component {
  constructor() {
    super({
      className: 'product-catalog',
      state: {
        products: [],
        filteredProducts: [],
        categories: [],
        filters: getParams(),
        loading: true,
        error: null,
      },
      render: () => {
        return /* html */ `
          ${ProductFilters(this)}
          ${ProductsList(this.state)}
        `
      },
      onMount: () => {
        getProducts.call(this)
        getFiltersFromParams.call(this)

        setEvents.call(this)
        return cleanupEvents.bind(this)
      },
    })
  }
}
