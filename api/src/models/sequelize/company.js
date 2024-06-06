module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "country".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "country".'
        }
      }
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "city".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "city".'
        }
      }
    },
    dialCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "dialCode".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "dialCode".'
        }
      }
    },
    fiscalName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "fiscalName".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "fiscalName".'
        }
      }
    },
    comercialName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "comercialName".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "comercialName".'
        }
      }
    },
    vat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "vat".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "vat".'
        }
      }
    },
    comercialAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "comercialAdress".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "comercialAdress".'
        }
      }
    },
    fiscalAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "fiscalAdress".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "fiscalAdress".'
        }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "postalCode".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "postalCode".'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notNull: {
        msg: 'Por favor, rellena el campo "email".'
      },
      notEmpty: {
        msg: 'Por favor, introduce un valor para el campo "email".'
      },
      isEmail: {
        msg: 'Por favor, rellena el campo "Email" con un email válido.'
      },
      isUnique: function (value, next) {
        const self = this
        Customer.findOne({ where: { email: value } }).then(function (customer) {
          if (customer && self.id !== customer.id) {
            return next('Ya existe un cliente con ese email.')
          }
          return next()
        }).catch(function (err) {
          return next(err)
        })
      }
    },
    web: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.STRING
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
    tableName: 'companies',
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
        name: 'companies_countryId_fk',
        using: 'BTREE',
        fields: [
          { name: 'countryId' }
        ]
      },
      {
        name: 'companies_cityId_fk',
        using: 'BTREE',
        fields: [
          { name: 'cityId' }
        ]
      },
      {
        name: 'companies_dialCodeId_fk',
        using: 'BTREE',
        fields: [
          { name: 'dialCodeId' }
        ]
      },
      
    ]
  })

  Company.associate = function (models) {
    Company.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' })
    Company.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' })
    Company.belongsTo(models.DialCode, { as: 'dialCode', foreignKey: 'dialCodeId' })
    
  }

  return Company
}