import React from 'react';
import RelatedProductBox from "../productBox/relatedProductBox"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/relatedProductList.scss";

const RelatedProductList = ({ products, reviewList }) => {
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
                  const productReview = reviewList.filter(re => re.handle === product.handle)
                  return (
                    <div key={i}>
                      <RelatedProductBox product={product} review={productReview[0]} />
                    </div>
                  )
            })}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedProductList;