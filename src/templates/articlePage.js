import React from 'react' /* eslint-disable */
import MyImage from '../components/common/lazyImage'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import RecentArticles from "../components/articles/recentArticles"
import ShareIcons from "../components/common/shareIcons"
import "../styles/blogs.scss";


const articlePage = ({ data }) => {
    
  let date = changeDateFormat();
  function changeDateFormat(){
    let mydate = new Date(data.shopifyArticle.publishedAt);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mydate.getMonth()];
    var str = month + ' ' + mydate.getDay() + ',' + mydate.getFullYear();
    return str;
  }

  return (
    <>
      {/* <Preloader /> */}
      <SEO title={data.shopifyArticle.title} />

      <div id="article-page">
        <div className="row">
          <div className="desktop-8 mobile-3 article-col article-article">
            <div id="product-header" className="desktop-12 mobile-3">
              <span className="prev-prod desktop-1 mobile-hide"> 
              </span>
              <div className="goals-sectiont-title">
                <h1>{data.shopifyArticle.title}</h1>
              </div>
              <span className="next-prod desktop-1 mobile-hide"></span>
            </div>
            <div id="page" className="desktop-12 tablet-6 mobile-3">
              <div id="blog-article" className="desktop-12 tablet-12 mobile-12">
                <div id="article-body">
                  <span className="posted">{date}</span>

                  <ShareIcons 
                    articleUrl={data.shopifyArticle.url}
                    articleMedia={data.shopifyArticle.image.src}
                  />

                  <div className="article-img">
                    <MyImage src={data.shopifyArticle.image.src}
                      alt="" loading="eager" />
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
