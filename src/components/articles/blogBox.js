import React from 'react';
import { Link } from 'gatsby'
import MyImage from '../common/lazyImage'

const BlogBox = props => {
  const article = props.article
  let date = changeDateFormat();
  function changeDateFormat(){
    let mydate = new Date(article.publishedAt);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mydate.getMonth()];
    var str = month + ' ' + mydate.getDay() + ',' + mydate.getFullYear();
    return str;
  }

  return (
    <div className="single-article" key={article.title}>
      <div className="article-content">
        <Link to={`/article/${article.handle}`}>
          { article.image ? 
              (<MyImage className="article__grid-image ls-is-cached"
              src={article.image.src}
              alt={article.title}
          />) : "" }
        </Link>
      </div>

      <div className="article-body">
        <h3><Link to={`/article/${article.handle}`}>{article.title}</Link></h3>
        <div className="clear"></div>
        <div className="rte">
          <meta charSet="utf-8" />
          <div dangerouslySetInnerHTML={{ __html: article.excerptHtml }}></div>
        </div>
      </div>

      <div className="article-bottom">
        <div className="article-additional">
          <span className="posted">{date}</span>
          <span className="comment-count"><i className="fas fa-comment" aria-hidden="true"></i> 0</span>
        </div>
        <Link to={`/article/${article.handle}`} className="article-btn">Read more</Link>
      </div>
    </div>
  );
};

export default BlogBox;