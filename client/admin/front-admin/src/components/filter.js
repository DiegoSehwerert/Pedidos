class Filter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('showModalFilter', event => {
      this.openModal()
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>

            button {
            background: transparent;
            border: none;
            cursor: pointer;
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
            .filter-modal {
                display: none;
            }
            
            .filter-modal-active {
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
            
            .filter-modal-content {
                background-color: hsl(212, 48%, 45%);
                margin: 0;
                padding: 0;
                padding: 2rem 0;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                z-index: 4;
              }
              
              .filter-modal-form {
                /* background-color: red; */
                box-sizing: border-box;
                text-align: left;
                padding: 0 2rem;
              }
              
              .filter-modal-form input {
                background-color: rgb(93, 159, 190);
                /* padding: 0 2rem; */
                border-bottom: 2px solid white;
                ;
              
              }
              
              .filter-modal-buttons {
                /* background-color: lightgreen; */
                box-sizing: border-box;
                padding-top: 0.2rem;
                display: flex;
                justify-content: space-between;
                padding-inline: 5rem;
              }
              
              .filter-modal-accept-button {
                background-color: rgba(0, 128, 0, 0.829);
                border: 2px solid white;
              }
              
              .filter-modal-accept-button button {
                width: 6rem;
                height: 2rem;
              }
              
              .filter-modal-decline-button {
                background-color: #d74242;
                border: 2px solid white;
              }
              
              .filter-modal-decline-button button {
                width: 6rem;
                height: 2rem;
              }
              .form-element {
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
              }

              .form-element-label label {
                font-weight: 700;
              }

              .form-element-input * {
                background-color: hsl(226, 64%, 66%);
                border: none;
                box-sizing: border-box;
                font-size: 1rem;
                height: 2rem;
                outline: transparent;
                padding: 0.5rem;
                width: 100%;
              }
            </style>
        
            <div class="filter-modal">
                <div class="filter-modal-content">
                    <div class="filter-modal-form">
                    <form action="">
                        <div class="form-element">
                        <div class="form-element-label">
                            <label for="Name">Nombre</label>
                        </div>
                        <div class="form-element-input">
                            <input type="text">
                        </div>
                        </div>
                        <div class="form-element">
                        <div class="form-element-label">
                            <label for="Email">Email</label>
                        </div>
                        <div class="form-element-input">
                            <input type="email">
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="filter-modal-buttons">
                    <div class="filter-modal-accept-button">
                        <button>
                        <span>accept</span>
                        </button>
                    </div>
                    <div class="filter-modal-decline-button">
                        <button>
                        <span>decline</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
         `

    const declineButton = this.shadow.querySelector('.filter-modal-decline-button')

    declineButton.addEventListener('click', () => {
      this.closeModal()
    })
  }

  openModal () {
    const modal = this.shadow.querySelector('.filter-modal')
    modal.classList.add('filter-modal-active')
  }

  closeModal () {
    const modal = this.shadow.querySelector('.filter-modal')
    modal.classList.remove('filter-modal-active')
  }
}

customElements.define('filter-component', Filter)
