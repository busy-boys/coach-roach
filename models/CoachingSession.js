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
      get() {
        // get meeting count
        let participantCount = 0;
        if (this.getDataValue('supervisor_id')) participantCount += 1;
        if (this.getDataValue('senior_coordinator_id')) participantCount += 1;
        if (this.getDataValue('superintendent_id')) participantCount += 1;
        // get signOff count
        let signOffCount = 0;
        if (this.getDataValue('supervisor_signedOff')) signOffCount += 1;
        if (this.getDataValue('senior_coordinator_signedOff'))
          signOffCount += 1;
        if (this.getDataValue('superintendent_signedOff')) signOffCount += 1;
        // return true if match
        if (participantCount === signOffCount) {
          console.log(
            `participants:${participantCount} signOff:${signOffCount}`
          );
          console.log('get is true');
          return true;
        }
        // console.log(participantCount);
        // console.log(signOffCount);
        console.log('get is false');
        return false;
      },
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
