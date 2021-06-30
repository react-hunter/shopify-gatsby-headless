import React, { useContext, useState, useEffect } from 'react';
import loadable from '@loadable/component';
import AjaxCartFooter from './ajaxCartFooter';
import GiftMessage from './giftMessage';
// import OrderProtection from './orderProtection';
import AjaxCartEmpty from './ajaxCartEmpty';
import StoreContext from '../../context/store'
import { Link } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { client } from '../../contentful';
import { getRushProcessingSetting } from '../../helper/app-settings-helper';

const OrderProtection = loadable(() => import('./orderProtection'));

const AjaxCartCustom = React.memo(function AjaxCartCustom({giftVariant, rushVariant, protectionVariant}) {
	const context = useContext(StoreContext);
	const [lineItems, setLineItems] = useState([]);
	const [messageShow, setMessageShow] = useState(false);
	const [giftLineId, setGiftLineId] = useState('')
	const [rushLineId, setRushLineId] = useState('');
	const [disableRushProcessing, setDisableRush] = useState(false);

	useEffect(() => {
		client.getEntries({'content_type': 'newsletterSettings'}).then((entry => {
			setDisableRush(getRushProcessingSetting(entry.items));
		}))
	})

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
	const getCustomAttributes = (lineItem) => {
		if (lineItem.customAttributes.length > 1) {
			const attributeList = lineItem.customAttributes
			return (
				<>
					<p className="ajax-cart-item-property" key="rose-color"><b>Rose Colors:</b> {attributeList[0].value}</p>
					<p className="ajax-cart-item-property" key="rose-box"><b>Box:</b> {attributeList[1].value}</p>
					<p className="ajax-cart-item-property" key="rose-style"><b>Style:</b> {attributeList[2].value}</p>
				</>
			)
		} else {
			const optionAttributeList = lineItem.variant.selectedOptions
			if (optionAttributeList.length > 0) {
				return (
					<>
					{(optionAttributeList.map((item, index) => {
						if (item.name === "Box Material") {
							return <p className="ajax-cart-item-property" key="box-material" ><b>Box Material:</b> { item.value }</p>
						} else if (item.name === "Rose Color") {
							return <p className="ajax-cart-item-property" key="rose-color" ><b>Rose Color:</b> { item.value }<span className="color-circle variant-item-color" data-color={ item.value }></span></p>
						} else if (item.name === "Box Color") {   
							let color = item.value.split(" ")[0];

							return <p className="ajax-cart-item-property" key="box-color" ><b>Box:</b> { color }<span className="color-circle variant-item-color" data-color={ color }></span></p>
						} else if (item.name === "Title") {
							if ( item.value === 'Default Title')
								return '';
							else 
								return <p className="ajax-cart-item-property" key={index} ><b>{ item.name }:</b> { item.value }</p>
						} else {
							return <p className="ajax-cart-item-property" key={index} ><b>{ item.name }:</b> { item.value }</p>
						}
					}))}
					</>
				)
			}
		}
	}
	const getLineItemImage = (lineItem) => {
		const attributeList = lineItem.customAttributes
		let imgUrl = lineItem.variant.image.src
		attributeList.map(attr => {
			if(attr.key === 'linkImage') {
				imgUrl = attr.value
			}
			return true
		})
		return imgUrl
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
									{/* <span>
										<input onClick={handleCheckboxClick} id="personalizedMessageCheckbox" 
											type="checkbox" checked={giftLineId !== '' || messageShow} readOnly />
									</span> */}
									{/* <span>
										<strong style={{ fontFamily: "'Avenir', sans-serif" }}>Personalised Gift Message:</strong> <span className="gift-message">Add a Card for $9.99</span>
									</span> */}
									<button
										className="add-message btn--secondary-accent "
										onClick={handleCheckboxClick}>+ Add Personalized Message for $9.99</button>
								</div>

								{ messageShow && <GiftMessage addNoteToCart={addNoteToCart} /> }

								{disableRushProcessing !== true && (
									<div className="cart-item" style={{ borderBottom: '1px solid #e5e5e5' }}>
										<span>
											<input type="checkbox" id="rush-processing" 
												checked={rushLineId !== ''} onClick={rushProcessing} readOnly />
										</span>
										<span>
											<strong style={{ fontFamily: "'Avenir', sans-serif" }}>Rush Processing:</strong> <span className="gift-message">Ship within 24 hours for $8.95</span> 
										</span>
									</div>
								)}
					
								<div className="cart-subtotal-container">
									<span className="subtotal-heading">Subtotal:</span>
									<span className="subtotal-amount">${context.store.checkout.subtotalPrice}</span>
								</div>
					
								<div style={{ margin: '0 0 10px 0', minHeight: '20px',textAlign: 'center'}}>
									<span className="quadpay-cart">or 4 interest-free payments of <span id="quad-amount">${parseFloat(context.store.checkout.subtotalPrice / 4).toFixed(2)}</span> by <LazyLoadImage className="quadpay-img" src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/229/assets/quadpay_200x.png?v=14478482058500416670" alt="" /></span>
								</div>
								<OrderProtection
									protectionVariant={protectionVariant}
									context={context}
									lineItems={lineItems}
								/>
							</div>
							
							<a href={context.store.checkout.webUrl} 
								className="c-btn--primary button button--black button--full-width js-button js-ajax-checkout-button" 
								style={{ background: '#000000'}}>
								<span>Checkout</span>
							</a>       

							<AjaxCartFooter />
						</div>) : ""
					}

					<div className="ajax-cart-drawer__content js-ajax-cart-drawer-content">
						{ lineItems.length > 0 ?
							(lineItems.filter(li => li.title !== "Order Protection").map((item, index) => {
								return (
								<div className={`ajax-cart-item ${item.variant.title} ddddd`} key={index} data-line={index}>
									<div className="price-and-remove-item-wrapper">
										<div className="ajax-cart-item-remove js-ajax-remove-from-cart" role="button"
											tabIndex="0" onKeyDown={handleKeyDown} onClick={() => removeItem(item.id)}>✖</div>
									</div>
									<div className="ajax-cart-item-content">
										<div className="ajax-cart-item-image-container">
											<Link to={`/products/${item.variant.product.handle}`}>
												<LazyLoadImage  className="ajax-cart-item__image" alt={item.variant.title} 
													src={getLineItemImage(item)} />
											</Link>
										</div>
										<div className="ajax-cart-item-middle-part">
											<div className="ajax-cart-item__title">
												<Link to={`/products/${item.variant.product.handle}`}>{item.title}</Link>
											</div>
												<div className="ajax-cart-item-properties">
													{
														getCustomAttributes(item)
													}
												</div>
												{/* <div className="ajax-cart-item-properties">
													<p className="ajax-cart-item-property" key="rose-color"><b>Delivery Date:</b> {item.deliveryDate || ''}</p>
												</div> */}
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
														<span>${parseFloat(item.variant.price * item.quantity).toFixed(2)} USD</span>

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
});

AjaxCartCustom.displayName = 'AjaxCartCustom';

export default AjaxCartCustom;