import React, { useContext, useState, useEffect } from 'react';
import AjaxCartFooter from './ajaxCartFooter';
import GiftMessage from './giftMessage'
import AjaxCartEmpty from './ajaxCartEmpty';
import StoreContext from '../../context/store'
import { Link } from 'gatsby'

const AjaxCartCustom = ({giftVariant, rushVariant}) => {
    // const defaults = {
    //     cartModal: '.js-ajax-cart-modal', // classname
    //     cartModalContent: '.js-ajax-cart-modal-content', // classname
    //     cartModalClose: '.js-ajax-cart-modal-close', // classname
    //     cartDrawer: '.js-ajax-cart-drawer', // classname
    //     cartDrawerContent: '.js-ajax-cart-drawer-content', // classname
    //     cartDrawerTrigger: '.js-ajax-cart-drawer-trigger', // classname
    //     cartOverlay: '.js-ajax-cart-overlay', // classname
    //     cartCounter: '.cartCount', // classname
    //     addToCart: '.js-ajax-add-to-cart', // classname
    //     checkoutButton: '.js-ajax-checkout-button',
    // };

    const context = useContext(StoreContext);
    const [lineItems, setLineItems] = useState([]);
    const [messageShow, setMessageShow] = useState(false);
    const [giftLineId, setGiftLineId] = useState('')
    const [rushLineId, setRushLineId] = useState('')
    
    useEffect(() => {
        const originalLineItemList = context.store.checkout.lineItems
        const lineItemList = originalLineItemList.filter(li => li.variant.id !== giftVariant.shopifyId && li.variant.id !== rushVariant.shopifyId)
        const giftLineItem = originalLineItemList.filter(li => li.variant.id === giftVariant.shopifyId)
        const rushLineItem = originalLineItemList.filter(li => li.variant.id === rushVariant.shopifyId)
        if (giftLineItem.length > 0) {
            setGiftLineId(giftLineItem[0].id)
        }
        if (rushLineItem.length > 0) {
            setRushLineId(rushLineItem[0].id)
        }
        setLineItems(lineItemList)
        document.querySelector('.js-ajax-cart-overlay').addEventListener('click', function() {
            closeAddModal();
            closeCartDrawer();
            closeCartOverlay();
        });
        // const atcUpsellButtons = document.querySelectorAll('.upsell-add_button');
        // for (let i = 0; i < atcUpsellButtons.length; i++) {

        //     if (atcUpsellButtons[i].firstElementChild.classList.contains('upsell-single-variant_form')) {
        //         atcUpsellButtons[i].onClick = function () {
        //             window.tempUpsellProducts.push(atcUpsellButtons[i].parentElement.parentElement);
        //             console.log("index: ", i )
        //             window.upsellCarousel.removeItem(i);

        //             resetOnClickEvents();
        //         }
        //     }
        // }
    }, [context.store.checkout, giftVariant, rushVariant]);

    const increaseItem = (itemId, itemQuantity) => {
        context.updateLineItem(context.store.client, context.store.checkout.id, itemId, itemQuantity + 1)
    }

    const decreaseItem = (itemId, itemQuantity) => {
        if (itemQuantity === 1) {
            removeItem(itemId)
        } else {
            context.updateLineItem(context.store.client, context.store.checkout.id, itemId, itemQuantity - 1)
        }
    }

    const removeItem = (itemId) => {
        context.removeLineItem(context.store.client, context.store.checkout.id, itemId)
    }
    
    const cartDrawerClose = (e) => {
        e.preventDefault();

        closeCartDrawer();
        closeCartOverlay();
        document.documentElement.classList.remove("scrollPrevent")
    };

    function closeCartOverlay() {
        document.querySelector('.js-ajax-cart-overlay').classList.remove('is-open');
        document.documentElement.classList.remove('is-locked');
        document.documentElement.classList.remove("scrollPrevent")
    }

    function closeAddModal() {
        document.querySelector('.js-ajax-cart-modal').classList.remove('is-open');
    }

    function closeCartDrawer () {
        document.querySelector('.js-ajax-cart-drawer').classList.remove('is-open');
        document.getElementsByTagName("html")[0].classList.remove('cart-drawer-open');
        document.getElementsByTagName("html")[0].style.overflow = "";
    };
    
    const addNoteToCart = (messageContent) => {
        context.addVariantToCart(giftVariant.shopifyId, 1, [{key: 'Message', value: messageContent}])
        setMessageShow(false)
    };
    
    const handleCheckboxClick = () => {
        if(giftLineId === '') {
            setMessageShow(!messageShow)
        } else {
            context.removeLineItem(context.store.client, context.store.checkout.id, giftLineId)
            setGiftLineId('')
        }
    }

    const rushProcessing = (e) => {
        e.preventDefault();
        if (rushLineId === '') {
            context.addVariantToCart(rushVariant.shopifyId, 1)
        } else {
            context.removeLineItem(context.store.client, context.store.checkout.id, rushLineId)
            setRushLineId('')
        }
    }
    const handleKeyDown = (e) => {
        e.preventDefault();
    }

    return (
        <div id="shopify-section-ajax-cart-custom" className="shopify-section">
            <div className="ajax-cart__modal js-ajax-cart-modal">
                <div className="ajax-cart-modal">
                    <div className="ajax-cart-modal__close js-ajax-cart-modal-close">
                        <i className="icon icon--close" style={{ width: '3.125em' }} aria-hidden="true"></i>
                        <span className="icon-fallback__text">&#10006;</span>
                    </div>
                    <div className="ajax-cart-modal__content js-ajax-cart-modal-content"></div>
                </div>
            </div>

            <div className="ajax-cart__drawer js-ajax-cart-drawer">
                <div className="ajax-cart-drawer">
                    <div className="ajax-cart-top-heading-container">
                        <div className="items-in-cart">MY BAG</div>
                        <div className="ajax-cart-drawer__close js-ajax-cart-drawer-close" 
                            onKeyDown={handleKeyDown}
                            onClick={cartDrawerClose}
                            role="button"
                            tabIndex="0">
                            <i className="icon icon--close" style={{ width: '3.125em' }} aria-hidden="true"></i>
                            <span className="icon-fallback__text">&#10006;</span>
                        </div>
                    </div>
                    <div className="free-shipping-heading empty"></div>   
                    { lineItems.length > 0 ?
                        (<div className="ajax-cart-drawer__button-and-subtotal">
                            <div className="cart-item-container">
                                <div className="cart-item">
                                    <span>
                                        <input onClick={handleCheckboxClick} id="personalizedMessageCheckbox" 
                                            type="checkbox" checked={giftLineId !== '' || messageShow} readOnly />
                                    </span>
                                    <span>
                                        <strong style={{ fontFamily: "'Avenir', sans-serif" }}>Personalised Gift Message:</strong> <span className="gift-message">Add a Card for $9.99</span>
                                    </span>
                                </div>

                                { messageShow && <GiftMessage addNoteToCart={addNoteToCart} /> }

                                <div className="cart-item" style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span>
                                        <input type="checkbox" id="rush-processing" 
                                            checked={rushLineId !== ''} onClick={rushProcessing} readOnly />
                                    </span>
                                    <span>
                                        <strong style={{ fontFamily: "'Avenir', sans-serif" }}>Rush Processing:</strong> <span className="gift-message">Ship within 24 hours for $8.95</span> 
                                    </span>
                                </div>
                    
                                <div className="cart-subtotal-container">
                                    <span className="subtotal-heading">Subtotal:</span>
                                    <span className="subtotal-amount">${context.store.checkout.subtotalPrice}</span>
                                </div>
                    
                                <div style={{ margin: '0 0 10px 0', minHeight: '20px',textAlign: 'center'}}>
                                    <span className="quadpay-cart">or 4 interest-free payments of <span id="quad-amount">${parseFloat(context.store.checkout.subtotalPrice / 4).toFixed(2)}</span> by <img className="quadpay-img" src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/229/assets/quadpay_200x.png?v=14478482058500416670" alt="" /></span>

                                </div>

                                <a href={context.store.checkout.webUrl} 
                                    className="c-btn--primary button button--black button--full-width js-button js-ajax-checkout-button" 
                                    style={{ background: '#000000'}}>
                                    <span>Checkout</span>
                                </a>       

                                <AjaxCartFooter />
                            </div>
                        </div>) : ""
                    }

                    <div className="ajax-cart-drawer__content js-ajax-cart-drawer-content">
                        { lineItems.length > 0 ?
                            (lineItems.map((item, index) => {
                            return (
                                <div className={`ajax-cart-item ${item.variant.title}`} key={index} data-line={index}>
                                    <div className="price-and-remove-item-wrapper">
                                        <div className="ajax-cart-item-remove js-ajax-remove-from-cart" role="button"
                                            tabIndex="0" onKeyDown={handleKeyDown} onClick={() => removeItem(item.id)}>✖</div>
                                    </div>
                                    <div className="ajax-cart-item-content">
                                        <div className="ajax-cart-item-image-container">
                                            <Link to={`/products/${item.variant.product.handle}`}>
                                                <img className="ajax-cart-item__image" alt={item.variant.title} src={item.variant.image.src} />
                                            </Link>
                                        </div>
                                        <div className="ajax-cart-item-middle-part">
                                            <div className="ajax-cart-item__title">
                                                <Link to={`/products/${item.variant.product.handle}`}>{item.variant.title}</Link>
                                            </div>
                                            <div className="ajax-cart-item-properties"> </div>
                                            <div className="ajax-cart-item-quantity-container">
                                                <div className="cart-item__qty">
                                                    <div className="js-qty">
                                                        <button type="button" 
                                                            className="js-qty__adjust js-qty__adjust--minus icon-fallback-text" 
                                                            data-id={item.id} onClick={() => decreaseItem(item.id, item.quantity)}>
                                                            <span aria-hidden="true">−</span>
                                                        </button>
                                                        <input type="text" className="js-qty__num ajax-cart-item__quantity" 
                                                            min="1" 
                                                            data-id={item.id}
                                                            aria-label="quantity" pattern="[0-9]*" 
                                                            id={`updates_${item.id}`} value={item.quantity} readOnly />

                                                        <button type="button" 
                                                            className="js-qty__adjust js-qty__adjust--plus" 
                                                            data-id={item.id} onClick={() => increaseItem(item.id, item.quantity)}>
                                                            <span aria-hidden="true">+</span>
                                                        </button>
                                                    </div>
                                                    <div className="ajax-cart-item__price">
                                                        <span>${item.variant.price * item.quantity} USD</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            )) : (
                                <AjaxCartEmpty />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="ajax-cart__overlay js-ajax-cart-overlay"></div>
        </div>
    );
};
    
export default AjaxCartCustom;