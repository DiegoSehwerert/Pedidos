class SaveModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('save-notification', (event) => {
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
            </style>
         `
  }

  openModal (event) {
  }
}

customElements.define('save-modal-component', SaveModal)
