const Axios = require("axios");
const cheerio = require("cheerio");

const getLinksWithAsin = async (_, { url }) => {
  const response = await Axios.get(url);
  const $ = await cheerio.load(response.data);

  // console.log(url.split("/"));
  // console.log(url.split("/").join("/"));
  return getlinkswithasin(url, $);
};

const getlinkswithasin = (url, $) => {
  // ASIN-Color======================
  let asincolor = [];
  $("#twister")
    .find($("#variation_color_name > ul > li"))
    .map(function (i, el) {
      asincolor.push($(el).attr("data-defaultasin"));
    });
  // ASIN-size======================
  let asinsize = [];
  $("#twister > #variation_size_name")
    .find($("select > option"))
    .map((i, el) => {
      if ($(el).attr("value") != "-1") {
        let asin = $(el)
          .attr("value")
          .slice(Math.max($(el).attr("value").length - 10, 0));
        asinsize.push(asin);
      }
    });

  $("#twister > #variation_size_name > ul > li").map((i, el) => {
    if ($(el).attr("data-defaultasin") != "") {
      asinsize.push($(el).attr("data-defaultasin"));
    } else {
      let asin = $(el)
        .attr("data-dp-url")
        .slice(Math.max($(el).attr("data-dp-url").length - 10, 0));
      asinsize.push(asin);
    }
  });

  // divides the url to an array
  let arrOfUrl = url.split("/");
  // the array contains product-variations links
  let variationslinksofproduct = [];

  // creates links of product-variations by using ASINs
  asincolor.map((asin) => {
    for (let i = 0; i < asin.length; i++) {
      arrOfUrl[5][i] = asin[i];
    }
    // arrOfUrl[5] = asin;
    variationslinksofproduct.push(arrOfUrl.join("/") + "&psc=1");
  });

  asinsize.map((asin) => {
    for (let i = 0; i < asin.length; i++) {
      arrOfUrl[5][i] = asin[i];
    }
    // arrOfUrl[5] = asin;
    variationslinksofproduct.push(arrOfUrl.join("/") + "&psc=1");
  });
  console.log(url.split("/"));
  console.log(variationslinksofproduct);
  return {
    asinColor: asincolor,
    asinSize: asinsize,
    variationsLinksOfProduct: variationslinksofproduct,
  };
};

module.exports = getLinksWithAsin;
