module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/admin/image-controller.js')
  const uploadFiles = require('../middlewares/upload-files.js')

  router.post('/', [uploadFiles], controller.create)
  router.get('/image/:filename', controller.getImage)
  router.get('/', controller.findAll)
  router.get('/:filename', controller.findOne)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.delete)

  app.use('/api/admin/images', router)
}