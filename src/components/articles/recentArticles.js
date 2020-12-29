import React from 'react';
import ArticleSmallBox from "./articleSmallBox";

const RecentArticles = props => {
    const articles = props.articles
    
    return (
      <>
        <h2>Recent Posts</h2>
        {
          articles.map((articleNode, articleIndex) => {
            return <ArticleSmallBox article={articleNode.node} key={articleIndex} />
          })
        }
      </>
      
    );
};

export default RecentArticles;