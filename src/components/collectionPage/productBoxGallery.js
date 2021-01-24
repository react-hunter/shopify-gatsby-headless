import React, { useState, useEffect } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

const ProductBoxGallery = props => {
    let productGalleryCount = 0;
    const product = props.product;
    const mainOption = props.mainOption;
    const swatchColor = props.swatchColor;
    const badgeStyles = props.badgeStyles;

    const [ slideIndex, setSlideIndex] = useState(0);
    
    const productBoxSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setSlideIndex(next)
    }
    const [ swatchImages, setSwatchImages ] = useState([]);

    productGalleryCount = mainOption === '' ? Math.min(product.images.length,3) : Math.min(swatchImages.length,3);

    useEffect(() => {
        if (mainOption !== '') {
            const selectedImages = product.variants.map(variant => {
                let imageUrl = '';
                variant.selectedOptions.map(selectedOption => {
                    if(selectedOption.name === 'Rose Color' && selectedOption.value === swatchColor) {
                        imageUrl = variant.image ? variant.image.originalSrc : 'https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_500x.png';
                    }
                    return true
                })
                return imageUrl
            })
            const filteredImages = selectedImages.filter(img => img !== '')
            setSwatchImages(filteredImages.slice(0, 3))
        }
    }, [mainOption, swatchColor, product.variants])

    const isBadgeEnable = () => {
        let isBadgeEnable = false;

        badgeStyles.map(item => {
            for (var i=0;i<product.tags.length;i++) {
                if (product.tags[i] === item.fields.name) {
                    isBadgeEnable = true;
                }
            }
            return true
        })
        return isBadgeEnable;
    }

    const getBadgeImage = () => {
        let imageUrl = '';
        badgeStyles.map(item => {
            for (var i=0;i<product.tags.length;i++) {
                if (product.tags[i] === item.fields.name) {
                    imageUrl = item.fields.image.fields.file.url;
                }
            }
            return true
        })
        return imageUrl;
    }

    const getStyle = () => {
        if (productGalleryCount === 1) {
            return  { width: '100%' };
        } else if (productGalleryCount === 2) {
            if (slideIndex === 1) {
                return { width: '50%',  transform: 'translateX(100%)' };
            } else {
                return  { width: '50%' };
            }
        } else {
            if (slideIndex === 2) {
                return { transform: 'translateX(200%)' };
            } else if (slideIndex === 1) {
                return {transform: 'translateX(100%)' };
            }
        }
    }

    return (
        <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
            <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                {   
                    isBadgeEnable() ? <img  src={getBadgeImage()} className="badge" alt="" /> : ''
                }
                <div className="collection-product_image_container">
                { 
                    mainOption === '' ?
                        <Slider {...productBoxSliderSettings}>
                            { product.images[0] ? 
                                (<img 
                                    className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                    src={product.images[0].originalSrc}
                                    alt={product.title}
                                />) : ""
                            }
                            { product.images[1] ? 
                                (<img 
                                    className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                    src={product.images[1].originalSrc}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }} 
                                />) : ""
                            }
                            { product.images[2] ? 
                                (<img 
                                    className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                    src={product.images[2].originalSrc}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }} 
                                />) : ""
                            }
                        </Slider>
                    : 
                    <Slider {...productBoxSliderSettings}>
                    {
                        swatchImages.map((swatchImage, swatchImageIndex) => {
                            return (
                                <img 
                                    className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                    src={swatchImage}
                                    alt=''
                                    style={{ cursor: 'pointer' }} 
                                    key={swatchImageIndex}
                                />
                            )
                        })
                    }
                    </Slider>
                }
                </div>
            </div>
                    
            <div className="carousel-scrollbar">
                <div className="carousel-scrollbar_bar" style={getStyle()}></div>
            </div>
        </div>
    );
};

export default ProductBoxGallery;