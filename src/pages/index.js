import React from 'react'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import HeroSection from "../components/homepage/heroSection"
import ImageSection from "../components/homepage/imageSections"
import ArticleSection from "../components/articles/articleSection"

const IndexPage = ({ data }) => {
  return (
    <>
      <Preloader />
      <SEO title="Home" />
      <HeroSection heroDesktop={data.heroDesktop.childImageSharp.fluid} heroMobile={data.heroMobile.childImageSharp.fluid} />
      <ImageSection 
        homeGoldRose={data.homeGoldRose.childImageSharp.fluid}
        homeLeatherLarge={data.homeLeatherLarge.childImageSharp.fluid}
        homeMarbleLarge={data.homeMarbleLarge.childImageSharp.fluid} 
        homeRoseBear={data.homeRoseBear.childImageSharp.fluid}
        homeRoundRed={data.homeRoundRed.childImageSharp.fluid}
        homeRoundRose={data.homeRoundRose.childImageSharp.fluid}
      />
      <ArticleSection data={data.allShopifyArticle.edges} />
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
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
    heroDesktop: file(relativePath: { eq: "hero_desktop.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    heroMobile: file(relativePath: { eq: "hero_mobile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeGoldRose: file(relativePath: { eq: "home_gold_rose.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeLeatherLarge: file(relativePath: { eq: "home_leather_large.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeMarbleLarge: file(relativePath: { eq: "home_marble_large.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeRoseBear: file(relativePath: { eq: "home_rose_bear.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeRoundRed: file(relativePath: { eq: "home_round_red.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeRoundRose: file(relativePath: { eq: "home_round_rose.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
