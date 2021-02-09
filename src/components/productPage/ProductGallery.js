import React, { useEffect, useState } from 'react'
import CustomImage from '../common/image'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Flickity from 'react-flickity-component'
import '../../styles/productGallery.css';
import '../../styles/flickity.css';

const ProductGallery = ({ product, selectedVariant }) => {
    let selectedImageIndex = 0;
    let flkty;
    product.images.map((image, imageIndex) => {
        if(image.originalSrc === selectedVariant.image.originalSrc) {
            selectedImageIndex = imageIndex
        }
        return true
    })

    useEffect(() => {
        if (flkty) {
            flkty.on('change', () => {
                setSlideIndex(flkty.selectedIndex);
            })
        } else {
            console.log("flkty = Null ");
        }
        
    }, [selectedVariant, selectedImageIndex, flkty])

    let productGalleryCount = product.images.length;    
    const [ slideIndex, setSlideIndex] = useState(0);

    const getStyle = () => {
        let width = 100/productGalleryCount;
        let translateX = 100 * slideIndex;
        return { width: `${width}%`, transform: `translateX(${translateX}%)` };
    }
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

                <div className="status-bar">
                    <div className="carousel-scrollbar">
                        <div className="carousel-scrollbar_bar" style={getStyle()}></div>
                    </div>
                </div>

                <script src="//foursixty.com/media/scripts/fs.slider.v2.5.js" data-feed-id="dose-of-roses" data-for-url="true" data-theme="slider_v2_5" data-open-links-in-same-page="true" data-connector-filter="30963" data-cell-size="20%"></script>
            </div>
        </div>
    );
}

export default ProductGallery;