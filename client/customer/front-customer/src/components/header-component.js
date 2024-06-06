class HeadersComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title-name')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
        <style>
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container{
            width: 100%;
            max-height: 10vh;
            min-height: 10vh;
            background-color: black;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
          }
        </style>
        <div class="container">
          <slot name="title-component">
            <title-component title=${this.title} ></title-component>
          </slot>
          <slot name="home-button-component">
            <home-button-component></home-button-component>
          </slot>
        </div>

      `
  }
}

customElements.define('header-component', HeadersComponent)
