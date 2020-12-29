import React from 'react';

const ProductBox = props => {
    const product = props.product
    return (
        <div className="column is-4" key={product.title}>
            <a href={`/product/${product.handle}`} >
                { product.images[0] ? 
                    (<img
                        src={product.images[0].originalSrc}
                        alt={product.title}
                    />) : ""
				}
                <p className="has-text-weight-semibold has-text-black">{product.title}</p>
                <p className="has-text-weight-light has-text-grey-dark">
                    ${product.variants[0].price}
                </p>
            </a>
            <a className="btn" href={`/product/${product.handle}`} >read more</a>
        </div>
    );
};

export default ProductBox;