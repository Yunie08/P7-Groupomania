'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.hasMany(models.Comment, {
        onDelete: 'cascade',
        hooks: true,
        foreignKey: 'articleId',
      });
      Article.hasMany(models.Like, {
        onDelete: 'cascade',
        hooks: true,
        foreignKey: 'articleId',
      });
      Article.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
