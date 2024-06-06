class ModalDestroy extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showModalDestroy', event => {
      this.openModal(event.detail.endpoint)
    })
    document.addEventListener('deleteElement', this.handleDeleteElement.bind(this))
    this.render()
  }

  handleDeleteElement (event) {
    this.deleteElement(event.detail.endpoint)
  }

  render () {
    this.shadow.innerHTML =
      ` <style>
                    * {
                    margin: 0;
                    padding: 0;
                }
                
                button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                color: hsl(0, 0%, 100%);
                font-family: 'Roboto', sans-serif;
                }

                input,
                label,
                select,
                textarea,
                li,
                span,
                p {
                color: hsl(0, 0%, 100%);
                font-family: 'Roboto', sans-serif;
                }

                .delete-modal {
                display: none;
                }

                .delete-modal-active {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                /* Fondo translúcido */
                z-index: 3;
                }

                .delete-modal-content {
                background-color: hsl(212, 48%, 45%);
                padding: 2rem 0;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                z-index: 4;
                }

                .delete-modal-content-buttons {
                box-sizing: border-box;
                padding-top: 1rem;
                display: flex;
                justify-content: space-between;
                padding-inline: 5rem;
                }

                .submit-button {
                background-color: rgba(0, 128, 0, 0.829);
                border: 2px solid white;
                }

                .submit-button button {
                width: 6rem;
                height: 2rem;
                }

                .denny-button {
                background-color: #d74242;
                border: 2px solid white;
                }

                .denny-button button {
                width: 6rem;
                height: 2rem;
                }
            </style> 
                <div class="delete-modal">
                    <div class="delete-modal-content">
                        <p>Estas seguro de que quieres eliminar este registro?</p>
                        <div class="delete-modal-content-buttons">
                        <div class="submit-button">
                            <button>
                            <span>
                            Submit
                            </span>
                            </button>
                        </div>
                        <div class="denny-button">
                            <button>
                            <span>
                            Denny
                            </span>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            `

    const deleteButtonModalDenny = this.shadow.querySelector('.denny-button')

    deleteButtonModalDenny.addEventListener('click', () => {
      this.closeModal()
    })
  }

  deleteElement (endpoint) {
    const modalContent = this.shadow.querySelector('.delete-modal-content')
    modalContent.addEventListener('click', async (event) => {
      // const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`, {

    })
  }

  openModal (endpoint) {
    const deleteModal = this.shadow.querySelector('.delete-modal')
    deleteModal.classList.add('delete-modal-active')
    const modalContent = this.shadow.querySelector('.delete-modal-content')
    modalContent.addEventListener('click', async (event) => {
      if (event.target.closest('.submit-button')) {
        const deleteModal = this.shadow.querySelector('.delete-modal')
        deleteModal.classList.remove('delete-modal-active')
        try {
          const response = await fetch(endpoint, {
            method: 'DELETE'
          })
          document.dispatchEvent(new CustomEvent('refresh-table'))
          await response.json()
        } catch (error) {
          console.error('Error:', error)
        }
      }
    })
  }

  closeModal () {
    const deleteModal = this.shadow.querySelector('.delete-modal')
    deleteModal.classList.remove('delete-modal-active')
  }
}

customElements.define('modal-destroy-component', ModalDestroy)
