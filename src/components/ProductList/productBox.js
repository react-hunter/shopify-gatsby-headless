import React, { useState } from 'react';
import { Link } from 'gatsby'
import CollectionVariantSelector from './collectionVariantSelector'

const ProductBox = props => {
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';

    const prevImage = (e) => {
        e.preventDefault();
        console.log('prevImage');
    }

    const nextImage = (e) => {
        e.preventDefault();
        console.log('nextImage');
    }

    const openCollectionModal = () => {
        setVaraintModalShow(true);
    }

    const closeCollectionModal = () => {
        setVaraintModalShow(false);
    }

    const handleKeyDown =(e) => {
        e.preventDefault();
    }

    const [varaintModalShow, setVaraintModalShow] = useState(false);

    return (
        <li className="grid__item grid__item--collection-template " key={product.title}>
            <div className="grid-view-item product-card">
                <span className="visually-hidden product-card-title">{product.title}</span>

                <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
                    <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                        <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/Best_Seller_stickers-01_150x.png?v=1605546945" className="badge" alt="" />
                        <div className="collection-product_image_container">
                            { product.images[0] ? 
                                (<img 
                                    className="enableScrollOnMobile disableSaveImageIOS product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc lazyloaded"
                                    src={product.images[0].originalSrc}
                                    alt={product.title}
                                />) : ""
                            }
                            { product.images[1] ? 
                                (<img 
                                    className="enableScrollOnMobile product-tile__image product-collection_image_alternate"
                                    src={product.images[1].originalSrc}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }}
                                />) : ""
                            }
                        </div>
                        <div className="collection-product-arrows_container" data-glide-el="controls">
                            <div className="collection-product-arrow_wrapper" onClick={prevImage} onKeyDown={handleKeyDown} id="prevButton" key="_prev" role="button" tabIndex="0">
                                <img className="collection-product-arrow" 
                                    src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/220/assets/leftArrow_small.png?v=2356608260688330502" alt="" />
                            </div>
                            <div className="collection-product-arrow_wrapper" onClick={nextImage} onKeyDown={handleKeyDown} id="nextButton" key="_next" role="button" tabIndex="0">
                                <img className="collection-product-arrow" 
                                    src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/220/assets/rightArrow_small.png?v=11564592839193317450" alt="" />
                            </div>
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
                    onClick={openCollectionModal}>ADD TO BAG</button>

                {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} product={product} /> )}
            </div>
        </li>
    );
};

export default ProductBox;