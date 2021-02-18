import React, { useContext, useState, useEffect } from 'react';
import { navigate, Link } from 'gatsby'
import StoreContext from '../../context/store'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ImageSpin from '../common/imageSpin'

const CollectionVariantSelector = React.memo(function CollectionVariantSelector(props) {
    const context = useContext(StoreContext);
    const product = props.product;
    const firstVariant = product.variants[0];
    const [variant, setVariant] = useState(firstVariant)
    const [showSpin, setShowSpin] = useState(false);
    const mainOption = product.options[0]
    const otherOptions = product.options.length > 1 ? product.options.slice(1, product.options.length) : []

    useEffect(() => {
        Array.prototype.slice.call(document.querySelectorAll('.color-swatch')).map(el => {
            const optionName = String(el.dataset.optionname)
            const dataAttributeName = optionName.replace(' ', '_').toLowerCase()
            el.dataset[dataAttributeName] = el.dataset.optionvalue
            return true
        })
        document.getElementsByTagName("html")[0].classList.add("no-scroll");
        document.querySelector(".scrollPreventer").style.overflow = "hidden";
        attachCloseMobileVariantSelector();
    });
    
    const getVariantByOption = (optionName, optionValue) => {
        var properVariant = null
        const otherOptionList = variant.selectedOptions.filter(op => op.name !== optionName)
        let variantOptions = {}
        variant.selectedOptions.map(so => {
            variantOptions[so.name] = so.value
            return true
        })
        product.variants.map(va => {
            var matched = true;
            otherOptionList.map(oo => {
                if(!va.title.split(' / ').includes(variantOptions[oo.name])) {
                    matched = false
                }
                return true
            })
            if(matched === true && va.title.split(' / ').includes(optionValue)) {
                properVariant = va;
            }
            return true
        })
        return properVariant

    }
    const checkVariantExist = (optionName, optionValue) => {
        const theVariant = getVariantByOption(optionName, optionValue)
        return theVariant ? true : false
    }
    const getSaleClass = (optionName, optionValue) => {
        const theVariant = getVariantByOption(optionName, optionValue)
        return theVariant ? (theVariant.availableForSale ? '' : 'sold-out-swatch') : '';
    }

    const getValueByName = (optionName) => {
        const theOption = variant.selectedOptions.filter(so => so.name === optionName)[0]
        return theOption.value
    }

    const selectVariantOption =(optionName, optionValue) => {
        const theVariant = getVariantByOption(optionName, optionValue)
        setVariant(theVariant)
    }
    const addToSideCart =() => {
        setShowSpin(true);
        context.addVariantToCart(variant.shopifyId, 1);
        setTimeout(showCart, 1200);
    }
    function showCart() {
        setShowSpin(false);
        document.querySelector('.site-header__cart').click()
    }
    const changeUrl = () => {
        navigate('/pages/create')
    }
    const closeVariantSelector =() => {
        props.closeModal();
    }
    const handleKeyDown =(e) => {
        e.preventDefault();
    }

    let xDownVariant = null;
    let yDownVariant = null;

    function attachCloseMobileVariantSelector() {
        let mobileTriggers = document.querySelectorAll(".closeVariantSelector");
        let mobileTrigger = mobileTriggers[0]
        // for (let i = 0; i < mobileTriggers.length; i++) {
            // mobileTrigger = mobileTriggers[i];
            mobileTrigger.addEventListener('touchstart', (evt) => {
                const firstTouch = getTouches(evt)[0];
                xDownVariant = firstTouch.clientX;
                yDownVariant = firstTouch.clientY;
            }, {passive: true});

            mobileTrigger.addEventListener('touchmove', (evt) => {
                if (!xDownVariant || !yDownVariant) {
                    return;
                }

                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;

                var xDiff = xDownVariant - xUp;
                var yDiff = yDownVariant - yUp;

                if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                } else {
                    if (yDiff > 0) {
                        /* up swipe */
                    } else {
                        /* down swipe */
                        // swipeDownVariantSelector(mobileTrigger);
                        props.closeModal();
                    }
                }
                /* reset values */
                xDownVariant = null;
                yDownVariant = null;
            }, {passive: true});
        // }
    }
    function getTouches(evt) {
        return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
    }
  
    return (
        <div className="variantoverlayNew" id="variantOverlay-">
            <div className="variantSelector_wrapper animate-bottom" data-toggle="modal">
                <div className="variantSelector-section"> 
                    <div className="closeVariantSelector">
                        <div className="closeVariantSelector_content">
                            <span className="variantSelector_close_message" 
                                onClick={changeUrl} onKeyDown={handleKeyDown} role="button" tabIndex="0"
                                style={{ float: 'left', cursor: 'pointer', marginLeft: '10px' }}>Need more options? Customize now</span>
                            <span className="variantSelector_close"  
                                onClick={closeVariantSelector} onKeyDown={handleKeyDown} role="button" tabIndex="0"
                                style={{ float: 'right'}}>×</span>
                        </div>
                        <div className="closeVariantSelector-mobile_swipe"></div>
                    </div>
                    <div className="preview-main-option_wrapper">
                        <div className="preview_wrapper">
                            <LazyLoadImage className="variantSelector-preview_img" alt=""
                                src={variant.image ? variant.image.originalSrc : ''}
                                effect="blur" loading="eager"  />
                        </div>
                        <div className="main-option_wrapper variantSelector-option_wrapper">
                            <span className="option-header">{mainOption.name}: {getValueByName(mainOption.name)}</span>
                            <div className="option_options_wrapper">
                                {
                                    mainOption.values.map((mo, moIndex) => {
                                        const selectEffectClass = getValueByName(mainOption.name) === mo ? 'select-effect' : ''
                                        return (
                                            <div className={`swatch-wrapper ${selectEffectClass}`} key={moIndex}>
                                                <div className={`color-swatch ${getSaleClass(mainOption.name, mo)}`} 
                                                    onClick={() => selectVariantOption(mainOption.name, mo)} onKeyDown={handleKeyDown}
                                                    role="button" tabIndex="0" data-swatch_type={mainOption.name} 
                                                    data-optionname={mainOption.name} data-optionvalue={mo}>
                                                    {mainOption.name === 'Size' ? mo.charAt(0) : null}{mainOption.name === 'Quantity' ? mo : null}
                                                </div>
                                                <div></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="line-break_container">
                        <div className="variantSelector_line_break"></div>
                    </div>
    
                    {
                        otherOptions.length > 0 && otherOptions.map((otherOption, otherOptionIndex) => {
                            return (
                                <div className="sub-option_wrapper variantSelector-option_wrapper" key={otherOptionIndex}>
                                    <span className="option-header">{otherOption.name}: {getValueByName(otherOption.name)}</span>
                                    <div className="option_options_wrapper">
                                        {
                                            otherOption.values.map((oo, ooIndex) => {
                                                const selectOtherEffectClass = getValueByName(otherOption.name) === oo ? 'select-effect' : ''
                                                return (
                                                    checkVariantExist(otherOption.name, oo) && (<div className={`swatch-wrapper ${selectOtherEffectClass}`} key={ooIndex}>
                                                        <div className={`color-swatch selected-swatch ${getSaleClass(otherOption.name, oo)}`} 
                                                            data-optionname={otherOption.name} data-optionvalue={oo} data-swatch_type={otherOption.name} role="button" tabIndex="0"
                                                            onClick={() => selectVariantOption(otherOption.name, oo)} onKeyDown={handleKeyDown}>
                                                            {otherOption.name === 'Size' ? oo.charAt(0) : null}
                                                        </div>
                                                        <div></div>
                                                    </div>)

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className="loading-screen" style={{ display: 'none'}}>
                        <div className="loader-collection"></div> 
                    </div> */}
                </div>

                <div className="variant-selector_add_to_bag_wrapper">
                    {
                        variant.availableForSale ? 
                            (
                                <button className="variant-selector_add_to_bag" 
                                    onClick={addToSideCart}
                                    style={{ display: 'inline-block' }}>
                                        ADD TO BAG - ${variant.price}{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }
                                </button>
                            ) : 
                            (
                                <button className="variant-selector_add_to_bag" 
                                    onClick={props.showNotifyModal}
                                    style={{ display: 'inline-block' }}>NOTIFY ME</button>
                            )
                    }
                    <Link to="/create" className="mobile-more-options">NEED MORE OPTIONS? CUSTOMIZER NOW</Link>
                </div>
            </div>
            <div className="variantSelector_overlay" 
                onClick={closeVariantSelector} onKeyDown={handleKeyDown} role="button" tabIndex="0">

            </div>
        </div>
    );
});
    
export default CollectionVariantSelector;