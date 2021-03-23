import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import loadable from '@loadable/component';
import Glider from 'react-glider';
import CollectionVariantSelector from '../collectionPage/collectionVariantSelector';
import FeaturedProductBox from "../common/product/featuredProductBox";
import { client } from "../../contentful";
import 'glider-js/glider.min.css';
import "../../styles/collectionPage.scss";
const NotifyModal = loadable(() => import("../collectionPage/notifyModal"));

const CollectionSlider = ({ products, title, handle, reviewList}) => {
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
      }, {passive: true});
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
      if (document.querySelector(".variantSelector_wrapper")) {
        document.querySelector(".variantSelector_wrapper").classList.remove('animate-top');
      }
      setVaraintModalShow(false);
      document.getElementsByTagName("html")[0].classList.remove("no-scroll");
      document.querySelector(".scrollPreventer").style.overflow = "visible";
    }, 550)
  }

  return (
    <div className="collection-carousel" data-title={title}>
      <div className="carousel-header_wrapper">
        <span className="carousel-header">{title}</span>
      </div>
      <div className="Best-Sellers-Carousel">
        <button type="button" id={`prev-${handle}`} className="slick-arrow slick-prev"> Previous</button>
        <Glider draggable={true} scrollLock={true} duration={1} slidesToShow={2} hasArrows={true}
          arrows= {{
            prev: `#prev-${handle}`,
            next: `#next-${handle}`
          }}
          responsive={[{
            breakpoint: 775,
            settings: {
              slidesToShow: 2,
            }
          },{
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            }
          }
        ]}>
          {products
            .map((p, i) => {
              let product = p
              let productReview = reviewList.filter(re => re.handle === product.handle)
              return (
                <div key={i} className="products-on-page grid grid--uniform grid--view-items">
                  <FeaturedProductBox product={product} review={productReview[0]} showNotifyModal={showNotifyModal}
                      badgeStyles={badgeStyles} showVariantModal={showVariantModal} />
                </div>
              )
            })
          }
        </Glider>
        <button type="button" id={`next-${handle}`} className="slick-arrow slick-next"> Next</button>

        {varaintModalShow && ( <CollectionVariantSelector
                                  closeModal={closeCollectionModal} 
                                  showNotifyModal={showNotifyModal} 
                                  product={selectedProduct} /> )}
        <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} />
      </div>
      <div className="collection-carousel-button_wrapper">
        <Link className="collection-carousel-button" to={`/collections/${handle}`}>Shop {title}</Link>
      </div>
    </div>
  );
};
    
export default CollectionSlider;