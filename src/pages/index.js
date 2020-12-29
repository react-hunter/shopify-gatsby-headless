import React from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
// import ProductList from '../components/productList';
import ProjectIdea from "../components/projectIdea"

import HeroSection from "../components/heroSection"
import ImageSection from "../components/imageSections"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <HeroSection />
      {/* <ProductList data={data} />
      <ProjectIdea img={data.projectIdea.childImageSharp.fluid}/> */}
      <ImageSection />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    projectIdea: file(relativePath: {eq: "undraw_web_shopping_dd4l.png"}) {
         childImageSharp {
            fluid(maxWidth: 1000) {
               ...GatsbyImageSharpFluid
            }
         }
    }
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
