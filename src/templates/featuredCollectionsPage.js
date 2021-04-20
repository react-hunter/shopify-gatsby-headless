import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import CollectionSlider from "../components/featuredCollectionsPage/collectionSlider";
import CollectionSliderSkeleton from "../components/featuredCollectionsPage/collectionSliderSkeleton";
import '../styles/featuredCollectionsPage.scss';
import '../styles/widget.min.css';

const FeaturedCollectionsPage = React.memo(function FeaturedCollectionsPage({
  data,
  pageContext
}) {
  const [ showContent, setShowContent ] = useState(false);
  const hideContent = showContent ? '' : 'visibility-hidden';
  const { productReviews, collections } = pageContext;
  console.log(data.allShopifyCollection.edges);
  console.log('collections: ', collections);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="collection-collections-spacing">
        <div id="shopify-section-collection-collections" className="shopify-section">
          <div className="collections-collection-section">
            <div className="you-may-like_header_wrapper">
              <span className="you-may-like_header">FEATURED COLLECTIONS</span>
              <span className="you-may-like_header_underline"></span>
            </div>
            {!showContent && <CollectionSliderSkeleton />}
            <div className={`${hideContent}`}>
              {data.allShopifyCollection.edges.map((collection, collectionIndex) => {
                return (
                  <CollectionSlider
                    products={collection.node.products.slice(0, 10)}
                    title={collection.node.title}
                    handle={collection.node.handle}
                    reviewList={productReviews}
                    badgeStyles={data.allContentfulCollectionBadgeStyleItem.edges}
                    key={collectionIndex}
                  />
                )
              })}
            </div>
         </div>
        </div>
      </div>
    </>
  )
});

FeaturedCollectionsPage.displayName = 'FeaturedCollectionsPage';

export default FeaturedCollectionsPage;

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
            productType
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
    allContentfulCollectionBadgeStyleItem {
      edges {
        node {
          name
          image {
            gatsbyImageData
            file {
              url
            }
          }
        }
      }
    }
  }
`
