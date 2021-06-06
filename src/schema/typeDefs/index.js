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
  }

  type ProductSubInfos {
    subInfoTitle: String
    subInfo: String
  }

  type Query {   
    getProductDetails(url: String): Product
  }
`;

module.exports = typeDefs;
