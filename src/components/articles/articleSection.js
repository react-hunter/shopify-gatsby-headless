import React from 'react';
import ArticleBox from "./articleBox";

const ArticleSection = ({ data }) => {
  const articles = data
  
  return (
    <div className="shopify-section index-section">
      <div className="blog-container">
        <header className="blog-header section-header text-center">
          <h2 data-acsb-original-letter-spacing-value="2px" 
            style={{ letterSpacing: "4px" }}>Blog</h2>
        </header>

        <ul className="grid grid--uniform grid--blog">
          { articles
            .map((a, i) => {
              let article = a.node
              return (
                <ArticleBox article={article} />
              )
            })}
        </ul>

        <div className="blog-view-all text-center">
          <a href="/blogs/dose" 
            className="btn blog-btn view-all" 
            aria-label="View all blogs" 
            data-acsb-original-letter-spacing-value="1.12px"
            style={{ letterSpacing: '3.12px' }}>
            View all
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;