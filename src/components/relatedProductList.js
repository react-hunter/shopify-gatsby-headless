import React from 'react';
import ProductItem from "./ProductList/productItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/relatedProductList.scss";

const RelatedProductList = ({ products }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <Slider {...settings}>
            {
              products
                .map((p, i) => {
                  let product = p
                  return (
                    <div key={i}>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default RelatedProductList;