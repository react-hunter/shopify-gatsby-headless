import React from 'react';

const AjaxCartEmpty = () => {
	return (
		<div className="cart-empty">
			<h5 className="cart-empty__title">Your cart is currently empty.</h5>
			<a href="/collections/all" className="c-btn c-btn--primary c-btn--full">Shop now</a>
		</div>
	);
}           
export default AjaxCartEmpty;