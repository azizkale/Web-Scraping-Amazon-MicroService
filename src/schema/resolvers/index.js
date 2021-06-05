const getProductDetails = require("./query/getProductDetails");

const resolvers = {
  Query: {
    getProductDetails: getProductDetails,
  },
};

module.exports = resolvers;
