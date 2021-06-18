const typeDefs = `
  type Product {
    link: String
    title: String
    price: String
    availability: String
    companyname: String
    color: [String]
    size: [String]
    description: [String]
    info: [ProductSubInfos]
    technicalDetails: [ProductSubInfos]
    additionalInfo: [ProductSubInfos]
    seller: String
    asin: ASIN
  }

  type SProduct {
    link: String
    title: String
    price: String
    availability: String
    companyname: String
    color: String
    size: String
    description: [String]
    info: [ProductSubInfos]
    technicalDetails: [ProductSubInfos]
    additionalInfo: [ProductSubInfos]
    seller: String
    asin: String
  }

  type ProductSubInfos {
    subInfoTitle: String
    subInfo: String
  }

  type ASIN {
    asinColor: [String]
    asinSize: [String]
  }

  type VariationLinks{
    productUrl: String
    variationsLinksOfProduct:[String]
    asinColor: [String]
    asinSize: [String]
  }

  type Query {   
    getProductDetails(url: String): Product
    getLinksWithAsin(url: String):VariationLinks
    getSingleProduct(url: String): SProduct
  }
`;

module.exports = typeDefs;
