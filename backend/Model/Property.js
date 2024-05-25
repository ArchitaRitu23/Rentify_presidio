const connection = require("../connection");
const { DataTypes } = require("sequelize");
const Address = require("./Address");
const User = require("./User");
const Landmark = require("./Landmark");

const Property = connection.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_of_bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  no_of_bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // address_id:{
  //     type : DataTypes.INTEGER,
  //     allowNull : false,
  // }
});
Property.belongsTo(Address, { foreignKey: "address_id" });
Property.belongsTo(User, { foreignKey: "user_id" });
// Property.belongsToMany(Landmark, { through: LandmarkProperty });
module.exports = Property;
