import React from 'react'
import { graphql } from "gatsby"
import SEO from "../components/common/seo"
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
                  layout: CONSTRAINED
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
          desktopImage: imageUrl {
            gatsbyImageData(
              width: 500
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              layout: CONSTRAINED
            )
          }
          mobileImage: imageUrl {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              layout: CONSTRAINED
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
              width: 600
              placeholder: BLURRED,
              quality: 80,
              formats: [AUTO, WEBP]
              layout: CONSTRAINED
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
