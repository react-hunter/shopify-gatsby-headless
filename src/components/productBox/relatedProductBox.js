import React from 'react';
import { Link } from 'gatsby'

const RelatedProductBox = props => {
    const product = props.product;
    const review = props.review;

    return (
        <li className="grid__item grid__item--collection-template " key={product.title}>
            <div className="grid-view-item product-card">
                <span className="visually-hidden product-card-title">{product.title}</span>

                <div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper>
                    <div className="grid-view-item__image-wrapper product-card__image-wrapper js">
                        {/* <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/Best_Seller_stickers-01_150x.png?v=1605546945" className="badge" alt="" /> */}
                        <div className="collection-product_image_container">
                            { product.images[0] ? 
                                (<img 
                                    className="enableScrollOnMobile disableSaveImageIOS product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc lazyloaded"
                                    src={product.images[0].originalSrc}
                                    alt={product.title}
                                />) : ""
                            }
                            { product.images[1] ? 
                                (<img 
                                    className="enableScrollOnMobile product-tile__image product-collection_image_alternate"
                                    src={product.images[1].originalSrc}
                                    alt={product.title}
                                    style={{ cursor: 'pointer' }}
                                />) : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="h4 grid-view-item__title product-card__title product-card-title" aria-hidden="true">
                    <Link to={`/products/${product.handle}`}>{product.title}</Link>
                </div>

                <div className="collection-product-reviews_wrapper" key="badge" dangerouslySetInnerHTML={{ __html: review.badge }} />
                
                <div className="price price--listing price--on-sale">
                    <div className="price__regular"></div>
                    <div className="price__sale">
                        <span className="price-item price-item--sale">${product.variants[0].price}</span>
                    </div>
                    <div className="price__compare">

                    </div>
                </div>

                <div className="collection-product-color-swatch">

                </div>
            </div>
        </li>
    );
};

export default RelatedProductBox;