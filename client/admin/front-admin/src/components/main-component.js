class Main extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =/* html */
            `
      <style>
      </style>
  
      <main>
        <slot title-"crud"></slot>
      </main>
      `
  }
}

customElements.define('main-component', Main)
