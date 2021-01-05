import React from 'react';
import ProductItem from "./ProductList/productItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CollectionSlider = ({products, title, handle, reviewList}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="collection-carousel">
      <div className="carousel-header_wrapper">
        <span className="carousel-header">{title}</span>
      </div>
      <div className="Best-Sellers-Carousel">
        <Slider {...settings}>
          {
            products
              .map((p, i) => {
                let product = p
                let productReview = reviewList.filter(re => re.handle === product.handle)
                return (
                  <div key={i}>
                    <ProductItem product={product} review={productReview[0]} />
                  </div>
                )
          })}
        </Slider>
      </div>
      <div className="collection-carousel-button_wrapper">
        <a className="collection-carousel-button" href={`/collections/${handle}`}>Shop {title}</a>
      </div>
    </div>
  );
};
    
export default CollectionSlider;