const typeDefs = `

  type Product {
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
    category: String
  }

  type ProductSubInfos {
    subInfoTitle: String
    subInfo: String
  }

  type VariationLinks{
    productUrl: String
    variationsLinksOfProduct:[String]
    asinColor: [String]
    asinSize: [String]
  }

  type Query {   
    getLinksWithAsin(url: String):VariationLinks
    getSingleProduct(url: String): Product
  }
`;

module.exports = typeDefs;
