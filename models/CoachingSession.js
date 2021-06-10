const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CoachingSession extends Model {}

CoachingSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // coach: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     references: {
    //         model: 'user',
    //         key: 'id',
    //       },
    // },
    // couchee: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     references: {
    //         model: 'user',
    //         key: 'id',
    //       },
    // },
    signedOff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'coaching_session',
  }
);

module.exports = CoachingSession;
