const Axios = require("axios");
const cheerio = require("cheerio");
const Product = require("../../../oop-models/Product");

const getProductDetails = async (_, { url }) => {
  let oneProduct = new Product();
  const response = await Axios.get(url);
  const $ = await cheerio.load(response.data);
  oneProduct.pLink = url;
  oneProduct.pTitle = $("#productTitle").text().trim();
  oneProduct.pPrice = $("#priceblock_ourprice").text();
  oneProduct.pAvailability = $("#availability > span").text().trim();
  oneProduct.pCompanyName = $("a#bylineInfo").text();
  let colorlist = [];
  $("#twister")
    .find($("#variation_color_name > ul > li"))
    .map(function (i, el) {
      // this === el
      return colorlist.push($(this).find($("img")).attr("alt"));
    });
  colorlist.push(
    $("#variation_color_name").find($("span.selection")).text().trim()
  );
  oneProduct.pColor = colorlist;
  oneProduct.pSize = [];
  $("#twister > #variation_size_name")
    .find($("select > option"))
    .map((i, el) => {
      return oneProduct.pSize.push($(el).text().trim());
    });
  oneProduct.pSize.push(
    $("#twister > #variation_size_name").find($("span.selection")).text().trim()
  );
  oneProduct.pDescription = [];
  $("#feature-bullets > ul > li > span").map((i, el) => {
    oneProduct.pDescription.push($(el).text().trim());
  });

  oneProduct.pDescription.push($("#productDescription > p").text().trim());

  // const asd = $("#productDescription > p").text().trim();

  return oneProduct;
};

module.exports = getProductDetails;
