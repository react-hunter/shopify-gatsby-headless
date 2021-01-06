import React, { useContext } from 'react'; /* eslint-disable */
import SEO from "../components/seo"
import StoreContext from "../context/store"
import Products from "../components/Cart/Products"
import Empty from "../components/Cart/Empty"

const Cart = () => {

    const context = useContext(StoreContext)
    const { checkout } = context.store
    console.log('line items: ', checkout.lineItems)
    return (
        <>
            <SEO title="cart" />

            <div id="shopify-section-cart-template" className="shopify-section">
                <div className="page-width">
                    {
                        checkout.lineItems.length !== 0 ?
                        <Products checkout={checkout}/>
                        :
                        <Empty/>
                    }
                </div>
            </div>
        </>
    );
}

export default Cart;