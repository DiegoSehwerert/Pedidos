class Menu extends HTMLElement {
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
          a {
            color: inherit;      /* Hereda el color del texto del elemento padre */
            text-decoration: none; /* Elimina el subrayado */
            background-color: transparent; /* Hace que el fondo sea transparento */
            cursor: pointer;
            padding: 1rem; 
          }
          .menu{
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .menu-item{
            background-color: hsl(0, 0%, 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
          }

          span{
            font-family: "Roboto", sans-serif;
            font-weight: 700;
           
          }
        </style>
        <section class="menu">
          <div class="menu-item">
            <a href="/cliente/nuevo-pedido"><span>Nuevo pedido</span></a>
          </div>
          <div class="menu-item">
            <a href="/cliente/pedidos-anteriores"><span>Pedidos anteriores</span></a>
          </div>
        </section>

      `
  }
}

customElements.define('menu-component', Menu)
