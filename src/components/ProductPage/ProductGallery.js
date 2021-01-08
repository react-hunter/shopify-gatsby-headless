import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './productGallery.css';

const ProductGallery = ({ product }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <>
        <div className="product_image-container">
            <div className="pdp-carousel-main grid__item product-single__media-group medium-up--one-half glider draggable">
                <Slider {...settings}>
                    {
                    product.images
                        .map((p, i) => {
                        let image = p
                        return (
                            <div className="product-single__media-wrapper" key={i}>
                                <img src={image.originalSrc} alt="" />
                            </div>
                        )
                    })}
                </Slider>
                <h2 className="ig-title" style={{float:'none', clear: 'both', marginTop:'20px' }}><a href="https://www.instagram.com/doseofroses/"> As Seen on @DOSEOFROSES</a></h2>
                    
                <script src="//foursixty.com/media/scripts/fs.slider.v2.5.js" data-feed-id="dose-of-roses" data-for-url="true" data-theme="slider_v2_5" data-open-links-in-same-page="true" data-connector-filter="30963" data-cell-size="20%"></script>
            </div>
        </div>
        </>
    );
}

export default ProductGallery;