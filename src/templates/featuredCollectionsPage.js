import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import CollectionSlider from "../components/featuredCollectionsPage/collectionSlider";
import CollectionSliderSkeleton from "../components/featuredCollectionsPage/collectionSliderSkeleton";
import '../styles/featuredCollectionsPage.scss';
import '../styles/widget.min.css';

const FeaturedCollectionsPage = ({ data, pageContext }) => {
  const [ showContent, setShowContent ] = useState(false);
  const { productReviews } = pageContext;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
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
            {showContent ? 
              data.allShopifyCollection.edges.map((collection, collectionIndex) => {
                return (
                  <CollectionSlider
                    products={collection.node.products.slice(0, 10)}
                    title={collection.node.title}
                    handle={collection.node.handle}
                    reviewList={productReviews}
                    key={collectionIndex}
                    placeholderImage={data.placeholderImage.childImageSharp.gatsbyImageData}
                  />
                )
              }) :
              <CollectionSliderSkeleton />
            }
         </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedCollectionsPage

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
              imageData: localFile {
                childImageSharp {
                  gatsbyImageData (
                    width: 500
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                    layout: CONSTRAINED
                  )
                }
              }
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
                imageData: localFile {
                  childImageSharp {
                    gatsbyImageData (
                      width: 500
                      placeholder: BLURRED
                      formats: [AUTO, WEBP]
                      layout: CONSTRAINED
                    )
                  }
                }
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
    placeholderImage: file(relativePath: { regex: "/placeholder_500x.png/" }) {
      childImageSharp {
        gatsbyImageData (
          width: 500
          placeholder: BLURRED
          formats: [AUTO, WEBP]
          layout: CONSTRAINED
        )
      }
    }
  }
`
