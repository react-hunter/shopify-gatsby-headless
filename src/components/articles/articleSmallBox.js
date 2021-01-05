import React from 'react';

const ArticleSmallBox = props => {
    const article = props.article
    
    return (
      <div className="article_sidebar-item article_sidebar-recent_posts" key={article.title}>
        <div className="article_sidebar-inner article_sidebar-recent_posts-inner">
          <div className="article_sidebar-image">
            <a href={`/article/${article.handle}`} >
              { article.image ? 
                (<img
                    key={article.image.id}
                    src={article.image.src}
                    alt={article.title}
                />) : ""
              }
            </a>
          </div>
          <div className="article_sidebar-text">
            <div className="article_sidebar-title">
              <a href={`/article/${article.handle}`} >
                <h4 data-acsb-original-letter-spacing-value="normal" 
                  style={{ letterSpacing: '2px' }}>{article.title}</h4>
              </a>
            </div>
            <div className="article_sidebar-description">
              <span data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>
                  {article.excerpt}
              </span>
            </div>
            <div className="article_sidebar-button">
              <a href={`/article/${article.handle}`}
                className="article_sidebar-btn btn--primary" 
                data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>
                  READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ArticleSmallBox;