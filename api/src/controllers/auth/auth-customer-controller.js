const bcrypt = require('bcryptjs')
const sequelizeDb = require('../../models/sequelize')
const CustomerCredential = sequelizeDb.CustomerCredential

exports.signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Los campos no pueden estar vacios.' })
    }

    if (!/^\S+@\S+\.\S+$/.test(req.body.email)) {
      return res.status(400).send({ message: 'La dirección de correo electrónico no es válida.' })
    }

    const data = await CustomerCredential.findOne({
      where: {
        email: req.body.email,
        deletedAt: null
      }
    })

    if (!data) {
      return res.status(404).send({ message: 'Usuario o contraseña incorrecta' })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    )

    if (!passwordIsValid) {
      return res.status(404).send({
        message: 'Usuario o contraseña incorecta'
      })
    }

    req.session.user = { id: data.id, admin: false }

    res.status(200).send({
      redirection: '/front'
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  }
}

exports.checkSignin = (req, res) => {
  if (req.session.user) {
    res.status(200).send({
      redirection: '/front'
    })
  } else {
    res.status(401).send({
      redirection: '/front/login'
    })
  }
}

exports.reset = async (req, res) => {
  CustomerCredential.findOne({
    where: {
      email: req.body.email,
      deletedAt: null
    }
  }).then(async data => {
    if (!data) {
      return res.status(404).send({ message: 'Usuario no encontrado' })
    }

    await req.authorizationService.createResetPasswordToken(data.id, 'customer')

    res.status(200).send({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' })
  }).catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message || 'Algún error ha surgido al recuperar los datos.' })
  })
}