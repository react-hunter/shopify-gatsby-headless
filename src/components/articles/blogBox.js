import React from 'react';
import { Link } from 'gatsby'

const BlogBox = props => {
    const article = props.article
    
    return (
        <li className="grid__item medium-up--one-third" key={article.title}>
            <article className="blog-article" href={`/article/${article.handle}`} >
				
            <header>
              <Link to={`/article/${article.handle}`} 
                className="article__link">   
                <div className="article__grid-image-wrapper js">
                    <div className="article__grid-image-container">
                        { article.image ? 
                            (<img className="article__grid-image ls-is-cached"
                            src={article.image.src}
                            alt={article.title}
                        />) : ""
						}
                    </div>
                </div>      
              </Link>

              <Link to={`/article/${article.handle}`} className="article__link">
                <h3 className="article__title">
                    {article.title}
                </h3>
              </Link>
            </header>

              <div className="article__grid-meta">
                <div className="rte article__grid-excerpt">                
                    {article.excerpt}    
                </div>
              </div>

              <ul className="list--inline article__meta-buttons">
                <li>
                    <Link to={`/article/${article.handle}`}
                        className="btn btn--small blog-btn">
                        Read More
                    </Link>
                </li>
              </ul>
            </article>
        </li>
    );
};

export default BlogBox;