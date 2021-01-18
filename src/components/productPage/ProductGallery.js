import React from 'react';
import Slider from "react-slick";
import Img from 'gatsby-image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

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
        <div className="product_image-container 1">
            <div className="pdp-carousel-main grid__item product-single__media-group medium-up--one-half glider draggable">
                <Slider {...settings}>
                    {
                    product.images.length === 0? 
                        (<div className="product-single__media-wrapper placefolder">
                            <img src="https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_700x.png" alt="" />
                        </div>) :
                        product.images.map((image, imageIndex) => {
                            return (
                                image ? (
                                    <div className="product-single__media-wrapper" key={imageIndex}>
                                        <Img fluid={image.localFile.childImageSharp.fluid} alt="" loading="eager" />
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