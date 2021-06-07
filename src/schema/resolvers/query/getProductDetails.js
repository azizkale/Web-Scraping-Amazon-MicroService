const Axios = require("axios");
const cheerio = require("cheerio");

const getProductDetails = async (_, { url }) => {
  const response = await Axios.get(url);
  const $ = await cheerio.load(response.data);

  // Product Color==========================
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

  // Product Size ==========================

  sizelist = [];
  $("#twister > #variation_size_name")
    .find($("select > option"))
    .map((i, el) => {
      return sizelist.push($(el).text().trim());
    });
  sizelist.push(
    $("#twister > #variation_size_name").find($("span.selection")).text().trim()
  );

  // Product Description==========================

  descriptionlist = "";
  $("#feature-bullets > ul > li > span").map((i, el) => {
    descriptionlist += $(el).text().trim() + ",";
  });

  // Product Infos==========================
  let infolist = [];

  $("#detailBullets_feature_div > ul > li > span").map((i, el) => {
    let obj = {};
    obj["subInfoTitle"] = $(el)
      .find($(":nth-child(1)"))
      .text()
      .replace(/[\n\t\r]/g, "");

    obj["subInfo"] = $(el)
      .find($(":nth-child(2)"))
      .text()
      .replace(/[\n\t\r]/g, "");

    infolist.push(obj);
  });

  // Technical Details==========================
  let technicaldetails = [];
  $("#productDetails_techSpec_section_1 > tbody > tr").map((i, el) => {
    let obj = {};
    obj["subInfoTitle"] = $(el)
      .find($("th"))
      .text()
      .replace(/[\n\t\r]/g, "");

    obj["subInfo"] = $(el)
      .find($("td"))
      .text()
      .replace(/[\n\t\r]/g, "");
    technicaldetails.push(obj);
  });

  // Product ==========================

  let product = {
    link: url,
    title: $("#productTitle").text().trim(),
    price: $("#priceblock_ourprice").text(),
    availability: $("#availability > span").text().trim(),
    companyname: $("a#bylineInfo").text(),
    color: colorlist,
    size: sizelist,
    description: [descriptionlist, $("#productDescription > p").text().trim()],
    info: infolist,
    technicalDetails: technicaldetails,
  };

  return product;
};

module.exports = getProductDetails;
