import store from '../redux/store'

class Form extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    document.addEventListener('message', (event) => {
      this.render()
    })
    document.addEventListener('showElement', this.handleShowElement.bind(this))
    this.render()
  }

  handleShowElement (event) {
    this.showElement(event.detail.data)
  }

  handleDeleteElement (event) {
    this.deleteElement(event.detail.data)
  }

  render () {
    this.shadow.innerHTML =
      /* html */
      `
        <style>
         * {
            margin: 0;
            padding: 0;
          }

          section {
            margin: 0;
            padding: 0;
          }

          .none {
            display: none;
          }

          button {
            background: transparent;
            border: none;
            cursor: pointer;
          }

          a {
            text-decoration: none;
          }

          ul {
            list-style: none;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: white;
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

          .form {
              flex: 2;
          }

          .form-top-bar{
              display: flex;
              justify-content: center;
              background-color: white;
              height: 3rem;
              width: 100%;
              margin-bottom: 2rem;

          }
          .error-message{
            display: none;
            position: absolute;
          }
          .error-message .active{
            background-color: #f44336;
            display: block;
          }
          .error-message .error-list{
            background-color: #f44336;
            padding: 0.5rem;
          }
          .error-list li{
            color: white;
            width: 100%;
          }
          .tabs{
              display: flex;
              height: 100%;
              width: 100%;
          }

          .tab{
              background-color: none;
              display: flex;
              align-items: center;
              padding: 0.5rem;
          }

          .tab:hover{
            background-color: hsl(206.87,84.81%,69.02%);
            cursor:pointer;
          }

          .tab button{
              color: blue;
          }

          .tab.active button{
              color: white;
          }

          .tab.active{
              background-color: #e69428;
              color: white;
          }

          .tab-contents{
            width: 100%;
          }

          .tab-content.active{
            width: 100%;
            display: block;
          }

          .tab-content{
            display: none;
          }

          .form-buttons {
            background-color: hsl(0, 0%, 100%);
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            padding: 0.5rem;
            padding-right: 0.5rem;
          }

          .create-button button svg,
          .store-button button svg {
            width: 2rem;
              
          }

          .create-button button svg path,
          .store-button button svg path {
            fill: #6db7f3;
          }

          .create-button button:hover svg path,
          .store-button button:hover svg path {
            fill: #e69428;
          }

          .form-row{
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .form-element {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
            width: 100%;
          }

          .form-element-input * {
            background-color: #718be0;
            border: none;
            box-sizing: border-box;
            font-size: 1rem;
            outline: transparent;
            padding: 0.5rem;
            width: 100%;
          }


          textarea{
            height: 15vh;
          }

          .language-contents{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 5rem;
          }

          .form-language-bar{
            background-color: white;
            width: 100%;
            height: 3rem;
            margin: 1rem 0;
          }

</style>
<div class="form">
  <div class="form-top-bar">
    <div class="error-message">
      <ul class="error-list">

      </ul>
    </div>
    <div class="tabs">
      <div class="tab active" data-tab="general">
        <button>
          General
        </button>
      </div>
      <div class="tab" data-tab="images">
        <button>
          Imágenes
        </button>
      </div>
    </div>
    <div class="form-buttons">
      <div class="create-button"  data-endpoint="">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
        </button>
      </div>
      <div class="store-button" data-endpoint="">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
        </button>
      </div>
    </div>
  </div>
  <form class="admin-form">
    <input type="hidden" name="id" value="">
    <div class="tab-contents">
      <div class="tab-content active" data-tab="general">
        <div class="form-row">
          <div class="form-element">
            <div class="form-element-label">
              <label for="question">
                Nombre
              </label>
            </div>
            <div class="form-element-input">
              <input type="text" name="name" value="">
            </div>
          </div>
          <div class="form-element">
            <div class="form-element-label">
              <label for="question">
                email
              </label>
            </div>
            <div class="form-element-input">
              <input type="text" name="email" value="">
            </div>
          </div>
        </div>
      </div>
      <div class="tab-contents">
        <div class="tab-content" data-tab="images">
          <div class="form-row">
            <slot name="upload-image-button" image-configuration='{"xs":{"widthPx":"60","heightPx":"60"},"sm":{"widthPx":"80","heightPx":"80"},"md":{"widthPx":"120","heightPx":"120"},"lg":{"widthPx":"300","heightPx":"300"}}'></slot>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

        `
    const buttonSave = this.shadow.querySelector('.store-button')
    const form = this.shadow.querySelector('.admin-form')

    buttonSave.addEventListener('click', async () => {
      try {
        const formData = new FormData(form)
        const formDataJson = {}
        formDataJson.images = store.getState().images.selectedImages

        for (const [key, value] of formData.entries()) {
          if (key.includes('customer')) {
            const [prefix, customer, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            if (!(customer in formDataJson[prefix])) {
              formDataJson[prefix][customer] = {}
            }

            formDataJson[prefix][customer][field] = value ?? null
          } else if (key.includes('.')) {
            const [prefix, field] = key.split('.')

            if (!(prefix in formDataJson)) {
              formDataJson[prefix] = {}
            }

            formDataJson[prefix][field] = value ?? null
          } else {
            formDataJson[key] = value ?? null
          }
          console.log('formData', formDataJson)
        }

        const endpoint = formDataJson.id ? `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`
        const method = formDataJson.id ? 'PUT' : 'POST'
        delete formDataJson.id

        const response =
        await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        if (response.status === 200) {
          document.dispatchEvent(new CustomEvent('message'))
        }

        if (response.status === 422 || response.status === 500) {
          const errorData = await response.json()
          console.log(errorData)
        } else if (response.status === 200) {
          const data = await response.json()
          console.log(data)
          document.dispatchEvent(new CustomEvent('refresh-table', {
            detail: {
              text: 'Formulario enviado correctamente',
              type: 'success'
            }
          }))
        }
      } catch (error) {
        console.error('Error:', error)
      }
      document.dispatchEvent(new CustomEvent('save-notification'))
    })

    // boton de clean
    const buttonBroom = this.shadow.querySelector('.create-button')

    buttonBroom?.addEventListener('click', () => {
      alert('HAS PULSADO LIMPIAR')
    })

    const main = this.shadow.querySelector('.form')
    main?.addEventListener('click', (event) => {
      if (event.target.closest('.tab')) {
        if (event.target.closest('.tab').classList.contains('active')) {
          return
        }

        const tabClicked = event.target.closest('.tab')
        const tabActive = tabClicked.parentElement.querySelector('.active')

        tabClicked.classList.add('active')
        tabActive.classList.remove('active')

        this.shadow.querySelector(`.tab-content.active[data-tab="${tabActive.dataset.tab}"]`).classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab="${tabClicked.dataset.tab}"]`).classList.add('active')
      }
    })
  }

  showElement (data) {
    const form = this.shadow.querySelector('.admin-form')
    const formElements = form.elements

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'customer') {
        Object.entries(value).forEach(([localeKey, localeData]) => {
          Object.entries(localeData).forEach(([field, fieldValue]) => {
            const element = formElements[`customer.${localeKey}.${field}`]
            if (element) {
              element.value = fieldValue
            }
          })
        })
      } else {
        const element = formElements[key]
        if (element) {
          element.value = value
        }
      }
    })
  }
}

customElements.define('form-component', Form)
