import React, { useState, useEffect , useContext } from 'react';
import { Link } from 'gatsby'
import StoreContext from '../../context/store'
import CollectionVariantSelector from './collectionVariantSelector'
import { collectionPageData } from '../../data/collection'

const CollectionProductBox = props => {
    const context = useContext(StoreContext);
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';

    useEffect(() => {
    })

    const prevImage = (e) => {
        e.preventDefault();
        console.log('prevImage');
    }

    const nextImage = (e) => {
        e.preventDefault();
        console.log('nextImage');
    }

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

    const handleKeyDown =(e) => {
        e.preventDefault();
    }

    const [varaintModalShow, setVaraintModalShow] = useState(false);
    
    const isBestSeller = (productTitle) => {
        console.log("productTitle = ", productTitle);
        const tagList = collectionPageData.bestSeller.producTagList.map(va => va.name);
        
        for (var i=0;i< tagList.length;i++) {
            console.log("tagList index = ", tagList[i])
        } 
    }
    return (
        

        <li className="grid__item grid__item--collection-template " key={product.title}>
            <div className="grid-view-item product-card">
                <span className="visually-hidden product-card-title">{product.title}</span>
                               
                <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
                    <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                        <img src={collectionPageData.bestSeller.badgeImage}
                            className="badge" alt="" />

                        {
                            isBestSeller(product.title)
                        }

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
                    onClick={addToBag}>ADD TO BAG</button>

                {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} product={product} /> )}
            </div>
        </li>
    );
};

export default CollectionProductBox;