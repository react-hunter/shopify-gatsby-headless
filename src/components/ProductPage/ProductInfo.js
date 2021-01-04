import React from 'react';

const ProductInfo = ({ product }) => {
    return (
        <>
            <h1 className="product-single__title">{product.title}</h1>
            <span className="stamped-badge" data-rating="5.0" data-lang="en" aria-label="Rated 5.0 out of 5 stars">
                <span className="stamped-starrating stamped-badge-starrating" aria-hidden="true">
                    <i className="stamped-fa stamped-fa-star" aria-hidden="true" key="1"></i>
                    <i className="stamped-fa stamped-fa-star" aria-hidden="true" key="2"></i>
                    <i className="stamped-fa stamped-fa-star" aria-hidden="true" key="3"></i>
                    <i className="stamped-fa stamped-fa-star" aria-hidden="true" key="4"></i>
                    <i className="stamped-fa stamped-fa-star" aria-hidden="true" key="5"></i>
                </span>
                <span className="stamped-badge-caption" data-reviews="1" data-rating="5.0" aria-label="1 reviews" data-version="2">
                    1<span> review</span>
                </span>
            </span>

            <div className="product__price">
                <dl className="price price--on-sale">
                    <div className="price__pricing-group">
                        <div className="price__regular">
                            <dt>
                                <span className="visually-hidden visually-hidden--inline">Regular price</span>
                            </dt>
                            <dd>
                                <span className="sale-default-price price-item price-item--regular">
                                ${product.variants[0].price}
                                </span>
                            </dd>
                        </div>
                        <div className="price__sale">
                            <dt>
                                <span className="visually-hidden visually-hidden--inline">Sale price</span>
                            </dt>
                            <dd>
                                <span className="price-item price-item--sale was">
                                ${product.variants[0].price}
                                </span>
                            </dd>
                            <dt>
                                <span className="visually-hidden visually-hidden--inline">Regular price</span>
                            </dt>
                            <dd>
                                <s className="sale-default-price price-item price-item--regular">
                                ${product.variants[0].price}
                                </s>
                            </dd>
                        </div>

                        <div className="price__badges">
                            <span className="price__badge price__badge--sale" aria-hidden="true">
                                <span>Sale</span>
                            </span>
                            <span className="price__badge price__badge--sold-out">
                                <span>Sold out</span>
                            </span>
                        </div>
                    </div>
                    <div className="price__unit">
                        <dt>
                        <span className="visually-hidden visually-hidden--inline">Unit price</span>
                        </dt>
                        <dd className="price-unit-price">
                            <span data-unit-price=""></span>
                            <span aria-hidden="true">/</span>
                            <span className="visually-hidden">per&nbsp;</span>
                            <span></span>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
};

export default ProductInfo;