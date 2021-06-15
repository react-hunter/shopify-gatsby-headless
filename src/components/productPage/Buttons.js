import React, { useState } from 'react';
import ImageSpin from '../common/imageSpin'
import loadable from '@loadable/component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calculateShipAndDeliverDate } from '../../helper/delivery';

const NotifyModal = loadable(() => import('../collectionPage/notifyModal'))

const Buttons = React.memo(function Buttons({
	product,
	protectionProduct,
	context,
	available,
	productVariant,
	quantity,
	variant
}) {
	const [showSpin, setShowSpin] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [notifyModalShow, setNotifyModalShow] = useState(false);
	const [messageContent, setMessageContent] = useState('');

	const handleAddToCart = () => {
		setShowSpin(true);
		const properties = calculateShipAndDeliverDate(variant.deliveryDate);
		context.addVariantToCart(productVariant.shopifyId, quantity, properties, variant.deliveryDate, messageContent);
		setTimeout(() => context.addProtection(protectionProduct.variants[2].shopifyId, variant.deliveryDate, messageContent), 1200);
		setTimeout(openCartDrawer, 2500);
		setShowMessage(false);
	}

	const handleAddToCart_BuyNow = () => {
		const properties = calculateShipAndDeliverDate(variant.deliveryDate);
		context.addVariantToCartAndBuyNow(productVariant.shopifyId, quantity, properties);
	}

	function openCartDrawer() {
		setShowSpin(false);
		document.querySelector(".js-ajax-cart-drawer").classList.add('is-open');
		document.getElementsByTagName("html")[0].classList.add("cart-drawer-open");
		document.querySelector(".js-ajax-cart-overlay").classList.add('is-open');
		document.documentElement.classList.add('is-locked');
	}
	
	const notifyMe = (e) => {
		e.preventDefault();
		showNotifyModal()
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

	const changeMessage = (e) => {
		setMessageContent(e.target.value)
	  }

	return (
		<div className="product-form__controls-group product-form__controls-group--submit">
			<div className="product-form__item product-form__item--submit mobile-in-view_trigger product-form__item--payment-button">
				{showMessage && <div className="giftmsg-container">
					<LazyLoadImage effect="blur" loading="eager" src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/DOR_Logo_Shop_Slim_XL_600x_600x_e8d2362f-25d0-4cc7-af87-ea45200dc5ea_300x.png?v=1565004065"
						alt=""
						itemProp="logo" />
					<textarea onChange={changeMessage} defaultValue={messageContent} data-limit-rows="false" rows="5" cols="25" data-cols="25" data-rows="5" maxLength="120" placeholder="Enter a gift message (optional)" id="gift-message-text" ></textarea>
					<div>
						<button className="close-message" onClick={() => setShowMessage(false)} >Close</button>
					</div>
				</div>
				}
				{!showMessage && <button
					className="add-message btn product-form__cart-submit btn--secondary-accent "
					disabled={!available}
					onClick={() => setShowMessage(true)}>+ Add a greeting card</button>
				}
				<button id="AddToCart"
					className="btn product-form__cart-submit btn--secondary-accent js-ajax-add-to-cart"
					disabled={!available}
					onClick={handleAddToCart}>{available ? "ADD TO BAG" : "SOLD OUT"}{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null}</button>
				<div className="shopify-payment-button">
					<button
						className="shopify-payment-button__button shopify-payment-button__button--unbranded"
						disabled={!available}
						onClick={handleAddToCart_BuyNow}>Buy It Now</button>
				</div>

				{!available? <a className="btn klaviyo-bis-trigger" href="/fakeUrl" onClick={notifyMe}>NOTIFY ME</a> : null}
			</div>

			{!available? <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} /> : null}
		</div>
	);
});

Buttons.displayName = 'Buttons';

export default Buttons;