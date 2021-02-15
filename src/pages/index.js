import React from 'react'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import HeroSection from "../components/homepage/heroSection";
import ImageSection from "../components/homepage/imageSections";
import ArticleSection from "../components/articles/articleSection";

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
            id
            src
          }
        }
      }
    }
    allContentfulHomepage {
      nodes {
        homeImageSectionItem {
          imageUrl {
            fluid (maxWidth: 800) {
              srcWebp
            }
          }
          imageLeft
          title
          description
          shopLink
        }
        heroImage {
          desktopImage {
            fluid (maxWidth: 1000) {
              srcWebp
            }
          }
          mobileImage {
            fluid (maxWidth: 500) {
              srcWebp
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
