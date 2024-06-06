const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
  return str.replace(/(?:^|-)([a-z])/g, (_, letter) => letter.toUpperCase());
}

const currentDir = process.cwd(); // Directorio actual donde se ejecuta el script

const projectRoot = path.join(currentDir, '..'); // Subimos un nivel para llegar a 'GameXop'
const modelsFolder = path.join(projectRoot, '/models');
const controllersFolder = path.join(projectRoot, '/controllers/admin');

try {
  const modelFiles = fs.readdirSync(modelsFolder);

  modelFiles.forEach((modelFile) => {
    const modelName = toCamelCase(path.parse(modelFile).name);
    const fileName = `admin-${modelFile.replace('.js', '')}-controller.js`;

  const controllerContent = `
const sequelizeDb = require('../../models/sequelize');
const ${modelName} = sequelizeDb.${modelName};
const Op = sequelizeDb.Sequelize.Op;

exports.create = (req, res) => {
  ${modelName}.create(req.body).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al insertar el dato.'
    });
  });
};

exports.findAll = (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.size) || 10;
  const offset = (page - 1) * limit;

  ${modelName}.findAndCountAll({
    attributes: ['id', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  }).then(result => {
    result.meta = {
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page
    };

    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ${modelName}.findByPk(id).then(data => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: \`No se puede encontrar el elemento con la id=\${id}.\`
      });
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ${modelName}.update(req.body, {
    where: { id }
  }).then(([numberRowsAffected]) => {
    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      });
    } else {
      res.status(404).send({
        message: \`No se puede actualizar el elemento con la id=\${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.\`
      });
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al actualizar la id=' + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ${modelName}.destroy({
    where: { id }
  }).then(([numberRowsAffected]) => {
    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente'
      });
    } else {
      res.status(404).send({
        message: \`No se puede borrar el elemento con la id=\${id}. Tal vez no se ha encontrado el elemento.\`
      });
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    });
  });
};
`;

const controllerFilePath = path.join(controllersFolder, fileName);

fs.writeFileSync(controllerFilePath, controllerContent);

console.log(`Controlador generado para el modelo ${modelName}: ${fileName}`);
});
} catch (error) {
console.error(`Error: ${error.message}`);
}
