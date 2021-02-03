import React from 'react';
import ProductBox from "../common/product/productBox"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/relatedProductList.scss";

import Glider, {GliderMethods} from 'react-glider';
import 'glider-js/glider.min.css';

const RelatedProductList = ({ products, reviewList }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    // slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          //slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          //slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          //slidesToScroll: 1
          swipeToSlide: true,
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
      <div className="Best-Sellers-Carousel">

      <Glider draggable={true} scrollLock={true} duration={1} slidesToShow={2}
          arrows= {{
            prev: <button type="button" id="prev" className="slick-arrow slick-prev"> Previous</button>,
            next: <button type="button" id="next" className="slick-arrow slick-next"> Next</button>
          }}
          responsive={[{
            // screens greater than >= 775px
            breakpoint: 775,
            settings: {
              // Set to `auto` and provide item width to adjust to viewport
              slidesToShow: 2,
            }
          },{
            // screens greater than >= 1024px
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            }
          }
        ]}>
          {
            products
              .map((p, i) => {
                let product = p
                const productReview = reviewList.filter(re => re.handle === product.handle)
                return (
                  <div key={i}>
                    <ProductBox product={product} review={productReview[0]} />
                  </div>
                )
          })}
        </Glider>

        {/* <Slider {...settings}>
            {
              products
                .map((p, i) => {
                  let product = p
                  const productReview = reviewList.filter(re => re.handle === product.handle)
                  return (
                    <div key={i}>
                      <ProductBox product={product} review={productReview[0]} />
                    </div>
                  )
            })}
        </Slider> */}
      </div>
    </div>
  );
};

export default RelatedProductList;