import React from 'react';
import { graphql } from "gatsby";
import CollectionSlider from "../components/collectionSlider";

const featuredCollectionsPage = ({ data }) => {
  return (
    <>
      <h1>FEATURED COLLECTIONS</h1>
      {
        data.allShopifyCollection.edges.map((collection, collectionIndex) => {
          return <CollectionSlider key={collectionIndex} products={collection.node.products} title={collection.node.title} />
        })
      }
    </>
  )
}

export default featuredCollectionsPage

export const query = graphql`
  query GetShopifyCollections($collections: [String]){
    allShopifyCollection(filter: {handle: {in: $collections}}) {
      edges {
        node {
          handle
          title
          products {
            id
            handle
            title
            images {
              originalSrc
            }
            variants {
              id
              availableForSale
              price
            }
          }
        }
      }
    }
  }
`
