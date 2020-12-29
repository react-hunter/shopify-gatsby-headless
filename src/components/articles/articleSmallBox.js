import React from 'react';

const ArticleSmallBox = props => {
    const article = props.article
    
    return (
      <div key={article.title}>
          <a href={`/article/${article.handle}`} >
            { article.image ? 
              (<img
                  key={article.image.id}
                  src={article.image.src}
                  alt={article.title}
              />) : ""
            }
            <p>{article.title}</p>
            <p>{article.excerpt}</p>
          </a>
      </div>
    );
};

export default ArticleSmallBox;