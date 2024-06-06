module.exports = function (sequelize, DataTypes) {
  const LocaleSeoSlug = sequelize.define('LocaleSeoSlug', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    languageAlias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "lenguageAlias".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "languageAlias".'
        }
      }
    },
    relParent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "relParent".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "relParent".'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "slug".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "slug".'
        }
      }
    },
    key: {
      type: DataTypes.INTEGER,
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
    parentSlug: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "parentSlug".'
        },
        notEmpty: {
          msg: 'Por favor, introduce un valor para el campo "parentSlug".'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    keywords: {
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
    tableName: 'locale_seo_slugs',
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
        name: 'locale_seo_slugs_localeSeoId_fk',
        using: 'BTREE',
        fields: [
          { name: 'localeSeoId' }
        ]
      }
    ]
  })

  LocaleSeoSlug.associate = function (models) {
    LocaleSeoSlug.belongsTo(models.LocaleSeo, { as: 'localeSeo', foreignKey: 'localeSeoId' })

    LocaleSeoSlug.hasMany(models.CustomerTracking, { as: 'customerTrackings', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.LocaleSeoSlugRedirect, { as: 'localeSeoSlugRedirects', foreignKey: 'localeSeoSlugId' })
    LocaleSeoSlug.hasMany(models.PageTracking, { as: 'pageTrackings', foreignKey: 'localeSeoSlugId' })
  }

  return LocaleSeoSlug
}