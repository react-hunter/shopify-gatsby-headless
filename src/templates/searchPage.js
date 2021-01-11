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
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="field">
              <p className="control has-icons-right">
                <input className="input is-large" name="value" type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search" />
                <span className="icon is-right">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="hero-body">
              <h1 className="is-size-5 has-text-medium">RESULTS FOR "{searchText.toUpperCase()}" :</h1>
          </div>
          <div className="container">
            <div className="columns is-multiline ">
              {filteredProducts.map((p, i) => (
                !p ?
                  <p>Nothings with : {searchText} </p>
                  :
                  <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                    <ProductBox product={p} review={findReview(p.handle)} />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
