import React, { useState, useEffect } from 'react';
import { navigate, Link } from 'gatsby'

const CollectionVariantSelector = props => {
    const product = props.product;
    const firstVariant = product.variants[0];
    
    const [variant, setVariant] = useState(firstVariant)
    const getSaleClass = (optionName, optionValue) => {
        return variant.availableForSale ? '' : 'sold-out-swatch';
    }

    console.log('product: ', product)
    const mainOption = product.options[0]
    const otherOptions = product.options.length > 1 ? product.options.slice(1, product.options.length) : []
    
    const getValueByName = (optionName) => {
        const theOption = variant.selectedOptions.filter(so => so.name === optionName)[0]
        return theOption.value
    }

    useEffect(() => {
        Array.prototype.slice.call(document.querySelectorAll('.color-swatch')).map(el => {
            const optionName = String(el.dataset.optionname)
            const dataAttributeName = optionName.replace(' ', '_').toLowerCase()
            el.dataset[dataAttributeName] = el.dataset.optionvalue
        })
    });

    const selectVariantOption =(optionName, optionValue) => {
        console.log("selectVariantOption: ", optionName, optionValue);
    }
    const addToSideCart =(e) => {
        e.preventDefault();
        console.log("addToSideCart");
    }
    const changeUrl = () => {
        navigate('/pages/create')
    }
    const closeVariantSelector =() => {
        props.closeModal()
    }
    const handleKeyDown =(e) => {
        e.preventDefault();
    }
    
    return (
        <div className="variantoverlayNew" id="variantOverlay-">
            <div className="variantSelector_wrapper animate-bottom" data-toggle="modal">
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

                <div className="variantSelector-section"> 
                    <div className="preview-main-option_wrapper">
                        <div className="preview_wrapper">
                            <img className="variantSelector-preview_img" alt=""
                                src={variant.image.originalSrc} />
                        </div>
                        <div className="main-option_wrapper variantSelector-option_wrapper">
                            <span className="option-header">{mainOption.name}: {getValueByName(mainOption.name)}</span>
                            <div className="option_options_wrapper">
                                {
                                    mainOption.values.map((mo, moIndex) => {
                                        const selectEffectClass = getValueByName(mainOption.name) === mo ? 'select-effect' : ''
                                        return (
                                            <div className={`swatch-wrapper ${selectEffectClass}`} key={moIndex}>
                                                <div className="color-swatch sold-out-swatch" onClick={() => selectVariantOption(mainOption.name, mo)} onKeyDown={handleKeyDown}
                                                    role="button" tabIndex="0" data-swatch_type={mainOption.name} data-optionname={mainOption.name} data-optionvalue={mo}></div>
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
                                                    <div className={`swatch-wrapper ${selectOtherEffectClass}`} key={ooIndex}>
                                                        <div className="color-swatch selected-swatch sold-out-swatch" 
                                                            data-optionname={otherOption.name} data-optionvalue={oo} data-swatch_type={otherOption.name} role="button" tabIndex="0"
                                                            onClick={selectVariantOption} onKeyDown={handleKeyDown}>
                                                            {otherOption.name === 'Size' ? oo.charAt(0) : null}
                                                        </div>
                                                        <div></div>
                                                    </div>
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
                    <button className="variant-selector_add_to_bag" 
                        onClick={addToSideCart}
                        style={{ display: 'inline-block' }}>ADD TO BAG - $19.95</button>
                    <a id="notify" href="/products/galaxy-rose" 
                        style={{ position: 'static', display: 'none' }} 
                        className="add klav-popup-trigger add-to-cart-custom button">Notify Me</a>
                    <a href="/create" className="mobile-more-options">NEED MORE OPTIONS? CUSTOMIZER NOW</a>
                </div>
            </div>
        </div>
    );
};
    
export default CollectionVariantSelector;