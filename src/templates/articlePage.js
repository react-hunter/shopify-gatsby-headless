/* eslint-disable */
import React from 'react'
import loadable from '@loadable/component';
import MyImage from '../components/common/lazyImage'
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import ShareIcons from "../components/common/shareIcons"
import "../styles/blogs.scss";
const RecentArticles = loadable(() => import("../components/articles/recentArticles"))


const ArticlePage = React.memo(function ArticlePage({ data, ...other }) {
  const article = data.shopifyArticle
  const changeDateFormat = (dataStr) => {
    let mydate = new Date(dataStr);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mydate.getMonth()];
    var str = month + ' ' + mydate.getDay() + ',' + mydate.getFullYear();
    return str;
  }

  return (
    <>
      <SEO
        title={`${article.title} - Dose of Roses`}
        mainTitle={article.title}
        description={article.content}
        type="article"
      />

      <div id="article-page">
        <div className="row">
          <div className="desktop-8 mobile-3 article-col article-article">
            <div id="product-header" className="desktop-12 mobile-3">
              <span className="prev-prod desktop-1 mobile-hide"> 
              </span>
              <div className="goals-sectiont-title">
                <h1>{article.title}</h1>
              </div>
              <span className="next-prod desktop-1 mobile-hide"></span>
            </div>
            <div id="page" className="desktop-12 tablet-6 mobile-3">
              <div id="blog-article" className="desktop-12 tablet-12 mobile-12">
                <div id="article-body">
                  <span className="posted">{changeDateFormat(article.publishedAt)}</span>

                  <ShareIcons 
                    articleUrl={article.url}
                    articleMedia={article.image.src}
                  />

                  <div className="article-img">
                    <MyImage src={article.image.src} alt="" />
                  </div>
                  <div className="clear"></div>
                  <div className="rte">
                    <div dangerouslySetInnerHTML={{__html: article.contentHtml}} />
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
});

ArticlePage.displayName = 'ArticlePage';

export default ArticlePage;

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
