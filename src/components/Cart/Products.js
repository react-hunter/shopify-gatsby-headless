import React from 'react';
import Product from './Product.js'
import { cartpageData } from '../../data/cart' 

const Products = ({checkout}) => {

    return (
        <div data-cart-wrapper="">
            <div className="cart-header">
                <h1 className="cart-header__title">Your cart</h1>
                <a href="/collections/all" className="text-link text-link--accent">
                    Continue shopping
                </a>
            </div>

            <form action="/cart" method="post" noValidate="" className="cart">
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
                    {cartpageData.items.map((item, Index) => 
                        <tr className="cart__row" key={Index}>
                            <td className="cart__meta small--text-left">
                                <div className="cart__product-information">
                                    <div className="cart__image-wrapper">
                                        <img className="cart__image" src={ item.imageUrl } alt={ item.title } />
                                    </div>
                                    <div>                                    
                                        <div className="list-view-item__title">
                                            <a href={ item.url } className="cart__product-title">{ item.title }</a>
                                        </div>
                                        <ul className="product-details">
                                            {item.variants.map((va_item, va_index) => 
                                                <li className="product-details__item product-details__item--variant-option" key={va_index}>
                                                    {va_item.type} {va_item.value}
                                                </li>
                                            )}
                                            {item.properties.map((pr_item, pr_index) => 
                                                <li className="product-details__item product-details__item--property" key={pr_index}>
                                                    <span className="product-details__item-label" >{pr_item.name}</span>
                                                    <span>{pr_item.value}</span>
                                                </li> 
                                            )}
                                        </ul>

                                        <p className="cart__remove">
                                            <a href="/cart/change?line=1&amp;quantity=0" className="text-link text-link--accent">Remove</a>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="cart__price text-right">
                                <div data-cart-item-price>${item.price}</div>
                            </td>
                            <td className="cart__quantity-td text-right small--hide">
                                <div className="cart__qty">
                                    <input className="cart__qty-input" value={item.quantity} />
                                </div>
                            </td>
                            <td className="cart__final-price text-right small--hide">
                                <div data-cart-item-regular-price-group="">
                                    <span>{item.totalPrice}</span>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="cart__footer">
                    <div className="grid">
                        <div className="grid__item text-right small--text-center">
                            <div className="cart-subtotal">
                                <span className="cart-subtotal__title">Subtotal</span>
                                <span className="cart-subtotal__price">$999.99</span>
                            </div>
                            <div className="cart__shipping rte">Taxes and <a href="/policies/shipping-policy">shipping</a> calculated at checkout</div>
                            <div className="cart__buttons-container">
                                <div className="cart__submit-controls" >
                                    <input type="submit" name="checkout" className="cart__submit btn btn--small-wide" value="Check out" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Products;