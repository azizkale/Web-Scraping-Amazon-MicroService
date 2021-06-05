const Axios = require("axios");
const cheerio = require("cheerio");

const getProductDetails = async (_, { url }) => {
  const response = await Axios.get(url);

  const $ = cheerio.load(response.data);

  const asd = $("#productDescription > p").text().trim();
  console.log(asd);
  return asd;
};

module.exports = getProductDetails;
