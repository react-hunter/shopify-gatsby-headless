import React from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import HeroSection from "../components/homepage/heroSection"
import ImageSection from "../components/homepage/imageSections"
import ArticleSection from "../components/articles/articleSection"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <HeroSection />
      <ImageSection />
      <ArticleSection data={data.allShopifyArticle.edges} />
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
    allShopifyArticle(limit: 3) {
      edges {
        node {
          id
          handle
          title
          excerpt
          content
          image {
            id
            src
          }
        }
      }
    }
  }
`