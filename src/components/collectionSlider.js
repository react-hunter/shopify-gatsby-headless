import React from 'react';
import ProductItem from "./ProductList/productItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CollectionSlider = ({products, title}) => {
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
          <h1>{title}</h1>
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
    
export default CollectionSlider;