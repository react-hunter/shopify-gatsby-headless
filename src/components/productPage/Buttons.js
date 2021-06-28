import React, { useState } from 'react';
import ImageSpin from '../common/imageSpin'
import loadable from '@loadable/component';
// import HintModal from './HintModal';

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
	const [showHintModal, setShowHintModal] = useState(false);

	const handleAddToCart = () => {
		setShowSpin(true);
		context.addVariantToCart(productVariant.shopifyId, quantity, null, null);
		setTimeout(() => context.addProtection(protectionProduct.variants[2].shopifyId, null), 1200);
		setTimeout(openCartDrawer, 2500);
		setShowMessage(false);
	}

	const handleAddToCart_BuyNow = () => {
		context.addVariantToCartAndBuyNow(productVariant.shopifyId, quantity)
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

	return (
		<div className="product-form__controls-group product-form__controls-group--submit">
			<div className="product-form__item product-form__item--submit mobile-in-view_trigger product-form__item--payment-button">
				<button id="AddToCart"
					className="btn product-form__cart-submit btn--secondary-accent js-ajax-add-to-cart"
					disabled={!available}
					onClick={handleAddToCart}>{available ? "ADD TO BAG" : "SOLD OUT"}{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null}</button>
				{/* <button
					className="send-hint-button"
					onClick={()=> setShowHintModal(true)}><span class="fas fa-gift" size="1x" />Send a hint</button> */}
				<div className="shopify-payment-button">
					<button
						className="shopify-payment-button__button shopify-payment-button__button--unbranded"
						disabled={!available}
						onClick={handleAddToCart_BuyNow}>Buy It Now</button>
				</div>

				{!available ? <a className="btn klaviyo-bis-trigger" href="/fakeUrl" onClick={notifyMe}>NOTIFY ME</a> : null}
			</div>
			{/* {showHintModal && <HintModal onClose={() => setShowHintModal(false)} />} */}

			{!available ? <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} /> : null}
		</div>
	);
});

Buttons.displayName = 'Buttons';

export default Buttons;