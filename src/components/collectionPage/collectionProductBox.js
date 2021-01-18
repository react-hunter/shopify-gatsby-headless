import React, { useState, useContext } from 'react';
import { Link } from 'gatsby'
import StoreContext from '../../context/store'
import CollectionVariantSelector from './collectionVariantSelector'
import ProductBoxGallery from './productBoxGallery'
import { collectionPageData } from '../../data/collection'

const CollectionProductBox = props => {
    const context = useContext(StoreContext);
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';
    const mainOption = getMainOption()
    const [swatchColor, setSwatchColor] = useState(mainOption === '' ? '' : mainOption.values[0])
    function getMainOption() {
        let tempOption = '';
        const options = product.options.filter(option => option.name === 'Rose Color')
        if(options.length > 0) {
            tempOption = options[0]
        }
        return tempOption
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

    const selectProductSwatch = (swatchColor) => {
        setSwatchColor(swatchColor)
    }

    const handleKeyDown =(e) => {
        e.preventDefault();
    }

    return (
        
        <li className="grid__item grid__item--collection-template " key={product.title}>
            <div className="grid-view-item product-card">
                <span className="visually-hidden product-card-title">{product.title}</span>
                               
                <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
                    <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                        
                        {   
                            isBadgeEnable() ? <img src={getBadgeImage()} className="badge" alt="" /> : ''
                        }

                        <ProductBoxGallery product={product} mainOption={mainOption} swatchColor={swatchColor} />
                    </div>
                </div>

                <div className="h4 grid-view-item__title product-card__title product-card-title" aria-hidden="true">
                    <Link to={`/products/${product.handle}`}>{product.title}</Link>
                </div>

                <div className="collection-product-reviews_wrapper" key="badge" dangerouslySetInnerHTML={{ __html: reviewBadge }} />
                
                <div className="price price--listing price--on-sale">
                    <div className="price__regular"></div>
                    <div className="price__sale">
                        <dd>
                            <span className="price-item price-item--sale">${product.variants[0].price}</span>
                        </dd>
                        <div className="price__compare">
                            <dd>
                                <s className="price-item price-item--regular">
                                {product.variants[0].compareAtPrice > 0 ? '$' + product.variants[0].compareAtPrice : null}</s>
                            </dd>
                        </div>
                    </div>
                </div>
                <div className="collection-product-color-swatch">
                {   
                    mainOption === '' ? '': 
                    mainOption.values.slice(0, 5).map((item, index) => {
                        return (
                            <div className="color-swatch" key={index} 
                                onClick={() => selectProductSwatch(item)} onKeyDown={handleKeyDown}
                                role="button" tabIndex="0" data-rose_color={item}>                                        
                            </div>
                        )
                    })
                } 
                </div>

                <button className="openVariantModal" 
                    onClick={addToBag}>ADD TO BAG</button>

                {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} product={product} /> )}
            </div>
        </li>
    );
};

export default CollectionProductBox;