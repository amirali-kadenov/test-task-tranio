import { ProductCard } from '../product-card'
import './product-list.css'

export const ProductsList = ({ loading, error, filteredProducts }) => {
  if (loading) {
    return /* html */ `
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    `
  }

  if (error) {
    return /* html */ `
      <div class="no-products">
        <h3>Ошибка загрузки</h3>
        <p>Не удалось загрузить данные о товарах</p>
      </div>
    `
  }

  if (filteredProducts.length === 0) {
    return /* html */ `
      <div class="no-products">
        <h3>Товары не найдены</h3>
        <p>Попробуйте изменить параметры фильтрации</p>
      </div>
    `
  }

  return /* html */ `
    <div class="products-grid">
      ${filteredProducts
        .map((product, index) =>
          ProductCard({
            product,
            style: `animation-delay: ${index * 0.1}s`,
          })
        )
        .join('')}
    </div>
  `
}
