import React from 'react';
import { productPageData } from '../../data/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck } from "@fortawesome/free-solid-svg-icons"

const ProductInfo = ({ product, review }) => {
    return (
        <>
            <h1 className="product-single__title">{product.title}</h1>
            <div key="badge" dangerouslySetInnerHTML={{ __html: review.badge }} />

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
            <p className="product-features">
                { productPageData.productFeatures.map((Item, Index) => 
                    <span className="item" key={Index}>
                        <br />
                        <FontAwesomeIcon icon={faCheck} style={{ color: '#93c47d'}} size="1x" />
                        <strong>
                            <span style={{ color: 'rgb(0,0,0)', marginLeft: '5px' }}>{ Item.text }</span>
                        </strong>
                    </span>
                )}
            </p>
            <div className="shipping-tout">
                
                <FontAwesomeIcon icon={faTruck} size="1x" />

                <p>FAST SHIPPING FROM CALIFORNIA</p>
            </div>
        </>
    );
};

export default ProductInfo;