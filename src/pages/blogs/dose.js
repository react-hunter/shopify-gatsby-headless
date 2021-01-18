import React, { useState } from 'react'; /* eslint-disable */
import SEO from "../../components/common/seo";
import BlogBox from "../../components/articles/blogBox";

const Dose = ({ data }) => {
    const articlePerPage = 2
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
            <h2>DOSE OF IDEAS</h2>
            <ul id="blog-articles" className="desktop-12 tablet-4 mobile-3">
            {
              displayedArticles.map((article, articleIndex) => {
                return <BlogBox article={article.node} key={articleIndex} />
              })
            }
            </ul>
            <ul className="list--inline pagination">
              <li>
                <button className="btn btn--tertiary btn--narrow" onClick={prevPage} disabled={currentPage === 1}>prev</button>
              </li>
              <li>
                Page {currentPage} of {pageCount}
              </li>
              <li>
                <button className="btn btn--tertiary btn--narrow" onClick={nextPage} disabled={currentPage === pageCount}>next</button>
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