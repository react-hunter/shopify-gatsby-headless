import React from 'react';
import { Link } from 'gatsby'
import ArticleBox from "./articleBox";

const ArticleSection = React.memo(function ArticleSection({ data }) {
  const articles = data
  
  return (
    <div className="shopify-section index-section">
      <div className="blog-container">
        <header className="blog-header section-header text-center">
          <h2>Blog</h2>
        </header>

        <ul className="grid grid--uniform grid--blog">
          { articles
            .map((a, i) => {
              let article = a.node
              return (
                <ArticleBox article={article} key={i} />
              )
            })}
        </ul>

        <div className="blog-view-all text-center">
          <Link to="/blogs/dose" className="btn blog-btn view-all" aria-label="View all blogs">Read More</Link>
        </div>
      </div>
    </div>
  );
});

export default ArticleSection;