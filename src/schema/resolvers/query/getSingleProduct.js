const Axios = require("axios");
const cheerio = require("cheerio");

const getSingleProduct = async (_, { url }) => {
  const response = await Axios.get(url);
  const $ = await cheerio.load(response.data);

  return getProduct($, url);
};

let getProduct = ($, url) => {
  // Product Color==========================
  let pcolor = $("#twister")
    .find($("#variation_color_name > div.a-row > span.selection"))
    .text()
    .trim();

  // Product Size ==========================

  let psize = $("#twister > #variation_size_name")
    .find($("select > option.dropdownSelect"))
    .text()
    .trim();

  // Product Description==========================

  let descriptionlist = "";
  $("#feature-bullets > ul > li > span").map((i, el) => {
    descriptionlist += $(el).text().trim() + ",";
  });

  descriptionlist += $("#productDescription > p").text().trim();

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

  // Additional Info==========================
  let additionalinfo = [];
  $("#productDetails_detailBullets_sections1 > tbody > tr").map((i, el) => {
    let obj = {};
    obj["subInfoTitle"] = $(el)
      .find($("th"))
      .text()
      .replace(/[\n\t\r]/g, "");

    obj["subInfo"] = $(el)
      .find($("td"))
      .text()
      .replace(/[\n\t\r]/g, "");
    additionalinfo.push(obj);
  });
  // Seller==========================

  let seller = $(
    "#tabular-buybox > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  )
    .text()
    .trim();

  // ASIN =============================
  let ASIN =
    $("#averageCustomerReviews").attr("data-asin") ||
    $("input#ASIN").attr("value");

  // Category =========================
  let pcategory = $(
    "#wayfinding-breadcrumbs_feature_div > ul > li:last-child> span > a"
  )
    .text()
    .trim();

  // imagelink=======================

  let pimagelink = $("#main-image-container img").attr("src");

  //Price====================

  let pprice = $("#priceblock_ourprice").text().slice(0, -3);

  // Product ==========================

  let product = {
    asin: ASIN,
    link: url,
    title: $("#productTitle").text().trim(),
    price: +parseFloat(pprice.replace(/,/, ".")).toFixed(2),
    availability: $("#availability > span").text().trim(),
    companyname: $("a#bylineInfo").text(),
    color: pcolor,
    size: psize,
    description: [descriptionlist],
    info: infolist,
    technicalDetails: technicaldetails,
    additionalInfo: additionalinfo,
    seller: seller,
    category: pcategory,
    imagelink: pimagelink,
  };
  return product;
};

module.exports = getSingleProduct;
