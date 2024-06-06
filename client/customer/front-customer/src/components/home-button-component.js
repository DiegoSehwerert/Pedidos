class HomeButtonComponent extends HTMLElement {
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
          .container{
            max-height: 10vh;
            min-height: 10vh;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .home-button{
            width: 3rem;
            height: 3rem;
            background-color: white;
            border-radius: 50%;
            cursor: pointer;
          }
        </style>
        <div class="container">
          <div class="home-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home-circle</title><path d="M19.07,4.93C17.22,3 14.66,1.96 12,2C9.34,1.96 6.79,3 4.94,4.93C3,6.78 1.96,9.34 2,12C1.96,14.66 3,17.21 4.93,19.06C6.78,21 9.34,22.04 12,22C14.66,22.04 17.21,21 19.06,19.07C21,17.22 22.04,14.66 22,12C22.04,9.34 21,6.78 19.07,4.93M17,12V18H13.5V13H10.5V18H7V12H5L12,5L19.5,12H17Z" /></svg>
          </div>
        </div>

      `
  }
}

customElements.define('home-button-component', HomeButtonComponent)
