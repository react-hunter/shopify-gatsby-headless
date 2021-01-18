import React, { useState, useEffect } from 'react';
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

    return (
        <div>
            <div className="collection-product_image_container">
                { 
                mainOption === '' ?
                    <Slider {...productBoxSliderSettings}>
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
                }
            </div>
        </div>
    );
};

export default ProductBoxGallery;