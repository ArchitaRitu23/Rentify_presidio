const createHttpError = require("http-errors");
const Address = require("../Model/Address");
const Landmark = require("../Model/Landmark");
const Property = require("../Model/Property");
const User = require("../Model/User");

const controller = {
  Add: async (req, res, next) => {
    const {
      name,
      no_of_bedrooms,
      no_of_bathrooms,
      house_no,
      street_no_name,
      city,
      state,
      pincode,
      landmarks,
    } = req.body;

    try {
      // address
      const address = await Address.create({
        house_no,
        street_no_name,
        city,
        state,
        pincode,
      });

      // user id
      const property = await Property.create({
        name,
        no_of_bedrooms,
        no_of_bathrooms,
        address_id: address.id,
        user_id: req.user.id,
      });

      // landmarks
      for (let i = 0; i < landmarks.length; i++) {
        const landmark = landmarks[i];

        const l = await Landmark.create({
          name: landmark.name,
          category: landmark.category,
          property_id: property.id,
        });

        // Property.addLandmark(l);
      }

      return res.status(200).json({
        message: "property added",
      });
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError("Property not added"));
    }
  },
  ReadAll: async (req, res, next) => {
    try {
      const properties = await Property.findAll({
        include: [Address, User],
      });

      let result = [];

      const landmarks = await Landmark.findAll();

      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const propertyLandmarks = [];

        for (let j = 0; j < landmarks.length; j++) {
          const landmark = landmarks[j];

          if (landmark.property_id == property.id)
            propertyLandmarks.push(landmark);
        }
        console.log(propertyLandmarks[0]);
        property.landmarks = propertyLandmarks;

        result.push({ ...property.dataValues, landmarks: propertyLandmarks });
      }

      return res.status(200).json({ properties: result });
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError());
    }
  },
};

module.exports = controller;
