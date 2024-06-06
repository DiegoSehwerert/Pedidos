class Title extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
            `
      <style>
      h1{
        margin: 0;
        padding: 0;
        color: hsl(0, 0%, 100%);
        font-family: 'Roboto', sans-serif;
      }
      </style>
  
      <div class="top-bar-title">
        <h1>${this.title}</h1>
      </div>
      `
  }
}

customElements.define('title-component', Title)
