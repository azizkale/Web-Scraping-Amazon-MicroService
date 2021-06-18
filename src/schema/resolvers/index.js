const getLinksWithAsin = require("./query/getLinksWithAsin");
const getSingleProduct = require("./query/getSingleProduct");

const resolvers = {
  Query: {
    getLinksWithAsin: getLinksWithAsin,
    getSingleProduct: getSingleProduct,
  },
};

module.exports = resolvers;
