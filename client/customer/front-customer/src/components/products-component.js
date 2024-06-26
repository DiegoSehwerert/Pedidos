import { store } from '../redux/store' // Importa el store de Redux
import { updateCart } from '../redux/cart-slice'
import { showOrderComponent } from '../redux/show-order-component'

class Products extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.data = data
    console.log('products', data)
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
        <style>

          :host{
            height: 100%;
            width: 100%; 
          }

          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Roboto", sans-serif;
            Z-index: 1;
          }

          .products{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 90%;
            max-height: 90%;
            margin-bottom: 2rem;
            overflow-y: scroll;
            width: 100%;
          }

          .products::-webkit-scrollbar{
            width: 0;
          }

          .products::-webkit-scrollbar-thumb{
            background-color: hsla(0, 0%, 100%, 0.2);
            border-radius: 1rem;
          }

          .product{
            align-items: center;
            border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);  
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(2, 1fr);
            padding-bottom: 1rem;
            width: 100%;
          }

          .product-title h3, .product-specifications span, .product-price span{
            color: hsla(0, 0%, 100%);
            font-weight: 700;
          }

          .product-price, .plus-minus-container{
            align-items: center;
            display: flex;
            justify-content: flex-end;
          }

          .plus-minus-container{
            height: 2rem;
          }

          .plus-minus-quantity{
            align-items: center;
            background-color: hsla(0, 0%, 0%, 0.2);
            display: flex;
            justify-content: center;
            height: 100%;
            width: 2rem;
          }

          .plus-minus-quantity span{
            color: hsla(0, 0%, 100%);
            font-weight: 700;
          }

          .plus-minus-container button{
            font-weight: 700;
            height: 100%;
            padding: 0.3rem 1rem;
          }
        </style>

        <section class="products">
         
        </section>

        
    `

    const products = this.shadowRoot.querySelector('.products')

    this.data.forEach(product => {
      const productContainer = document.createElement('div')
      productContainer.classList.add('product')
      products.appendChild(productContainer)
    
      const titleContainer = document.createElement('div')
      titleContainer.classList.add('product-title')
      productContainer.appendChild(titleContainer)
    
      const title = document.createElement('h3')
      title.textContent = product.name
      titleContainer.appendChild(title)
    
      const priceContainer = document.createElement('div')
      priceContainer.classList.add('product-price')
      productContainer.appendChild(priceContainer)
    
      // Asegúrate de que el producto tenga un precio
      if (product.price) {
        const price = document.createElement('span')
        price.textContent = `${product.price.basePrice}€`
        priceContainer.appendChild(price)
      }
    
      const specificationsContainer = document.createElement('div')
      specificationsContainer.classList.add('product-specifications')
      productContainer.appendChild(specificationsContainer)
    
      const specifications = document.createElement('span')
      specifications.textContent = `${product.units}u, ${product.measurement}${product.measurementUnit}`
      specificationsContainer.appendChild(specifications)
    
      const plusMinusContainer = document.createElement('div')
      plusMinusContainer.classList.add('plus-minus-container')
      productContainer.appendChild(plusMinusContainer)
    
      let plusMinusButton = document.createElement('div')
      plusMinusButton.classList.add('plus-minus-button')
      plusMinusContainer.appendChild(plusMinusButton)
    
      const minusButton = document.createElement('button')
      minusButton.textContent = '-'
      plusMinusButton.appendChild(minusButton)
    
      const plusMinusQuantity = document.createElement('div')
      plusMinusQuantity.classList.add('plus-minus-quantity')
      plusMinusContainer.appendChild(plusMinusQuantity)
    
      const quantity = document.createElement('span')
      quantity.textContent = '0'
      plusMinusQuantity.appendChild(quantity)
    
      plusMinusButton = document.createElement('div')
      plusMinusButton.classList.add('plus-minus-button')
      plusMinusContainer.appendChild(plusMinusButton)
    
      const plusButton = document.createElement('button')
      plusButton.textContent = '+'
      plusMinusButton.appendChild(plusButton)
    })

    products.addEventListener('click', event => {
      if (event.target.closest('.plus-minus-button')) {
        const grandParentElement = event.target.closest('.plus-minus-button').parentElement.parentElement.parentElement
        const productElements = Array.from(grandParentElement.querySelectorAll('.product'))
        const clickedProduct = event.target.closest('.product')
        const clickedProductIndex = productElements.indexOf(clickedProduct)
        const matchingData = this.data[clickedProductIndex]
        const plusButton = event.target.closest('.plus-minus-button button').textContent === '+'
        const minusButton = event.target.closest('.plus-minus-button button').textContent === '-'

        const quantityElement = clickedProduct.querySelector('.plus-minus-quantity span')

        if (plusButton) {
          quantityElement.textContent = parseInt(quantityElement.textContent) + 1
        }
        if (minusButton) {
          if (parseInt(quantityElement.textContent) > 0) {
            quantityElement.textContent = parseInt(quantityElement.textContent) - 1
          }
        }

        const matchingDataCopy = Object.assign({}, matchingData)

        matchingDataCopy.quantity = parseInt(quantityElement.textContent)

        store.dispatch(updateCart(matchingDataCopy))
      }
    })
  }
}

customElements.define('products-component', Products)
