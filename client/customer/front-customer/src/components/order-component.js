import isEqual from 'lodash-es/isEqual'
import { store } from '../redux/store' // Importa el store de Redux
import { showOrderComponent } from '../redux/show-order-component'
// import { showCheckout } from '../redux/show-checkout'

class Order extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.data = []
    this.unsubscribe = null
  }

  connectedCallback () {
    this.render()
    this.unsubscribe = store.subscribe(() => {
      this.updateVisibility()
      this.updateCart()
    })
  }

  disconnectedCallback () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  updateVisibility () {
    const state = store.getState()
    if (state.orderComponent.orderComponentVisible) {
      this.shadowRoot.querySelector('.order').classList.add('active')
    } else {
      this.shadowRoot.querySelector('.order').classList.remove('active')
    }
  }

  updateCart () {
    const currentState = store.getState()
    console.log(currentState.cartProducts)

    if (!isEqual(currentState.cart.cartProducts, this.data)) {
      this.data = currentState.cart.cartProducts
      this.renderOrder(this.data)
    }
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
          }

          .header{
            width: 100%;
            max-height: 8vh;
            background-color: black;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
          }

          .back-button{
            width: 2rem;
            height: 2rem;
            fill: white;
            cursor: pointer;
          }

          .order{
            background-color:hsl(226, 63%, 45%);
            display: flex;
            flex-direction: column;
            gap: 2rem;
            height: 100%;
            position: fixed;
            overflow: hidden;
            top: 0;
            right: -${window.innerWidth}px;
            width: ${window.innerWidth}px;
            transition: right 0.5s; 
            z-index: 5000;
          }

          .order.active{
            right: 0;
          }

          .products{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 64%;
            max-height: 64%;
            overflow-y: scroll;
            padding: 1rem 2rem;
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

          .product-title h3, .product-specifications span, .product-total-price span, .product-quantity span{
            color: hsla(0, 0%, 100%);
            font-weight: 700;
          }

          .product-total-price, .product-quantity{
            align-items: center;
            display: flex;
            justify-content: flex-end;
          }

          .resume{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            width: 100%;
            padding: 0 2rem;
          }

          .checkout-button{
            display: flex;
            justify-content: center;
            width: 100%;
          }
          
          .checkout-button button{
            background-color: hsl(0, 0%, 100%);
            border: none;
            border-radius: 30px;
            font-family: "Roboto", sans-serif;
            font-weight: 700;
            outline: none;
            padding: 1rem;
            width: 80%;
          }

          .tax-message{
            grid-column: 1 / -1;
          }

          .total span, .total-price span, .tax-message span{
            color: hsla(0, 0%, 100%, 0.7);
            font-weight: 700;
          }

          .total span{
            font-size: 1.5rem;
          }

          .total-price{
            grid-column: 2 / -1;
            text-align: right;
          }

          .total-price span{
            font-size: 1.5rem;
          }
          
          .order-button{
            display: flex;
            justify-content: center;
            width: 100%;
            top: 20rem;
            position: relative;
          }

          .order-button button{
            background-color: hsl(0, 0%, 100%);
            border: none;
            border-radius: 30px;
            font-family: "Roboto", sans-serif;
            font-weight: 700;
            outline: none;
            padding: 1rem;
            width: 80%;
          }
        </style>
       
        <section class="order">
          <div class="header">
            <title-component title="Pedidos" element="h1" font-size="1.5rem" color="hsl(0, 0%, 100%)"></title-component>
            <div class="back-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>keyboard-backspace</title><path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" /></svg>
            </div>
          </div>
          <div class="products">
          
          </div>

          <div class="resume">
            <div class="total">
              <span>Total</span>
            </div>
            <div class="total-price">
              <span></span>
            </div>
            <div class="tax-message">
              <span>Impuestos no incluidos</span>
            </div>
          </div>

          <div class="checkout-button">
            <button>Ver pedido</button>
          </div>
        </section>
        <div class="order-button">
          <button>Ver pedido</button>
        </div>
    `

    const orderButton = this.shadowRoot.querySelector('.order-button button')
    orderButton.addEventListener('click', () => {
      store.dispatch(showOrderComponent())
    })

    const checkoutButton = this.shadowRoot.querySelector('.checkout-button button')
    checkoutButton.addEventListener('click', () => {

    })
  }

  renderOrder () {
    const products = this.shadowRoot.querySelector('.products')
    products.innerHTML = ''
    const total = this.data.reduce((acc, product) => acc + product.price * product.quantity, 0)
    const totalElement = this.shadowRoot.querySelector('.total-price span')
    totalElement.textContent = `${total}€`

    this.data.forEach(product => {
      const productContainer = document.createElement('div')
      productContainer.classList.add('product')
      products.appendChild(productContainer)

      const titleContainer = document.createElement('div')
      titleContainer.classList.add('product-title')
      productContainer.appendChild(titleContainer)

      const title = document.createElement('h3')
      title.textContent = product.title
      titleContainer.appendChild(title)

      const totalPriceContainer = document.createElement('div')
      totalPriceContainer.classList.add('product-total-price')
      productContainer.appendChild(totalPriceContainer)

      const price = document.createElement('span')
      price.textContent = `${product.price}€`
      totalPriceContainer.appendChild(price)

      const specificationsContainer = document.createElement('div')
      specificationsContainer.classList.add('product-specifications')
      productContainer.appendChild(specificationsContainer)

      const specifications = document.createElement('span')
      specifications.textContent = `${product.unities}u, ${product.weight}${product.measurementWeight}`
      specificationsContainer.appendChild(specifications)

      const quantityContainer = document.createElement('div')
      quantityContainer.classList.add('product-quantity')
      productContainer.appendChild(quantityContainer)

      const quantity = document.createElement('span')
      quantity.textContent = `${product.quantity} x ${product.price}€`
      quantityContainer.appendChild(quantity)
    })
  }
}

customElements.define('order-component', Order)
