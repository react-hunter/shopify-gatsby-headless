import React from 'react';
import { graphql } from "gatsby";
import Preloader from "../components/common/preloader"
import CollectionSlider from "../components/featuredCollectionsPage/collectionSlider";
import '../styles/featuredCollectionsPage.scss';

const featuredCollectionsPage = ({ data, pageContext }) => {
  const { productReviews } = pageContext;
  return (
    <>
      {/* <Preloader /> */}
      <div className="collection-collections-spacing">
        <div id="shopify-section-collection-collections" className="shopify-section">
          <div className="collections-collection-section">
            <div className="you-may-like_header_wrapper">
              <span className="you-may-like_header">FEATURED COLLECTIONS</span>
              <span className="you-may-like_header_underline"></span>
            </div>
           {
            data.allShopifyCollection.edges.map((collection, collectionIndex) => {
              return <CollectionSlider
                        products={collection.node.products.slice(0, 10)}
                        title={collection.node.title}
                        handle={collection.node.handle}
                        reviewList={productReviews}
                        key={collectionIndex}
                      />
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
            tags
            options {
              id
              name
              values
            }
            images {
              originalSrc
            }
            variants {
              id
              title
              availableForSale
              price
              shopifyId
              compareAtPrice
              image {
                originalSrc
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`
