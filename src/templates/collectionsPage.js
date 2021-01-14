import React from 'react';
import { graphql } from "gatsby";
import Preloader from "../components/common/preloader"
import CollectionSlider from "../components/collectionsPage/collectionSlider";
import '../styles/featuredCollectionsPage.scss';

const featuredCollectionsPage = ({ data, pageContext }) => {
  const { productReviews } = pageContext;
  return (
    <>
      <Preloader />
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
                        key={collectionIndex}
                        products={collection.node.products}
                        title={collection.node.title}
                        handle={collection.node.handle}
                        reviewList={productReviews}
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
