class TitleComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = /* html */`
        <style>
          h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
          }
        </style>
        <div class="top-bar-title">
          <h1>${this.title}</h1>
        </div>
      `
  }
}

customElements.define('title-component', TitleComponent)
