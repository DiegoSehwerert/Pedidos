module.exports = function (sequelize, DataTypes) {
  const Customer = sequelize.define('Customer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
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
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'customers',
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
        }
      ]
    }
  )

  Customer.associate = function (models) {
    Customer.hasOne(models.CustomerCredential, { as: 'customerCredential', foreignKey: 'customerId' })
    Customer.hasMany(models.CustomerActivationToken, { as: 'customerActivationTokens', foreignKey: 'customerId' })
    Customer.hasOne(models.CustomerActivationToken, { as: 'customerActivationToken', foreignKey: 'customerId', scope: { used: false } })
    Customer.hasMany(models.CustomerResetPasswordToken, { as: 'customerResetPasswordTokens', foreignKey: 'customerId' })
    Customer.hasOne(models.CustomerResetPasswordToken, { as: 'customerResetPasswordToken', foreignKey: 'customerId', scope: { used: false } })
  }

  return Customer
}