import React from 'react';

const ProductInfo = ({ product }) => {
    return (
        <>
            <p className="has-text-weight-semibold is-size-2" key="title">{product.title}</p>
            <span class="stamped-badge" data-rating="5.0" data-lang="en" aria-label="Rated 5.0 out of 5 stars">
                <span class="stamped-starrating stamped-badge-starrating" aria-hidden="true">
                    <i class="stamped-fa stamped-fa-star" aria-hidden="true" key="1"></i>
                    <i class="stamped-fa stamped-fa-star" aria-hidden="true" key="2"></i>
                    <i class="stamped-fa stamped-fa-star" aria-hidden="true" key="3"></i>
                    <i class="stamped-fa stamped-fa-star" aria-hidden="true" key="4"></i>
                    <i class="stamped-fa stamped-fa-star" aria-hidden="true" key="5"></i>
                </span>
                <span class="stamped-badge-caption" data-reviews="1" data-rating="5.0" aria-label="1 reviews" data-version="2">
                    1<span> review</span>
                </span>
            </span>
            <p className="is-size-4 has-text-grey-dark" key="price">${product.variants[0].price}</p>
        </>
    );
};

export default ProductInfo;