import React from 'react';
import { productPageData } from '../../data/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck } from "@fortawesome/free-solid-svg-icons"

const ProductInfo = ({ product, review }) => {
    
    var featuresArray = null;

    const getCorrectProductFeatures = (str) => {
        var array = str.split(/\r?\n/);
        featuresArray = array;
    }

    return (
        <>
            <h1 className="product-single__title">{product.title}</h1>
            <div key="badge" dangerouslySetInnerHTML={{ __html: review? review.badge : '' }} />

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

            {/* <div dangerouslySetInnerHTML={{ __html: review.features }} /> */}
            <p className="product-features">
                { getCorrectProductFeatures(productPageData.productFeatures)}
                {featuresArray.map((item,index) =>
                    <span className="item" key={index}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: '#93c47d'}} size="1x" />
                        <strong>
                            <span style={{ color: 'rgb(0,0,0)', marginLeft: '5px' }}>{item}</span>
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