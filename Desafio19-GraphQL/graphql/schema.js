import { buildSchema } from 'graphql';

export default buildSchema(`
  type Product {
    id: ID!
    title: String
    thumbnail: String
    price: Int
    stock: Int
  }
  input ProductInput {
    title: String
    thumbnail: String
    price: Int
    stock: Int
  }
  type Query {
    getProducts(query: String): [Product]
    getProductById(id: ID!): Product
  }
  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, data: ProductInput!): Product
    deleteProductById(id: ID!): Product
  }
`);