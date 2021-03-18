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
                gatsbyImageData(
                  width: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  layout: FULL_WIDTH
                )
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
            gatsbyImageData(
              width: 320
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              layout: FULL_WIDTH
            )
          }
          imageLeft
          title
          description
          shopLink
        }
        heroImage {
          desktopImage {
            gatsbyImageData(
              width: 1500
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              layout: FULL_WIDTH
            )
          }
          mobileImage {
            gatsbyImageData(
              width: 450
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              layout: FULL_WIDTH
            )
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
