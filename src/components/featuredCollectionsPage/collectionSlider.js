import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby'
import CollectionVariantSelector from '../collectionPage/collectionVariantSelector'
import FeaturedProductBox from "../common/product/featuredProductBox"
import NotifyModal from "../collectionPage/notifyModal"
import { client } from "../../contentful"
import "../../styles/collectionPage.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Glider, {GliderMethods} from 'react-glider';
import 'glider-js/glider.min.css';

const CollectionSlider = ({products, title, handle, reviewList}) => {
  const [notifyModalShow, setNotifyModalShow] = useState(false);
  const [badgeStyles, setBadgeStyles] = useState([]);
  const [varaintModalShow, setVaraintModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    async function getBadgeData() {
      const badgeStyleData = await client.getEntries({'content_type': 'collectionBadgeStyleItem'});
      setBadgeStyles(badgeStyleData.items);
    }
    setHoverEffectsForCollection();
    getBadgeData();
  }, [])

  function setHoverEffectsForCollection() {

    const allFirstImageElements = document.querySelectorAll(".disableSaveImageIOS");
    for (let i = 0; i < allFirstImageElements.length; i++) {
  
      allFirstImageElements[i].on('touchstart', function () {  
        this.toggleClass('hover_effect');
      });
  
    }
  }
  const showNotifyModal = () => {
    setNotifyModalShow(true)
  }
  const showVariantModal = (p) => {
    setSelectedProduct(p);
    setVaraintModalShow(true);
  }

  const closeNotifyModal = () => {
    document.querySelector(".klav-popup").classList.remove("fade-in");
    document.querySelector(".klav-popup").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".klav-popup").classList.remove("fade-out");
        setNotifyModalShow(false);
    }, 500)
  }
  const closeCollectionModal = () => {
    document.querySelector(".variantSelector_wrapper").classList.remove('animate-bottom');
    document.querySelector(".variantSelector_wrapper").classList.add('animate-top');

    setTimeout(() => {
        document.querySelector(".variantSelector_wrapper").classList.remove('animate-top');
        setVaraintModalShow(false);
        document.getElementsByTagName("html")[0].classList.remove("no-scroll");
        document.querySelector(".scrollPreventer").style.overflow = "visible";
    }, 550)
  }
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    speed: 5000,
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
          //slidesToScroll: 1
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
    <div className="collection-carousel">
      <div className="carousel-header_wrapper">
        <span className="carousel-header">{title}</span>
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
              let productReview = reviewList.filter(re => re.handle === product.handle)
              return (
                <div key={i} className="products-on-page grid grid--uniform grid--view-items">
                  <FeaturedProductBox product={product} review={productReview[0]} showNotifyModal={showNotifyModal}
                      badgeStyles={badgeStyles} showVariantModal={showVariantModal} />
                </div>
              )
        })}
        </Glider>

        {/* <Slider {...settings}>
          {
            products
              .map((p, i) => {
                let product = p
                let productReview = reviewList.filter(re => re.handle === product.handle)
                return (
                  <div key={i} className="products-on-page grid grid--uniform grid--view-items">
                    <FeaturedProductBox product={product} review={productReview[0]} showNotifyModal={showNotifyModal}
                        badgeStyles={badgeStyles} showVariantModal={showVariantModal} />
                  </div>
                )
          })}
        </Slider> */}
        {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} 
                                    showNotifyModal={showNotifyModal} product={selectedProduct} /> )}
        <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} />
      </div>
      <div className="collection-carousel-button_wrapper">
        <Link className="collection-carousel-button" to={`/collections/${handle}`}>Shop {title}</Link>
      </div>
    </div>
  );
};
    
export default CollectionSlider;