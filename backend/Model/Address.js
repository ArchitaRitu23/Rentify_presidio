const connection = require("../connection")
const { DataTypes } = require('sequelize');

const Address = connection.define("Address", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    house_no : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street_no_name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode : {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Address;