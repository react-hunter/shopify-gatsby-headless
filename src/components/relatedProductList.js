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
    <div className="you-may-like_section">
      <div className="you-may-like_header_wrapper">
        <span className="you-may-like_header">YOU MAY ALSO LIKE</span>
        <span className="you-may-like_header_underline"></span>
      </div>
      <div className="Best-Sellers-Carousel glider draggable">
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
  );
};

export default RelatedProductList;