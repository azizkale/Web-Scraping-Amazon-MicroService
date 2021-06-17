const getProductDetails = require("./query/getProductDetails");
const getLinksWithAsin = require("./query/getLinksWithAsin");
const getSingleProduct = require("./query/getSingleProduct");

const resolvers = {
  Query: {
    getProductDetails: getProductDetails,
    getLinksWithAsin: getLinksWithAsin,
    getSingleProduct: getSingleProduct,
  },
};

module.exports = resolvers;
