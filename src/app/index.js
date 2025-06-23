import './styles/reset.css'
import './styles/base.css'
import './styles/variables.css'
import { ProductCatalog } from '@/pages/products-catalog'

export const App = () => {
  return /* html */ `
    <div class="app container">
      <header class="header">
        <h1 class="header__title">Каталог товаров</h1>
      </header>

      <main class="main">${new ProductCatalog()}</main>
    </div>
  `
}
