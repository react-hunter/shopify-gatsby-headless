import React from 'react' /* eslint-disable */
import SEO from "../components/seo"
import { graphql } from "gatsby"
import RecentArticles from "../components/articles/recentArticles"
import ShareIcons from "../components/shareIcons"

const articlePage = ({ data }) => {
    
  return (
    <>
      <SEO title={data.shopifyArticle.title} />

      <div id="article-page">
        <div className="row">
          <div className="desktop-8 mobile-3 article-col article-article">
            <div id="product-header" className="desktop-12 mobile-3">
              <span className="prev-prod desktop-1 mobile-hide"> 
              </span>
              <div className="goals-sectiont-title">
                <h1 data-acsb-original-letter-spacing-value="normal" 
                  style={{ letterSpacing: '2px' }}>{data.shopifyArticle.title}</h1>
              </div>
              <span className="next-prod desktop-1 mobile-hide"></span>
            </div>
            <div id="page" className="desktop-12 tablet-6 mobile-3">
              <div id="blog-article" className="desktop-12 tablet-12 mobile-12">
                <div id="article-body">
                  <span className="posted" 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px' }}>{data.shopifyArticle.publishedAt}</span>

                  <ShareIcons />

                  <div className="article-img">
                    <img src={data.shopifyArticle.image.src} alt="" />
                  </div>
                  <div className="clear"></div>
                  <div className="rte">
                    <div dangerouslySetInnerHTML={{__html: data.shopifyArticle.contentHtml}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="desktop-4 mobile-3 article-col article-sidebar">
            <RecentArticles articles={data.allShopifyArticle.edges} />
          </div>
        </div>
      </div>
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
