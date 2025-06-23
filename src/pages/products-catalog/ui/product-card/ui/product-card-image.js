import { Component } from '@/shared/lib/components'
import { getResponsiveImageUrl } from '../lib'
import './product-card-image.css'

export class ProductCardImage extends Component {
  constructor(product) {
    super({
      state: {
        src: getResponsiveImageUrl(product.image),
      },
      className: 'product-image',
      onMount() {
        const img = this.getContainer()?.querySelector('img')
        if (!img) return

        const handleError = () =>
          this.setState({
            src: '/placeholder.svg',
          })

        img.addEventListener('error', handleError)

        return () => {
          img.removeEventListener('error', handleError)
        }
      },
      render() {
        return /* html */ `
          <img
            alt="${product.name}"
            loading="lazy"
            height="300"
            width="auto"
            src="${this.state.src}"
          />
        `
      },
    })
  }
}
