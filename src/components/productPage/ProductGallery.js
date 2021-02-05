import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import CustomImage from '../common/image'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

import Flickity from 'react-flickity-component'
import '../../styles/flickity.css';

const ProductGallery = ({ product, selectedVariant }) => {
    let selectedImageIndex = 0;
    // let slider = useRef(null);

    product.images.map((image, imageIndex) => {
        if(image.originalSrc === selectedVariant.image.originalSrc) {
            selectedImageIndex = imageIndex
        }
        return true
    })

    useEffect(() => {
        // slider.current.slickGoTo(selectedImageIndex);

        if (flkty) {
            console.log("flkty = ", flkty);
            flkty.on('change', () => {
                setSlideIndex(flkty.selectedIndex);
                console.log("flkty.selectedIndex = ", flkty.selectedIndex)
            })
        } else {
            console.log("flkty = Null ");
        }
        
    }, [selectedVariant, selectedImageIndex])

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     swipeToSlide: true,
    //     afterChange: (current, next) => {
    //         selectedImageIndex = parseInt(current);
    //         setSlideIndex(current)
    //     },

    //     responsive: [
    //         {
    //           breakpoint: 960,
    //           settings: {
    //             slidesToShow: 1,
    //             arrows: false,
    //           }
    //         },
    //         {
    //           breakpoint: 760,
    //           settings: {
    //             slidesToShow: 1,
    //             arrows: false,
    //           }
    //         }
    //     ]
    // }

    let productGalleryCount = product.images.length;    
    const [ slideIndex, setSlideIndex] = useState(0);

    const getStyle = () => {

        let width = 100/productGalleryCount;
        let translateX = 100 * slideIndex;

        console.log("productGalleryCount = ", productGalleryCount);
        console.log("translateX = ", translateX);

        return { width: `${width}%`, transform: `translateX(${translateX}%)` };
    }

    let flkty;

    const flickityOptions = {
        pageDots: false, 
        imagesLoaded: true, 
        touchVerticalScroll: false,
        dragThreshold : 10, 
        selectedAttraction: 0.01,
        friction: 0.2,
    }

    return (
        <div className="product_image-container 1">
            <div className="pdp-carousel-main grid__item product-single__media-group medium-up--one-half glider draggable">
                {/* <Slider ref={slider} {...settings}>
                    {
                    product.images.length === 0? 
                        (<div className="product-single__media-wrapper placefolder">
                            <LazyLoadImage 
                                className="lazy-load-mc"
                                src="https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_700x.png"
                                alt={product.title}
                                effect="blur"
                                loading="eager" 
                            />
                        </div>) :
                        product.images.map((image, imageIndex) => {
                            return (
                                image ? (
                                    <div className="product-single__media-wrapper" key={imageIndex}>
                                        <CustomImage 
                                            className="lazy-load-mc"
                                            src={image.originalSrc} 
                                            alt={product.title}
                                            effect="blur"
                                            loading="eager" 
                                        />
                                    </div>
                                ) : null
                            )
                        })
                    }
                </Slider> */}

                <Flickity options={flickityOptions} flickityRef={c=> flkty = c} >
                {
                    product.images.length === 0? 
                        (<div className="product-single__media-wrapper placefolder">
                            <LazyLoadImage 
                                className="lazy-load-mc"
                                src="https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_700x.png"
                                alt={product.title}
                                effect="blur"
                                loading="eager" 
                            />
                        </div>) :
                        product.images.map((image, imageIndex) => {
                            return (
                                image ? (
                                    <div className="product-single__media-wrapper" key={imageIndex}>
                                        <CustomImage 
                                            className="lazy-load-mc"
                                            src={image.originalSrc} 
                                            alt={product.title}
                                            effect="blur"
                                            loading="eager" 
                                        />
                                    </div>
                                ) : null
                            )
                        })
                    }
                </Flickity>

                <div className="carousel-scrollbar">
                    <div className="carousel-scrollbar_bar" style={getStyle()}></div>
                </div>

                <script src="//foursixty.com/media/scripts/fs.slider.v2.5.js" data-feed-id="dose-of-roses" data-for-url="true" data-theme="slider_v2_5" data-open-links-in-same-page="true" data-connector-filter="30963" data-cell-size="20%"></script>
            </div>
        </div>
    );
}

export default ProductGallery;