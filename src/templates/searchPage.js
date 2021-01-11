import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import ProductBox from "../components/ProductList/productBox"

const SearchPage = ( { data, pageContext, location } ) => {
  const { searchText: initialSearchText} = location.search ? queryString.parse(location.search) : { searchText: ''}
  const [ searchText, setSearchText ] = useState(initialSearchText)
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
        <div class="search-results-header_wrapper">
          <h2 class="">Search results</h2>
        </div>
        <ul class="grid" id="shop-all-content">
          {filteredProducts.map((p, i) => (
            !p ?
              <p>Nothings with : {searchText} </p>
              :
              <ProductBox product={p} review={findReview(p.handle)} key={i} />
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
              localFile {
                childImageSharp {
                  fluid(maxWidth: 910) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
            variants {
              id
              title
              price
            }
        }
      }
    }
  }
`
