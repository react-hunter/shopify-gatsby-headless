import React, { useState, useEffect } from 'react'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import HeroSection from "../components/homepage/heroSection"
import ImageSection from "../components/homepage/imageSections"
import ArticleSection from "../components/articles/articleSection"
import { client } from '../contentful';

const IndexPage = ({ data }) => {
  const [homeData, setHomeData] = useState({
    heroImage: {
      desktopImage: null,
      mobileImage: null,
      imageUrl: '/collections/best-sellers',
      title: "VALENTINE'S DAY BEST-SELLERS",
      subTitle: "Due to extremely high demand and COVID-19 delays, schedule your Valentine's Day Gift before it's sold out with scheduled delivery!",
      buttonText: 'SHOP NOW'
    },
    imageSections: []
  });
  useEffect(() => {
    async function getHomeData() {
      const homeEntry = await client.getEntries({'content_type': 'homepage'});
      console.log('hero: ', homeEntry)
      setHomeData({
        heroImage: homeEntry.items[0].fields.heroImage.fields,
        imageSections: homeEntry.items[0].fields.homeImageSectionItem
      });
    }

    getHomeData();
  }, [])
  return (
    <>
      <Preloader />
      <SEO title="Home" />
      <HeroSection heroImage={homeData.heroImage} />
      <ImageSection imageSections={homeData.imageSections} />
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
  }
`
