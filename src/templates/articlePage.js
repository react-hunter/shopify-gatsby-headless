import React from 'react' /* eslint-disable */
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ArticleSmallBox from "../components/articles/articleSmallBox"

const articlePage = ({ data }) => {
    
  return (
    <>
      <SEO title={data.shopifyArticle.title} />
      { data.shopifyArticle.contentHtml }
      {
        data.allShopifyArticle.edges.map((articleNode, articleIndex) => {
          <ArticleSmallBox article={articleNode} key={articleIndex} />
        })
      }
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
