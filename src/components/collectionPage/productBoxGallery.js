import React, { useState, useEffect } from 'react';
import { collectionPageData } from '../../data/collection'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

const ProductBoxGallery = props => {
    const product = props.product;
    const mainOption = props.mainOption;
    const swatchColor = props.swatchColor
    const productBoxSliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const [ swatchImages, setSwatchImages ] = useState([]);
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
    }, [mainOption, swatchColor])

    const isBadgeEnable = () => {
        let isBadgeEnable = false;

        collectionPageData.badgeStyle.map(item => {
            for (var i=0;i<product.tags.length;i++) {
                if (product.tags[i] === item.name) {
                    isBadgeEnable = true;
                }
            }
            return true
        })
        return isBadgeEnable;
    }

    const getBadgeImage = () => {
        let imageUrl = '';
        collectionPageData.badgeStyle.map(item => {
            for (var i=0;i<product.tags.length;i++) {
                if (product.tags[i] === item.name) {
                    imageUrl = item.image;
                }
            }
            return true
        })
        return imageUrl;
    }

    return (
        <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
            <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                {   
                    isBadgeEnable() ? <img src={getBadgeImage()} className="badge" alt="" /> : ''
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
<<<<<<< HEAD
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
=======
                        { product.images[0] ? 
                            (<LazyLoadImage 
                                className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                src={product.images[0].originalSrc}
                                alt={product.title}
                                effect="blur"
                            />) : ""
                        }
                        { product.images[1] ? 
                            (<LazyLoadImage 
                                className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                src={product.images[1].originalSrc}
                                alt={product.title}
                                style={{ cursor: 'pointer' }}
                                effect="blur"
                            />) : ""
                        }
                        { product.images[2] ? 
                            (<LazyLoadImage 
                                className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                src={product.images[2].originalSrc}
                                alt={product.title}
                                style={{ cursor: 'pointer' }}
                                effect="blur"
                            />) : ""
                        }
                    </Slider>
                : 
                <Slider {...productBoxSliderSettings}>
                    {
                        swatchImages.map((swatchImage, swatchImageIndex) => {
                            return (
                                <LazyLoadImage 
                                    className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
                                    src={swatchImage}
                                    alt=''
                                    style={{ cursor: 'pointer' }}
                                    effect="blur"
                                    key={swatchImageIndex}
                                />
                            )
                        })
                    }
                </Slider>
>>>>>>> 3b19028a822489c3080df25ceb4fc98e08d6eb8e
                }
                </div>
            </div>
                    
            <div className="carousel-scrollbar">
                <div className="carousel-scrollbar_bar"></div>
            </div>
        </div>
    );
};

export default ProductBoxGallery;