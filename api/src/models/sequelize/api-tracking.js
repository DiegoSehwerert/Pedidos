module.exports = function (sequelize, DataTypes) {
  const ApiTracking = sequelize.define('ApiTracking', {
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
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "IP".'
        },
        isIP: {
          msg: 'Introduce una IP valida".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "IP".'
        }
      }
    },
    isRobot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "isRobot".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "IsRobot".'
        }
      }
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Resource".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "Resource".'
        }
      }
    },
    resourceElement: {
      type: DataTypes.INTEGER
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "method".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "method".'
        }
      }
    },
    httpCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "httpCode".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "httpCode".'
        }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "startTime".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "startTime".'
        }
      }
    },
    endTime: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "endTime".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "endTime".'
        }
      }
    },
    latencyMS: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "latency".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "latency".'
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
    tableName: 'api_trackings',
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
        name: 'api_trackings_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
      {
        name: 'api_trackings_fingerprintId_fk',
        using: 'BTREE',
        fields: [
          { name: 'fingerprintId' }
        ]
      }
    ]
  })

  ApiTracking.associate = function (models) {
    ApiTracking.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
  }

  return ApiTracking
}