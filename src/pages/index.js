import React from 'react'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import HeroSection from "../components/homepage/heroSection"
import ImageSection from "../components/homepage/imageSections"
import ArticleSection from "../components/articles/articleSection"

const IndexPage = ({ data: {allShopifyArticle, allContentfulHomepage}}) => {
  const homepageData = allContentfulHomepage.nodes[0];
  return (
    <>
      <SEO title="Home" />
      <HeroSection heroImage={homepageData.heroImage} />
      <ImageSection imageSections={homepageData.homeImageSectionItem} />
      <ArticleSection data={allShopifyArticle.edges} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyArticle(limit: 3) {
      edges {
        node {
          id
          handle
          title
          excerpt
          content
          image {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    allContentfulHomepage {
      nodes {
        homeImageSectionItem {
          imageUrl {
            fluid(toFormat: WEBP) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            fixed(width: 200, toFormat: WEBP) {
              ...GatsbyContentfulFixed_withWebp_noBase64
            }
          }
          imageLeft
          title
          description
          shopLink
        }
        heroImage {
          desktopImage {
            fluid (maxWidth: 1500, toFormat: WEBP) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          mobileImage {
            fluid (toFormat: WEBP) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          buttonText
          title
          subTitle
          imageUrl
        }
      }
    }
  }
`
