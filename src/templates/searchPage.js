/* eslint-disable */
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import CollectionProductBox from "../components/collectionPage/collectionProductBox"
import '../styles/widget.min.css';

const SearchPage = ( { data, pageContext, location } ) => {
  const { searchText } = location.search ? queryString.parse(location.search) : { searchText: ''}
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const { productReviews } = pageContext;
  
  useEffect(() => {
    const allProducts = data.allShopifyProduct.edges.map(pr => pr.node)
    const filteredProductList = allProducts.filter(pr => pr.title.toUpperCase().includes(searchText.toUpperCase()) || 
                                                        pr.productType.toUpperCase().includes(searchText.toUpperCase()));
    setFilteredProducts(filteredProductList);
  }, [data.allShopifyProduct.edges, searchText]);

  const findReview = (pHandle) => {
    const review = productReviews.filter(pr => pr.handle === pHandle)
    return review[0]
  }

  return (
    <>
      <SEO
        title={`Search results: 264 results for "${searchText}" - Dose of Roses`}
        mainTitle={`Search results: 264 results for "${searchText}"`}
        description="Shop the largest selection of luxury gifts from our best-selling Rose Bear, Galaxy Rose or choose to customize and personalize your Rose Box. Send beautiful real roses that last up to 5 years."
        type="website"
      />

      <div className="main-content js-focus-hidden"  id="searchContent">
        <hr aria-hidden="true" />
        <div className="search-results-header_wrapper">
          <h2>Search results</h2>
        </div>
        <ul className="grid" id="shop-all-content">
          {filteredProducts.map((p, i) => (
            !p ?
              <p>Nothings with : {searchText} </p>
              :
              <CollectionProductBox
                product={p}
                review={findReview(p.handle)}
                badgeStyles={data.allContentfulCollectionBadgeStyleItem.edges}
                key={i}
              />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchPage

export const query = graphql`
  query {
    allShopifyProduct {
      edges {
        node {
            id
            title
            handle
            tags
            createdAt(fromNow: true)
            publishedAt
            productType
            vendor
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            images {
              originalSrc
              id
            }
            variants {
              id
              title
              availableForSale
              price
              shopifyId
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
