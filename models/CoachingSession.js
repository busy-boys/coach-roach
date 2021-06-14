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
      type: DataTypes.DATE,
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
      defaultValue: false,
    },
    senior_coordinator_signedOff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    supervisor_signedOff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    superintendent_signedOff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    senior_coordinator_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
    },
    supervisor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
    },
    superintendent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
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
