import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import '../../../styles/widget.min.css'

const ProductBox = props => {
    const product = props.product;
    const review = props.review;

    return (
        <div className="Best-Sellers-Carousel-Cell double_img">
            <div className="img-bg">
                {/* { product.images[0] ? 
                    (<img 
                        className={`lazy-load-mc ${ product.images[1] ? 'main_img' : ''}`}
                        src={product.images[0].originalSrc}
                        alt={product.title}
                    />) : ""
                }
                { product.images[1] ? 
                    (<img 
                        className="best-carousel-product-img hover_img"
                        src={product.images[1].originalSrc}
                        alt={product.title}
                        style={{ cursor: 'pointer' }}
                    />) : ""
                } */}
                { product.images[0] ? 
                    (<LazyLoadImage 
                        className={`lazy-load-mc ${ product.images[1] ? 'main_img' : ''}`}
                        src={product.images[0].originalSrc}
                        alt={product.title}
                    />) : ""
                }
                { product.images[1] ? 
                    (<LazyLoadImage 
                        className="best-carousel-product-img hover_img"
                        src={product.images[1].originalSrc}
                        alt={product.title}
                        style={{ cursor: 'pointer' }}
                    />) : ""
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