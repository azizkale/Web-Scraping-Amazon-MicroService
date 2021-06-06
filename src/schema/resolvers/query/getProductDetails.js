const Axios = require("axios");
const cheerio = require("cheerio");

const getProductDetails = async (_, { url }) => {
  const response = await Axios.get(url);
  const $ = await cheerio.load(response.data);

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

  sizelist = [];
  $("#twister > #variation_size_name")
    .find($("select > option"))
    .map((i, el) => {
      return sizelist.push($(el).text().trim());
    });
  sizelist.push(
    $("#twister > #variation_size_name").find($("span.selection")).text().trim()
  );

  descriptionlist = "";
  $("#feature-bullets > ul > li > span").map((i, el) => {
    descriptionlist += $(el).text().trim() + ",";
  });

  let product = {
    link: url,
    title: $("#productTitle").text().trim(),
    price: $("#priceblock_ourprice").text(),
    availability: $("#availability > span").text().trim(),
    companyname: $("a#bylineInfo").text(),
    color: colorlist,
    size: sizelist,
    description: [descriptionlist, $("#productDescription > p").text().trim()],
  };

  return product;
};

module.exports = getProductDetails;
