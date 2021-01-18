import React, { useState } from 'react'; /* eslint-disable */
import SEO from "../../components/common/seo";
import BlogBox from "../../components/articles/blogBox";
import IconArrowLeft from '../../images/icon-arrow-left.svg';
import IconArrowRight from '../../images/icon-arrow-right.svg';
import { ReactSVG } from 'react-svg';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dose = ({ data }) => {
    const articlePerPage = 50
    const articles = data.allShopifyArticle.edges;
    const pageCount = parseInt(data.allShopifyArticle.edges.length / articlePerPage + 1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const displayedArticles = articles.slice((currentPage - 1) * articlePerPage, currentPage * articlePerPage);
    
    const prevPage = () => {
      if(currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
    const nextPage = () => {
      if(currentPage < pageCount) {
        setCurrentPage(currentPage + 1)
      }
    }
    return (
        <>
          <SEO title="Dose of Ideas - Dose of Roses" />

          <div id="shopify-section-blog-template" className="shopify-section">
            <div id="content" className="row">
              <h2 className="goals-sectiont-title" style={{ textAlign: 'center' }}>
                <span style={{ color: '#000000' }}>
                  <span className="goals-section-text">Dose of Ideas</span>
                </span>
              </h2>
            </div>

            <ul id="blog-articles" className="desktop-12 tablet-4 mobile-3">
            {
              displayedArticles.map((article, articleIndex) => {
                return <BlogBox article={article.node} key={articleIndex} />
              })
            }
            </ul>

            <ul className="list--inline pagination">
              <li>
                <button className="btn btn--tertiary btn--narrow" onClick={prevPage} disabled={currentPage === 1}>
                  <ReactSVG src={IconArrowLeft} />
                </button>
              </li>
              <li className="pagination__text">
                Page {currentPage} of {pageCount}
              </li>
              <li>
                <button className="btn btn--tertiary btn--narrow" onClick={nextPage} disabled={currentPage === pageCount}>
                  <ReactSVG src={IconArrowRight} />
                </button>
              </li>
            </ul>
          </div>
        </>
    );
}

export default Dose;

export const query = graphql`
  query {
    allShopifyArticle {
      edges {
        node {
          id
          handle
          title
          excerptHtml
          publishedAt
          image {
            id
            src
          }
        }
      }
    }
  }
`