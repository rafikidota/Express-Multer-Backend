const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/config');
const { Sequelize } = require('sequelize');

const Doctor = sequelize.define('Doctor', {
    // Model attributes are defined here
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

module.exports = Doctor;