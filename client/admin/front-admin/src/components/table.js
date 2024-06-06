import { showImages } from '../redux/images-slice.js'
import { store } from '../redux/store.js'

class table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
  }

  connectedCallback () {
    document.addEventListener('refresh-table', (event) => {
      this.loadData().then(() => this.render())
    })

    this.loadData().then(() => this.render())
  }

  handleDeleteElement (event) {
    this.deleteElement(event.detail.id)
    this.loadData().then(() => this.render())
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    console.log('table', data)
    this.rows = data.rows
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

        .table-record {
          margin-bottom: 1rem;
        }
        .table-buttons {
          background-color: hsl(0, 0%, 100%);
          display: flex;
          justify-content: flex-start;
          margin-bottom: 2rem;
        }
        .table-button button svg {
          width: 2rem;
          padding-left: 0.2rem;
        }
        
        .table-button button svg path {
          fill: hsl(207, 85%, 69%);
        }
        
        .table-button button:hover svg path {
          fill: hsl(34, 79%, 53%);
        }
        .table-record-buttons {
          background-color: hsl(207, 85%, 69%);
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        
        .edit-button  svg,
        .delete-button  svg {
          display: block;
          width: 2rem;
        }
        
        .edit-button  svg path,
        .delete-button  svg path {
          fill: hsl(0, 0%, 100%);
        }
        
        .edit-button:hover svg path,
        .delete-button:hover svg path {
          fill: hsl(34, 79%, 53%);
        }
        .table-data {
          background-color: hsl(226, 64%, 66%);
          display: flex;
          justify-content: flex-start;
          padding: 0.5rem;
          flex-direction: column; 
          flex-wrap: wrap;
        }
        
        .table-data ul {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .table-data ul li span {
          font-weight: 700;
        }
        
        .table-data ul li span::after {
          content: ":";
          margin-right: 0.5rem;
        }
        .table {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 1rem;
        }
        .edit-button:hover::after,
          .delete-button:hover::after {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.7);
            content: attr(data-id); /* Muestra el valor del atributo data-id */
            color: #fff;
            padding: 5px;
            position: fixed;
            font-size: 12px;
          }
        </style> 
        <section class="table">
          <div class="table-buttons">
            <div class="table-button filter-button">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>filter-menu</title>
                  <path
                    d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="table-records"></div>
        </section>

        `
    this.rows.forEach((row) => {
      const tableRecord = document.createElement('article')
      tableRecord.className = 'table-record'

      const tableRecordButtons = document.createElement('div')
      tableRecordButtons.className = 'table-record-buttons'

      const editButton = document.createElement('div')
      editButton.className = 'edit-button'
      editButton.dataset.id = row.id
      editButton.innerHTML = `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'
            />
          </svg>`

      const deleteButton = document.createElement('div')
      deleteButton.className = 'delete-button'
      deleteButton.dataset.id = row.id
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>`

      const tableData = document.createElement('div')
      tableData.className = 'table-data'

      const tableDataUl = document.createElement('ul')

      const tableDataLiEs = document.createElement('li')
      const tableDataLiEn = document.createElement('li')

      const tableDataLiSpanEs = document.createElement('span')
      const tableDataLiSpanEn = document.createElement('span')

      const tableDataEsContainer = document.createElement('div')
      tableDataEsContainer.className = 'table-data-es-container'

      const tableDataEnContainer = document.createElement('div')
      tableDataEnContainer.className = 'table-data-en-container'

      const tableDataEsQuestion = document.createElement('div')

      tableDataEsQuestion.textContent = `Nombre: ${row.name}`

      const tableDataEsAnswer = document.createElement('div')
      tableDataEsAnswer.textContent = `Apellidos: ${row.surname}`

      const tableDataEnQuestion = document.createElement('div')
      tableDataEnQuestion.textContent = `Email: ${row.email}`

      const tableDataEnAnswer = document.createElement('div')
      tableDataEnAnswer.textContent = `Telefono: ${row.telephone}`

      tableDataEsContainer.appendChild(tableDataEsQuestion)
      tableDataEsContainer.appendChild(tableDataEsAnswer)

      tableDataEnContainer.appendChild(tableDataEnQuestion)
      tableDataEnContainer.appendChild(tableDataEnAnswer)

      tableDataLiEs.appendChild(tableDataLiSpanEs)
      tableDataLiEs.appendChild(tableDataEsContainer)

      tableDataLiEn.appendChild(tableDataLiSpanEn)
      tableDataLiEn.appendChild(tableDataEnContainer)

      tableDataUl.appendChild(tableDataLiEs)
      tableDataUl.appendChild(tableDataLiEn)

      tableData.appendChild(tableDataUl)

      tableRecord.appendChild(tableRecordButtons)
      tableRecord.appendChild(tableData)
      tableRecordButtons.appendChild(editButton)
      tableRecordButtons.appendChild(deleteButton)

      this.shadow.querySelector('.table-records').appendChild(tableRecord)
    })
    const tableSection = this.shadow.querySelector('.table')

    tableSection.addEventListener('click', async (event) => {
      if (event.target.closest('.delete-button')) {
        const deleteButton = event.target.closest('.delete-button')
        const id = deleteButton.dataset.id
        document.dispatchEvent(new CustomEvent('showModalDestroy', {
          detail:
            { endpoint: `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}` }
        }))
      }
      if (event.target.closest('.edit-button')) {
        const editButton = event.target.closest('.edit-button')
        const id = editButton.dataset.id
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`)
          const data = await response.json()
          document.dispatchEvent(new CustomEvent('showElement', { detail: { data } }))
          store.dispatch(showImages(data.images))
        } catch (error) {
          console.error('Error:', error)
        }
      }
    })
  }

  deleteElement (id) {
    this.loadData().then(() => this.render())
  }
}
customElements.define('table-component', table)
