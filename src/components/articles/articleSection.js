import React from 'react';
import ArticleBox from "./articleBox";

const ArticleSection = ({ data }) => {
  const articles = data
  
  return (
    <section className="article-list">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-multiline" style={{ margin: "0" }}>
            {
              articles
                .map((a, i) => {
                  let article = a.node
                  return (
                    <div className="column is-4" style={{ marginBottom: "40px" }} key={i}>
                      <ArticleBox article={article} />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;