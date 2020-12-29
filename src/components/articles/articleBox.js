import React from 'react';

const ArticleBox = props => {
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
              <p className="has-text-weight-semibold has-text-black">{article.title}</p>
              <p>{article.excerpt}</p>
            </a>
        </div>
    );
};

export default ArticleBox;