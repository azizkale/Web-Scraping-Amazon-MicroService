const getProductDetails = require("./query/getProductDetails");
const getLinksWithAsin = require("./query/getLinksWithAsin");

const resolvers = {
  Query: {
    getProductDetails: getProductDetails,
    getLinksWithAsin: getLinksWithAsin,
  },
};

module.exports = resolvers;
