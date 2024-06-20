class Crud extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =/* html */
            `
      <style>
        .crud {
          display: flex;
          gap: 5%;
          justify-content: space-between;
        }

        .table {
          flex: 1;
        }
        .form {
          flex: 2;
        }
      </style>
  
      <div class="crud">
        <div class="table">
          <slot name="table"></slot>
        </div>
        <div class="form">
          <slot name="form"></slot>
        </div>
      </div>
      `
  }
}

customElements.define('crud-component', Crud)
