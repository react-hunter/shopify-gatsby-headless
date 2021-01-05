import React from 'react';

const Empty = () => {
    return (
        <div className="empty-page-content text-center" data-empty-page-content>
            <h1>Your cart</h1>
            <p className="cart--empty-message">Your cart is currently empty.</p>
            <div className="cookie-message">
                <p>Enable cookies to use the shopping cart</p>
            </div>
            <a href="/" className="btn btn--has-icon-after cart__continue-btn">Continue shopping → </a>
        </div>
    );
};

export default Empty;