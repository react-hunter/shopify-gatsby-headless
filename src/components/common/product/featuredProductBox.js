import React, { useState, useContext } from 'react';
import { Link } from 'gatsby'
import loadable from '@loadable/component';
import StoreContext from '../../../context/store'
import ProductBoxGallery from '../../collectionPage/productBoxGallery'
import ImageSpin from '../imageSpin'

const NotifyModal = loadable(() => import('../../collectionPage/notifyModal'))

const FeaturedProductBox = props => {
    const context = useContext(StoreContext);
    const product = props.product;
    const reviewBadge = props.review ? props.review.badge : '';
    const mainOption = getMainOption()
    const [swatchColor, setSwatchColor] = useState(mainOption === '' ? '' : mainOption.values[0])
    const [showSpin, setShowSpin] = useState(false);

    const [notifyModalShow, setNotifyModalShow] = useState(false);

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
            context.addVariantToCart(product.variants[0].shopifyId, 1)
            setTimeout(showCart, 1200)
        } else {
          props.showVariantModal(product);
        }
    }
    function showCart() {
        setShowSpin(false)
        document.querySelector('.site-header__cart').click()
    }

    const notifyMe = () => {
        console.log("notifyMe - featuredProductBox")
        showNotifyModal();
    }
    const selectProductSwatch = (swatchColor) => {
        setSwatchColor(swatchColor)
    }

    const handleKeyDown =(e) => {
        e.preventDefault();
    }

    const showNotifyModal = () => {
        setNotifyModalShow(true);
    }

    const closeNotifyModal = () => {
        console.log(`[data-product-handle="${product.handle}"] .klav-popup`);
        if (document.querySelector(`[data-product-handle="${product.handle}"] .klav-popup`)) {
          document.querySelector(`[data-product-handle="${product.handle}"] .klav-popup`).classList.remove("fade-in");
          document.querySelector(`[data-product-handle="${product.handle}"] .klav-popup`).classList.add("fade-out");
        }
        setTimeout(() => {
          if (document.querySelector(`[data-product-handle="${product.handle}"] .klav-popup`)) {
            document.querySelector(`[data-product-handle="${product.handle}"] .klav-popup`).classList.remove("fade-out");
          }
          setNotifyModalShow(false);
        }, 500)
    }

    return (
        <li className="grid__item grid__item--collection-template " key={product.title} data-product-handle={product.handle}>
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
                        <button className="openVariantModal" onClick={addToBag}>
                            ADD TO BAG{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }
                        </button>
                }
            </div>
            {(product.variants.length === 1 && !product.variants[0].availableForSale) ? 
                <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} />
            :null}
        </li>
    );
};

export default FeaturedProductBox;