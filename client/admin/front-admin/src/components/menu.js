class Title extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    // this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
            `
      <style>
      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }
      .menu {
        margin: 0;
        padding: 0;
        background-color: hsl(207, 85%, 69%);
        height: 100vh;
        transition: all 0.5s;
        left: 0;
        top: -100vh;
        position: fixed;
        width: 100%;
        z-index: 1;
      }
      
      .menu-active {
        top: 0;
      }
      
      
      .menu-button {
        position: relative;
        z-index: 2;
      }
      
      .menu-button svg {
        width: 3rem;
      }
      
      .menu-button .line {
        fill: none;
        stroke: hsl(0, 0%, 100%);
        stroke-width: 6;
        transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
          stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .menu-button .top-line {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      
      .menu-button .middle-line {
        stroke-dasharray: 60 60;
        stroke-width: 6;
      }
      
      .menu-button .bottom-line {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      
      .menu-button.active .top-line {
        stroke-dasharray: 90 207;
        stroke-dashoffset: -134;
        stroke-width: 6;
      }
      
      .menu-button.active .middle-line {
        stroke-dasharray: 1 60;
        stroke-dashoffset: -30;
        stroke-width: 6;
      }
      
      .menu-button.active .bottom-line {
        stroke-dasharray: 90 207;
        stroke-dashoffset: -134;
        stroke-width: 6;
      }
      </style>
      <div class="top-bar-menu">
      <div class="menu">

      </div>
      <button class="menu-button">
        <svg viewBox="0 0 100 100">
          <path class="line top-line"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
          <path class="line middle-line" d="M 20,50 H 80" />
          <path class="line bottom-line"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>
      </button>
    </div>
      `

    const menuButton = this.shadow.querySelector('.menu-button')
    const menu = this.shadow.querySelector('.menu')

    menuButton?.addEventListener('click', () => {
      menuButton.classList.toggle('active')
      menu.classList.toggle('menu-active')
    })
  }
}

customElements.define('title-menu', Title)
