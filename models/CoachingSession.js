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
        time: {
            type: DataTypes.DATE,
            allowNull: false
            },
        location: {
            type: DataTypes.STRING,
            allowNull: false
            },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        coach: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
              },
        },
        couchee: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
              },
        },
        signedOff: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'session',
      }
);

module.exports = CoachingSession