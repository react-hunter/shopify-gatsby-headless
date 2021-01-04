import React from 'react';
import { graphql } from "gatsby";
import CollectionSlider from "../components/collectionSlider";
import './featuredCollectionsPage.scss';

const featuredCollectionsPage = ({ data }) => {
  return (
    <>
      <div className="collection-collections-spacing">
        <div id="shopify-section-collection-collections" className="shopify-section">
         <div className="collections-collection-section">
           <div className="you-may-like_header_wrapper">
             <span className="you-may-like_header">FEATURED COLLECTIONS</span>
             <span className="you-may-like_header_underline"></span>
           </div>

           {
            data.allShopifyCollection.edges.map((collection, collectionIndex) => {
              return <CollectionSlider key={collectionIndex} products={collection.node.products} title={collection.node.title} handle={collection.node.handle} />
            })
           }
         </div>
        </div>
      </div>
      
      
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
