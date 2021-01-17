import React, { useState, useEffect } from 'react';
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
                        imageUrl = variant.image.originalSrc;
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
    );
};

export default ProductBoxGallery;