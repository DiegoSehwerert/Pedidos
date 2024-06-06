class RegisterComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
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
        <div class="box">
          <div class="register-container">
            <h2>Registro</h2>
            <input type="text" placeholder="Nombre de usuario" required>
            <input type="email" placeholder="Correo electrónico" required>
            <input type="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
          </div>
        </div>
      `
  }
}

customElements.define('register-component', RegisterComponent)
