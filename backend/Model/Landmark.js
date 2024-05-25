const connection = require("../connection");
const { DataTypes } = require("sequelize");
const Property = require("./Property");

const Landmark = connection.define("Landmark", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Landmark.belongsTo(Property, { foreignKey: "property_id" });
// Landmark.belongsToMany(Property, { through: LandmarkProperty });
module.exports = Landmark;
