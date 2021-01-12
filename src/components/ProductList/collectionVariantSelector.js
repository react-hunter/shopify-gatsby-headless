import React from 'react';

const CollectionVariantSelector = props => {
    const handleKeyDown =(e) => {
        e.preventDefault();
    }
    const selectVariantOption =(e) => {
        e.preventDefault();
        console.log("selectVariantOption");
    }
    const closeVariantSelector =(e) => {
        e.preventDefault();
        console.log("closeVariantSelector");
    }

    function changeUrl(){
        window.location.href='/pages/creat';
        console.log("changeUrl");
    }

    const addToSideCart =(e) => {
        e.preventDefault();
        console.log("addToSideCart");
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
                                src="https://cdn.shopify.com/s/files/1/0157/4420/4900/products/Untitled-2.jpg?v=1601324195" />
                        </div>
                        <div className="main-option_wrapper variantSelector-option_wrapper">
                            <span className="option-header">Quantity: 1</span>
                            <div className="option_options_wrapper">
                                <div className="swatch-wrapper select-effect">
                                    <div className="color-swatch selected-swatch"
                                        onClick={selectVariantOption} onKeyDown={handleKeyDown} role="button" tabIndex="0"
                                        data-quantity="1" data-swatch_type="Quantity">1</div>
                                    <div></div>
                                </div>
                                <div className="swatch-wrapper">
                                    <div className="color-swatch" 
                                        onClick={selectVariantOption} onKeyDown={handleKeyDown} role="button" tabIndex="0"
                                        data-quantity="6" data-swatch_type="Quantity">6</div>
                                    <div></div>
                                </div>
                                <div className="swatch-wrapper">
                                    <div className="color-swatch" 
                                        onClick={selectVariantOption} onKeyDown={handleKeyDown} role="button" tabIndex="0"
                                        data-swatch_type="Quantity" data-quantity="12">12</div>
                                    <div></div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="line-break_container">
                        <div className="variantSelector_line_break"></div>
                    </div>
    
                    <div className="sub-option_wrapper variantSelector-option_wrapper">
                        <span className="option-header">Box Color: Black</span>
                        <div className="option_options_wrapper">
                            <div className="swatch-wrapper select-effect">
                                <div className="color-swatch selected-swatch" 
                                    data-box_color="Black" data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>

                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch" 
                                    data-box_color="White" data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>

                                </div>

                                <div>

                                </div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch" 
                                    data-box_color="Pink"  data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>

                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch sold-out-swatch" 
                                    data-box_color="Sapphire" data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>
                                
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch sold-out-swatch" 
                                    data-box_color="Burgundy"  data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>

                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch sold-out-swatch" 
                                    data-box_color="Emerald"  data-swatch_type="Box Color" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>

                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sub-option_wrapper variantSelector-option_wrapper">
                        <span className="option-header">Size: Small (1 Rose)</span>
                        <div className="option_options_wrapper">
                            <div className="swatch-wrapper select-effect">
                                <div className="color-swatch selected-swatch" 
                                    data-size="Small (1 Rose)" data-swatch_type="Size"   role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>S</div>
                                <div></div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch" 
                                    data-size="Medium (25 Roses)" data-swatch_type="Size" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>M</div>
                                <div></div>
                            </div>
                            <div className="swatch-wrapper ">
                                <div className="color-swatch" 
                                    data-size="Large (35 Roses)" data-swatch_type="Size" role="button" tabIndex="0"
                                    onClick={selectVariantOption} onKeyDown={handleKeyDown}>L</div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                    <div className="loading-screen" style={{ display: 'none'}}>
                        <div className="loader-collection"></div> 
                    </div>   
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