import React, { useState, useEffect , useContext } from 'react';
import { Link } from 'gatsby'
import StoreContext from '../../context/store'
import CollectionVariantSelector from './collectionVariantSelector'
import { collectionPageData } from '../../data/collection'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/productGallery.css';

const CollectionProductBox = props => {
    const context = useContext(StoreContext);
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';

    useEffect(() => {
    })

    const addToBag = () => {
        if(product.variants.length === 1) {
            context.addVariantToCart(product.variants[0].shopifyId, 1)
            setTimeout(document.querySelector('.site-header__cart').click(), 300)
        } else {
            setVaraintModalShow(true);
        }
    }

    const closeCollectionModal = () => {
        setVaraintModalShow(false);
    }

    const [varaintModalShow, setVaraintModalShow] = useState(false);
    
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

    const productBoxSliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        
        <li className="grid__item grid__item--collection-template " key={product.title}>
            <div className="grid-view-item product-card">
                <span className="visually-hidden product-card-title">{product.title}</span>
                               
                <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
                    <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                        
                        {isBadgeEnable() ? <img src={getBadgeImage()} className="badge" alt="" /> : ''}

                        <div className="collection-product_image_container">
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
                                    src={product.images[1].originalSrc}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }}
                                />) : ""
                            }
                            </Slider>
                        </div>
                    </div>
                </div>

                <div className="h4 grid-view-item__title product-card__title product-card-title" aria-hidden="true">
                    <Link to={`/products/${product.handle}`}>{product.title}</Link>
                </div>

                <div className="collection-product-reviews_wrapper" key="badge" dangerouslySetInnerHTML={{ __html: reviewBadge }} />
                
                <div className="price price--listing price--on-sale">
                    <div className="price__regular"></div>
                    <div className="price__sale">
                        <span className="price-item price-item--sale">{product.variants[0].price}</span>
                    </div>
                    <div className="price__compare">

                    </div>
                </div>

                <div className="collection-product-color-swatch">

                </div>

                <button className="openVariantModal" 
                    onClick={addToBag}>ADD TO BAG</button>

                {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} product={product} /> )}
            </div>
        </li>
    );
};

export default CollectionProductBox;