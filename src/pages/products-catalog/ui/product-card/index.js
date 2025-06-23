import { formatPrice } from './lib'
import { ProductCardImage } from './ui/product-card-image'
import { ProductCardStars } from './ui/product-card-stars'
import './ui/product-card.css'

export const ProductCard = ({ product, style }) => {
  return /* html */ `
    <div
      class="product-card"
      style="${style}"
    >
      ${new ProductCardImage(product)}

      <div class="product-info">
        <div class="product-info-body">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
        </div>
        <div class="product-info-footer">
          ${ProductCardStars(product.rating)}
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  `
}
