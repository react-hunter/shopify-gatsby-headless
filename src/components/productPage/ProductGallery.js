import React, { useEffect, useRef } from 'react'
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

const ProductGallery = ({ product, selectedVariant }) => {
    let selectedImageIndex = 0;
    let slider = useRef(null);

    product.images.map((image, imageIndex) => {
        if(image.originalSrc === selectedVariant.image.originalSrc) {
            selectedImageIndex = imageIndex
        }
        return true
    })

    useEffect(() => {
        slider.current.slickGoTo(selectedImageIndex);
    }, [selectedVariant, selectedImageIndex])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current, next) => {
            selectedImageIndex = parseInt(current)
        }
    }

    return (
        <>
        <div className="product_image-container 1">
            <div className="pdp-carousel-main grid__item product-single__media-group medium-up--one-half glider draggable">
                <Slider ref={slider} {...settings}>
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
                                        <LazyLoadImage 
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
                </Slider>

                {product.images.length === 0? '': 
                    <h2 className="ig-title" style={{float:'none', clear: 'both', marginTop:'20px' }}>
                        <a href="https://www.instagram.com/doseofroses/"> As Seen on @DOSEOFROSES</a>
                    </h2>
                }
                <script src="//foursixty.com/media/scripts/fs.slider.v2.5.js" data-feed-id="dose-of-roses" data-for-url="true" data-theme="slider_v2_5" data-open-links-in-same-page="true" data-connector-filter="30963" data-cell-size="20%"></script>
            </div>
        </div>
        </>
    );
}

export default ProductGallery;