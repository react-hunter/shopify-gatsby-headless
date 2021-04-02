import React, { useContext } from 'react';
import { Link } from 'gatsby'
import StoreContext from "../../context/store"
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Product = React.memo(function Product({ line_item }) {
	const context = useContext(StoreContext)
	const imageItem = line_item.variant.image && (
		<LazyLoadImage
			className="cart__image"
			src={line_item.variant.image.src}
			alt={line_item.variant.image.altText}
			effect="blur"
			loading="eager" 
		/>
	)

	const removeItem = (e) => {
		e.preventDefault();
		context.removeLineItem(context.store.client, context.store.checkout.id, line_item.id)
	}
	return (
		<>
			<tr className="cart__row">
				<td className="cart__meta small--text-left">
					<div className="cart__product-information">
						<div className="cart__image-wrapper">
							{imageItem}
						</div>
						<div>                                                    
							<div className="list-view-item__title">
								<Link to={ `/products/${line_item.variant.product.handle}` } className="cart__product-title">{ line_item.title }</Link>
							</div>
							<ul className="product-details">
								{line_item.variant.selectedOptions.map((op, op_index) => 
									<li className="product-details__item product-details__item--variant-option" key={op_index}>
										{op.name}: {op.value}
									</li>
								)}
								{line_item.customAttributes.map((attr, attr_index) => 
									<li className="product-details__item product-details__item--property" key={attr_index}>
										<span className="product-details__item-label" >{attr.key}</span>
										<span>{attr.value}</span>
									</li> 
								)}
							</ul>

							<p className="cart__remove">
								<a href="/fakeUrl" className="text-link text-link--accent" onClick={removeItem}>Remove</a>
							</p>
						</div>
					</div>
				</td>
				<td className="cart__price text-right">
					<div data-cart-item-price>${line_item.variant.price}</div>
				</td>
				<td className="cart__quantity-td text-right small--hide">
					<div className="cart__qty">
						<input className="cart__qty-input" defaultValue={line_item.quantity} />
					</div>
				</td>
				<td className="cart__final-price text-right small--hide">
					<div data-cart-item-regular-price-group="">
						<span>{`$${(line_item.quantity * line_item.variant.price).toFixed(2)}`}</span>
					</div>
				</td>
			</tr>
		</>
	);
});

Product.displayName = 'Product';

export default Product;