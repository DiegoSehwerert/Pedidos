class MenuComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
        <style>
          .container{
            width: 100%;
            max-height: 90vh;
            min-height: 90vh;
            background-color: var(--light-pink);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 3rem;
          }
          .new-buy{
            width: 50%;
            height: 50%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
          }
          .new-buy span{
            padding: 1rem;
          }
          .older-buys{
            width: 50%;
            height: 50%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
          }
          .older-buys span{
            padding: 1rem;
          }
        </style>
        <div class="container">
          <div class="new-buy">
            <span>Nuevo pedido</span>
          </div>
          <div class="older-buys">
            <span>Pedidos anteriores</span>
          </div>
        </div>

      `
  }
}

customElements.define('menu-component', MenuComponent)
