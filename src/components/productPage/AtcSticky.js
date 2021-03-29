/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import ImageSpin from '../common/imageSpin'

const AtcSticky = ({ product, context, available, productVariant,  quantity }) => {

	let addToCartButtonSticky = '';
	let addToCartButton = '';
	let showing = false;
	const [showSpin, setShowSpin] = useState(false);
	const stickyFunction = useCallback(() => {
		if (isInViewport(addToCartButton)) {
			if (!showing) {
				showing = true;
				addToCartButtonSticky.classList.add('show');
			}
		} else {
			if (showing) {
				showing = false;
				addToCartButtonSticky.classList.remove('show');
			}
		}
	}, []);
	useEffect(() => {
		addToCartButton = document.querySelector(".mobile-in-view_trigger");
		addToCartButtonSticky = document.querySelector(".atcSticky");
		window.addEventListener('scroll', stickyFunction, {passive: true});
	}, [stickyFunction]);
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	const handleAddToCart = () => {
		setShowSpin(true);
		context.addVariantToCart(productVariant.shopifyId, quantity);
		setTimeout(openCartDrawer, 1200);
	}

	function openCartDrawer() {
		setShowSpin(false);
		document.querySelector(".js-ajax-cart-drawer").classList.add('is-open');
		document.getElementsByTagName("html")[0].classList.add("cart-drawer-open");
		document.querySelector(".js-ajax-cart-overlay").classList.add('is-open');
		document.documentElement.classList.add('is-locked');
	}

  return (
    <div className="atcSticky">
			<div className="product-form__controls-group--submit">
				<div className="product-form__item product-form__item--submit product-form__item--payment-button">
					<button style={{ height: '70px' }}
						className="btn product-form__cart-submit btn--secondary-accent js-ajax-add-to-cart"
						disabled={!available} onClick={handleAddToCart}>
							{available ? "ADD TO BAG" : "SOLD OUT"}{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }
					</button>
				</div>
			</div>
    </div>
  );
};

export default AtcSticky;