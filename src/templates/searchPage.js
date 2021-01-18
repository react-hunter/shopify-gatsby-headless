import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import CollectionProductBox from "../components/collectionPage/collectionProductBox"

const SearchPage = ( { data, pageContext, location } ) => {
  const { searchText } = location.search ? queryString.parse(location.search) : { searchText: ''}
  const [ filteredProducts, setFilteredProducts ] = useState([])
  const { productReviews } = pageContext;
  
  useEffect(() => {
    const allProducts = data.allShopifyProduct.edges.map(pr => pr.node)
    const filteredProductList = allProducts.filter(pr => pr.title.toUpperCase().includes(searchText.toUpperCase()) || 
                                                        pr.productType.toUpperCase().includes(searchText.toUpperCase()));
    setFilteredProducts(filteredProductList)
  }, [data.allShopifyProduct.edges, searchText]);

  const findReview = (pHandle) => {
    const review = productReviews.filter(pr => pr.handle === pHandle)
    return review[0]
  }

  return (
    <>
      <Preloader />
      <SEO title="Home" />

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
              <CollectionProductBox product={p} review={findReview(p.handle)} key={i} />
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
  }
`
