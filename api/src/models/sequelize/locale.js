module.exports = function (sequelize, DataTypes) {
  const Locale = sequelize.define('Locale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "entityId".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "entityID".'
        }
      }
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "key".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "key".'
        }
      }
    },
    value: {
      type: DataTypes.TEXT
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
    tableName: 'locales',
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
        name: 'locales_languageAlias_entity_entityId_key_index',
        using: 'BTREE',
        fields: [
          { name: 'languageAlias' },
          { name: 'entity' },
          { name: 'entityId' },
          { name: 'key' }
        ]
      }
    ]
  })

  Locale.associate = function (models) {
    Locale.hasMany(models.CartDetail, { as: 'cartDetails', foreignKey: 'localeId' })
    Locale.hasMany(models.ReturnDetail, { as: 'returnDetails', foreignKey: 'localeId' })
    Locale.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'localeId' })
  }

  return Locale
}