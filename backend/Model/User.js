const connection = require("../connection")
const { DataTypes } = require('sequelize');

const User = connection.define("User", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstname : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password_hash_key : {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = User;