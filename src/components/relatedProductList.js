import React from 'react';
import ProductItem from "./ProductList/productItem"

const RelatedProductList = ({ products }) => {
  console.log('products', products);

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-multiline" style={{ margin: "0" }}>
            {
              products
                .map((p, i) => {
                  let product = p
                  return (
                    <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProductList;