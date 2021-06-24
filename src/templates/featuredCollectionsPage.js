/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import SEO from "../components/common/seo"
import CollectionSlider from "../components/featuredCollectionsPage/collectionSlider";
import '../styles/featuredCollectionsPage.scss';
import '../styles/widget.min.css';
import CollectionSliderNonRoseSkeleton from '../components/featuredCollectionsPage/collectionSliderNonRoseSkeleton';

const FeaturedCollectionsPage = React.memo(function FeaturedCollectionsPage({
  data,
  pageContext
}) {
  const [showContent, setShowContent] = useState(false);
  const hideContent = showContent ? '' : 'visibility-hidden';
  const { productReviews, collections } = pageContext;
  const collectionList = collections.map(col => {
    return data.allShopifyCollection.edges.find(collectionItem => collectionItem.node.handle === col)
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title="Featured Collections - Dose of Roses" />
      <div className="collection-collections-spacing">
        <div id="shopify-section-collection-collections" className="shopify-section">
          <div className="collections-collection-section">
            <div className="you-may-like_header_wrapper">
              <span className="you-may-like_header">FEATURED COLLECTIONS</span>
              <span className="you-may-like_header_underline"></span>
            </div>
            {/* {!showContent && <div className="skeleton-wrapper">
            <CollectionSliderNonRoseSkeleton />
              </div>} */}
            {!showContent &&
              <CollectionSliderNonRoseSkeleton /> }
              <div >
                {collectionList.map((collection, collectionIndex) => {
                  return (
                    <CollectionSlider
                      products={collection.node.products.slice(0, 10)}
                      protectionProduct={data.protectionProduct}
                      title={collection.node.title}
                      handle={collection.node.handle}
                      reviewList={productReviews}
                      badgeStyles={data.allContentfulCollectionBadgeStyleItem.edges}
                      key={collectionIndex}
                      hideContent ={`${hideContent}`}
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
            descriptionHtml
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
    protectionProduct: shopifyProduct(handle: {eq: "order-protection"}) {
      id
      shopifyId
      variants {
        id
        shopifyId
        price
      }
    }
  }
`
