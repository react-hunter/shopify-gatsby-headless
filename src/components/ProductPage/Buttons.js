import React from 'react';

const Buttons = ({ context, available, productVariant,  quantity}) => {
    const handleAddToCart = () => {
        console.log('add to cart');
        console.log('variant id: ', productVariant.shopifyId)
        context.addVariantToCart(productVariant.shopifyId, quantity)
    }

    const handleAddToCart_BuyNow = () => {
        context.addVariantToCartAndBuyNow(productVariant.shopifyId, quantity)
    }

    return (
        <div className="product-form__controls-group product-form__controls-group--submit">
            <div className="product-form__item product-form__item--submit mobile-in-view_trigger product-form__item--payment-button">
                <button id="AddToCart"
                    className="btn product-form__cart-submit btn--secondary-accent js-ajax-add-to-cart"
                    disabled={!available}
                    onClick={handleAddToCart}>Add to Cart</button>
                <div className="shopify-payment-button">
                    <button
                        className="shopify-payment-button__button shopify-payment-button__button--unbranded"
                        disabled={!available}
                        onClick={handleAddToCart_BuyNow}>Buy It Now</button>
                </div>
            </div>
        </div>
    );
};

export default Buttons;