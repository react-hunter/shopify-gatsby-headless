import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import StoreContext, { defaultStoreContext } from './store'
import { fbAddToCart, snapAddToCart } from '../helper';
const isBrowser = typeof window !== 'undefined'

const Provider = ({ children }) => {
	const [store, updateStore] = useState(defaultStoreContext)
	const getlocalStorage = (value) => {
		try {
			return JSON.parse(localStorage.getItem(value))
		} catch (e) {
			return ''
		}
	}
	useEffect(() => {
		const initializeCheckout = async () => {
			// Check if card exits already
			const isBrowser = typeof window !== 'undefined'
			const existingCheckoutID = isBrowser ? localStorage.getItem('shopify_checkout_id') : null

			const setCheckoutInState = checkout => {
				if (isBrowser) {
					localStorage.setItem('shopify_checkout_id', JSON.stringify(checkout.id))
				}

				updateStore(state => {
					return { ...state, checkout, adding: true }
				})
			}

			const localLineItems = JSON.parse(localStorage.getItem('checkout_lineitems'));
			const createNewCheckout = async () => {
				const newCheckout = await store.client.checkout.create()
				if(localLineItems && localLineItems.length > 0) {
					const lineItemsToUpdate = localLineItems.map(LI => {
						const attrList = LI.customAttributes.map(ca => {
							return {key: ca.key, value: ca.value}
						})
						return { variantId: LI.variant.id, quantity: parseInt(LI.quantity, 10), customAttributes: attrList.length > 0 ? attrList : [] }
					})
					await store.client.checkout.addLineItems(newCheckout.id, lineItemsToUpdate)
					const initialCheckout = await fetchCheckout(newCheckout.id)
					return initialCheckout
				} else {
					return newCheckout
				}
			}
			const fetchCheckout = id => store.client.checkout.fetch(id)

			if (existingCheckoutID) {
				try {
					const checkout = await fetchCheckout(existingCheckoutID)

					// Make sure this cart hasn’t already been purchased.
					if (!checkout.completedAt) {
						setCheckoutInState(checkout)
						return
					}
				} catch (e) {
					localStorage.setItem('shopify_checkout_id', null)
				}
			}
			const newCheckout = await createNewCheckout()
			setCheckoutInState(newCheckout)
		}
		initializeCheckout()
	}, [store.client.checkout])
	return (
		<StoreContext.Provider
			value={{
				store,
				customerAccessToken: getlocalStorage('customerAccessToken'),
				addVariantToCart: (variantId, quantity, properties=null) => {
					updateStore(state => {
						return { ...state, adding: true }
					})
					const { checkout, client } = store
					const checkoutId = checkout.id
					let lineItemsToUpdate = []
					if (!properties) {
						lineItemsToUpdate = [
							{ variantId, quantity: parseInt(quantity, 10) },
						]
					} else {
						lineItemsToUpdate = [
							{ variantId, quantity: parseInt(quantity, 10), customAttributes: properties },
						]
					}
					
					return client.checkout
						.addLineItems(checkoutId, lineItemsToUpdate)
						.then(checkout => {
							const lineItems = JSON.stringify(checkout.lineItems)
							localStorage.setItem('checkout_lineitems', lineItems)
							updateStore(state => {
								return { ...state, checkout, adding: true }
							})
						})
						.then(() => {
							fbAddToCart([variantId], 'product', 'USD');
							snapAddToCart();
						})
				},
				addVariantToCartAndBuyNow: (variantId, quantity) => {
					updateStore(state => {
						return { ...state, adding: true }
					})
					const { checkout, client } = store
					const checkoutId = checkout.id
					const lineItemsToUpdate = [
						{ variantId, quantity: parseInt(quantity, 10) },
					]
					return client.checkout
						.addLineItems(checkoutId, lineItemsToUpdate)
						.then(checkoutData => {
							updateStore(state => {
								return { ...state, checkoutData, adding: false }
							})
							fbAddToCart([variantId], 'product', 'USD');
							snapAddToCart();
							navigate(checkoutData.webUrl)
						})
				},
				removeLineItem: (client, checkoutID, lineItemID) => {
					return client.checkout
						.removeLineItems(checkoutID, [lineItemID])
						.then(checkoutData => {
							localStorage.setItem('checkout_lineitems', JSON.stringify(checkoutData.lineItems))
							updateStore(state => {
								return { ...state, checkout: checkoutData }
							})
						})
				},
				updateLineItem: (client, checkoutID, lineItemID, quantity) => {
					const lineItemsToUpdate = [
						{ id: lineItemID, quantity: parseInt(quantity, 10) },
					]
					return client.checkout
						.updateLineItems(checkoutID, lineItemsToUpdate)
						.then(checkoutData => {
							localStorage.setItem('checkout_lineitems', JSON.stringify(checkoutData.lineItems))
							updateStore(state => {
								return { ...state, checkout: checkoutData }
							})
						})
				},
				updateFilterType: type => {
					updateStore(state => {
						return { ...state, filteredType: type }
					})
				},
				updateFilterSort: sort => {
					updateStore(state => {
						return { ...state, filteredSort: sort }
					})
				},
				setValue: value => {
					isBrowser && localStorage.setItem('customerAccessToken', JSON.stringify(value))
					updateStore(state => {
						return { ...state, customerAccessToken: value }
					})
				}
			}}>
			{children}
		</StoreContext.Provider>
	);
};

export default Provider;