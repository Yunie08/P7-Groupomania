'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User has many Articles
      User.hasMany(models.Article, { onDelete: 'cascade', hooks: 'true' });
      User.hasMany(models.Comment, { onDelete: 'cascade', hooks: 'true' });
      User.hasMany(models.Like, { onDelete: 'cascade', hooks: 'true' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: DataTypes.STRING,
      linkedinProfile: DataTypes.STRING,
      twitterProfile: DataTypes.STRING,
      facebookProfile: DataTypes.STRING,
      instagramProfile: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
