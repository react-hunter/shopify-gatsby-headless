import React, { useState, useContext } from 'react';
import { Link } from 'gatsby'
import StoreContext from '../../context/store'
import CollectionVariantSelector from './collectionVariantSelector'
import ProductBoxGallery from './productBoxGallery'
import ImageSpin from '../common/imageSpin'

const CollectionProductBox = props => {
    const context = useContext(StoreContext);
    const [varaintModalShow, setVaraintModalShow] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';
    const mainOption = getMainOption()
    const [swatchColor, setSwatchColor] = useState(mainOption === '' ? '' : mainOption.values[0])
    function getMainOption() {
        let tempOption = '';
        const options = product.options ? product.options.filter(option => option.name === 'Rose Color') : []
        if(options.length > 0) {
            tempOption = options[0]
        }
        return tempOption
    }
    const addToBag = () => {
        if(product.variants.length === 1) {
            setShowSpin(true);

            console.log("product = ", product);
            console.log("product.variants[0].shopifyId == ", product.variants[0].shopifyId);

            context.addVariantToCart(product.variants[0].shopifyId, 1);
            setTimeout(showCart, 1200);
        } else {
            setVaraintModalShow(true);
        }
    }
    const showCart = () => {
        setShowSpin(false);
        document.querySelector('.site-header__cart').click();
    }

    const notifyMe = () => {
        props.showNotifyModal();
    }
    const closeCollectionModal = () => {
        document.querySelector(".variantSelector_wrapper").classList.remove('animate-bottom');
        document.querySelector(".variantSelector_wrapper").classList.add('animate-top');

        setTimeout(() => {
            document.querySelector(".variantSelector_wrapper").classList.remove('animate-top');
            setVaraintModalShow(false);
            document.getElementsByTagName("html")[0].classList.remove("no-scroll");
            document.querySelector(".scrollPreventer").style.overflow = "visible";
        }, 550)
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
 
                <ProductBoxGallery product={product} mainOption={mainOption} swatchColor={swatchColor} badgeStyles={props.badgeStyles} />
                  
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

                {
                    (product.variants.length === 1 && !product.variants[0].availableForSale) ? 
                        <button className="openVariantModal" onClick={notifyMe}>NOTIFY ME</button> :
                        <button className="openVariantModal" onClick={addToBag}>ADD TO BAG{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }</button>
                }

                {varaintModalShow && ( <CollectionVariantSelector closeModal={closeCollectionModal} showNotifyModal={props.showNotifyModal} product={product} /> )}
            </div>
        </li>
    );
};

export default CollectionProductBox;