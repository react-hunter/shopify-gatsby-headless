import React from 'react'
import { useQuery } from 'react-query'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import HeroSection from "../components/homepage/heroSection"
import ImageSection from "../components/homepage/imageSections"
import ArticleSection from "../components/articles/articleSection"
import { client } from '../contentful';

const IndexPage = ({ data: {allShopifyArticle}}) => {
  let homeData = {
    heroImage: {
      desktopImage: null,
      mobileImage: null,
      imageUrl: '/collections/best-sellers',
      title: "VALENTINE'S DAY BEST-SELLERS",
      subTitle: "Due to extremely high demand and COVID-19 delays, schedule your Valentine's Day Gift before it's sold out with scheduled delivery!",
      buttonText: 'SHOP NOW'
    },
    imageSections: []
  };
  async function getHomeEntry() {
    return await client.getEntries({'content_type': 'homepage'})
  }
  const { isLoading, data } = useQuery('homeQuery', getHomeEntry);
  if (!isLoading) {
    homeData = {
      ...homeData,
      heroImage: data.items[0].fields.heroImage.fields,
      imageSections: data.items[0].fields.homeImageSectionItem
    }
  }
  return (
    <>
      {/* {
        isLoading ? <Preloader /> : (
          <> */}
            <SEO title="Home" />
            <HeroSection heroImage={homeData.heroImage} />
            <ImageSection imageSections={homeData.imageSections} />
            <ArticleSection data={allShopifyArticle.edges} />
          {/* </>
        )
      } */}
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
  }
`
