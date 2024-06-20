const moment = require('moment')
const sequelizeDb = require('../../models/sequelize') // Cambiado de mongooseDb a sequelizeDb
const Company = sequelizeDb.Company

exports.create = async (req, res) => {
  try {
    const data = await Company.create(req.body) // Sequelize usa el mismo método 'create'
    console.log('create', data)

    res.status(200).send(data)
  } catch (err) {
    console.log('create', err)
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al insertar el dato.'
    })
  }
}

exports.findAll = async (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  try {
    const result = await Company.findAll({ // Cambiado de 'find' a 'findAll'
      attributes: ['id', 'commercialAddress','fiscalAddress','commercialName','fiscalName','VatNumber', 'createdAt', 'updatedAt'],
      where: req.query, // Sequelize usa 'where' para las consultas
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']] // Sequelize usa 'order' para ordenar
    })

    const count = await Company.count() // Sequelize usa 'count' para contar

    const response = {
      rows: result.map(doc => ({
        ...doc,
        id: doc.id, // Sequelize usa 'id' en lugar de '_id'
        createdAt: moment(doc.createdAt).format('YYYY-MM-DD HH:mm'),
        updatedAt: moment(doc.updatedAt).format('YYYY-MM-DD HH:mm')
      })),
      meta: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page
      }
    }

    res.status(200).send(response)
  } catch (err) {
    console.log('findAll', err)
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Company.findByPk(id) // Cambiado de 'findById' a 'findByPk'

    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  } catch (err) {
    console.log('findOne', err)
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Company.update(req.body, { where: { id: id } }) // Cambiado de 'findByIdAndUpdate' a 'update'

    if (data) {
      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
      })
    }
  } catch (err) {
    console.log('update', err)
    res.status(500).send({
      message: 'Algún error ha surgido al actualizar la id=' + id
    })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Company.update({ deletedAt: new Date() }, { where: { id: id } }) // Cambiado de 'findByIdAndUpdate' a 'update'

    if (data) {
      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
      })
    }
  } catch (err) {
    console.log('delete', err)
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    })
  }
}