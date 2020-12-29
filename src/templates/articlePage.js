import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import SEO from "../components/seo"
import { graphql } from "gatsby"

const articlePage = ({ data }) => {
    
  return (
    <>
      <SEO title={data.shopifyArticle.title} />
      { data.shopifyArticle.contentHtml }
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
