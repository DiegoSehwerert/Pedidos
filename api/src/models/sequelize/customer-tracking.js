module.exports = function (sequelize, DataTypes) {
  const CustomerTracking = sequelize.define('CustomerTracking', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    fingerprintId: {
      type: DataTypes.INTEGER
    },
    localeSeoId: {
      type: DataTypes.INTEGER
    },
    localeSeoSlugId: {
      type: DataTypes.INTEGER
    },
    eventTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "name".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name ".'
        }
      }
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "name".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name ".'
        }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "name".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name ".'
        }
      }
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "event".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "name ".'
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
    tableName: 'customer_trackings',
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
        name: 'customer_trackings_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'customer_trackings_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      },
      {
        name: 'customer_trackings_localeSeoSlugId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoSlugId' }
        ]
      }
    ]
  })

  CustomerTracking.associate = function (models) {
    CustomerTracking.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
    CustomerTracking.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })
    CustomerTracking.belongsTo(models.LocaleSeoSlug, { as: 'localeSeoSlug', foreignKey: 'localeSeoSlugId' })
  }

  return CustomerTracking
}