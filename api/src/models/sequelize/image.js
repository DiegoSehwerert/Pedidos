module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    imageConfigurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "entity".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "entity".'
        }
      }
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "entity".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "entity".'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "name".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name".'
        }
      }
    },
    originalFilename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "originalFileName".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "originalFileName".'
        }
      }
    },
    resizedFilename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "resizedFileName".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "resizedFileName".'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "title".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "title".'
        }
      }
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "alt".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "alt".'
        }
      }
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "languageAlias".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "languageAlias".'
        }
      }
    },
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "mediaQuery".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "mediaQuery".'
        }
      }
    },
    latencyMs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "latencyms".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "letencyms".'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'images',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'images_imageConfigurationId_fk',
        using: 'BTREE',
        fields: [
          { name: 'imageConfigurationId' }
        ]
      },
      {
        name: 'images_entityId_entity_mediaQuery_index',
        using: 'BTREE',
        fields: [
          { name: 'entityId' },
          { name: 'entity' },
          { name: 'mediaQuery' }
        ]
      }
    ]
  })

  Image.associate = function (models) {
    Image.belongsTo(models.ImageConfiguration, { as: 'imageConfiguration', foreignKey: 'imageConfigurationId' })
  }

  return Image
}