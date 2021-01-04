import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            </div>
        </div>
        </>
    );
}

export default ProductGallery;