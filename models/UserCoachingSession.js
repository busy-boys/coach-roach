const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserCoachingSession extends Model {}

UserCoachingSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    coaching_session_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'coaching_session',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_coaching_session',
  }
);

module.exports = UserCoachingSession;
