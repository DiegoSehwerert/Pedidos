class AuthPasswordComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (!token) {
      window.location.href = '/'
    }

    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = `
        <style>
          .box {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .register-container {
            padding: 16px;
            background-color: #f1f1f1;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
            margin: 0 auto;
          }
          .register-container h2 {
            text-align: center;
            color: #333;
          }
          .register-container input {
            width: 100%;
            padding: 10px 0;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .register-container button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            color: #fff;
            background-color: #007BFF;
          }
          .register-container button:hover {
            background-color: #0056b3;
          }
        </style>
        <form class=box>
          <div class="register-container">
            <h2>Registro</h2>
            <input type="password" placeholder="Contraseña" required>
            <input type="password" placeholder="Repetir contraseña" required>
            <button>Enviar</button>
          </div>
        </form>
      `

    const submit = this.shadowRoot.querySelector('button')
    const inputs = this.shadowRoot.querySelectorAll('input')

    submit.addEventListener('click', async (e) => {
      e.preventDefault()
      if (inputs[0].value !== inputs[1].value) {
        alert('Las contraseñas no coinciden')
        return
      }
      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          password: inputs[0].value
        }
      }))

      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password: inputs[0].value })
      })
    })
  }
}

customElements.define('auth-password-component', AuthPasswordComponent)
