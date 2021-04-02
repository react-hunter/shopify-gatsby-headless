import React from 'react';
import ArticleSmallBox from "./articleSmallBox";

const RecentArticles = React.memo(function RecentArticles(props) {
  const articles = props.articles
  
  return (
    <>
      <h3 className="article_sidebar-section-title">
        RECENT POSTS
      </h3>
      {
        articles.map((articleNode, articleIndex) => {
          return <ArticleSmallBox article={articleNode.node} key={articleIndex} />
        })
      }
    </>
    
  );
});

RecentArticles.displayName = 'RecentArticles';

export default RecentArticles;