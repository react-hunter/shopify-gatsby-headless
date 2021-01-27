import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import CustomImage from '../image'
import '../../../styles/widget.min.css'

const ProductBox = props => {
    const product = props.product;
    const review = props.review;

    return (
        <div className="Best-Sellers-Carousel-Cell double_img">
            <div className="img-bg">
                { product.images.length === 0 ? 
                    <CustomImage 
                        className="lazy-load-mc"
                        src="https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_700x.png"
                        alt={product.title}
                        effect="blur"
                        loading="eager" 
                    />
                    : <>
                         {product.images[0] ? 
                            <CustomImage 
                                className={`lazy-load-mc ${ product.images[1] ? 'main_img' : ''}`}
                                src={product.images[0].originalSrc}
                                alt={product.title}
                                effect="blur"
                                loading="eager" 
                            /> : null}
                         {product.images[1] ? 
                            <CustomImage 
                                className="best-carousel-product-img hover_img"
                                src={product.images[1].originalSrc}
                                alt={product.title}
                                style={{ cursor: 'pointer' }}
                                effect="blur"
                                loading="eager" 
                            /> : null}
                    </>
                }
            </div>

            <Link to={`/products/${product.handle}`} className="carousel-cell_a" key={product.title}>
                <span className="Best-Sellers-Title">{product.title}</span>
                <div className="collection-product-reviews_wrapper" key="badge" dangerouslySetInnerHTML={{ __html: review ? review.badge : '' }} />
                <span className="Best-Sellers-Price">${product.variants[0].price}</span>
            </Link>
        </div>
    );
};

export default ProductBox;