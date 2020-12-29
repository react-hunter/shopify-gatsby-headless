import React from 'react' /* eslint-disable */
import SEO from "../components/seo"
import { graphql } from "gatsby"
import RecentArticles from "../components/articles/recentArticles"

const articlePage = ({ data }) => {
    
  return (
    <>
      <SEO title={data.shopifyArticle.title} />
      <h2>{data.shopifyArticle.title}</h2>
      <p>{data.shopifyArticle.publishedAt}</p>
      <img src={data.shopifyArticle.image.src} alt="" />
      <div dangerouslySetInnerHTML={{__html: data.shopifyArticle.contentHtml}} />
      
      <RecentArticles articles={data.allShopifyArticle.edges} />
    </>
  )
}

export default articlePage

export const query = graphql`
  query($id: String!){
		shopifyArticle(handle: {eq: $id}) {
			blog {
        id
      }
      title
      content
      contentHtml
      id
      handle
      url
      image {
        id
        src
      }
      publishedAt
    }
    allShopifyArticle(limit: 10) {
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
