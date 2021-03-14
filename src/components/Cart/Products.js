import React from 'react';
import { Link } from 'gatsby'
import Product from './Product'

const Products = ({checkout}) => {
	return (
		<div data-cart-wrapper="">
			<div className="cart-header">
				<h1 className="cart-header__title">Your cart</h1>
				<Link to="/collections/all" className="text-link text-link--accent">
					Continue shopping
				</Link>
			</div>

			<div className="cart">
				<table>
					<thead className="cart__row cart__row--heading">
						<tr>
							<th scope="col">Product</th>
							<th className="text-right" scope="col">Price</th>
							<th className="text-right small--hide" scope="col">Quantity</th>
							<th className="text-right small--hide" scope="col">Total</th>
						</tr>
					</thead>

					<tbody data-cart-line-items>
					{checkout.lineItems.map(line_item => {
						return <Product key={line_item.id.toString()} line_item={line_item} />
					})}
					</tbody>
				</table>
				<div className="cart__footer">
					<div className="grid">
						<div className="grid__item text-right small--text-center">
							<div className="cart-subtotal">
								<span className="cart-subtotal__title">Subtotal</span>
								<span className="cart-subtotal__price">$ {checkout.totalPrice}</span>
							</div>
							<div className="cart__shipping rte">Taxes and <Link to="/policies/shipping-policy">shipping</Link> calculated at checkout</div>
							<div className="cart__buttons-container">
								<div className="cart__submit-controls" >
									<a href={checkout.webUrl} target="_blank" rel="noreferrer" className="cart__submit btn btn--small-wide">Check out</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;