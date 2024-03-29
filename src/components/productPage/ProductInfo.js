import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import loadable from '@loadable/component';
const ProductReview = loadable(() => import('../common/product/productReview'));

const ProductInfo = React.memo(function ProductInfo({
	product,
	review
}) {
	const [featuresList, setFeaturesList] = useState([]);
	useEffect(() => {
		const featuresString = review ? review.features : ''
		if (featuresString !== '') {
			const featureList = featuresString.split(/\r?\n/);
			setFeaturesList(featureList);
		}
	}, [review]);
	
	return (
		<>
			<h1 className="product-single__title">{product.title}</h1>
			{/* <div key="badge" dangerouslySetInnerHTML={{ __html: review? review.badge : '' }} /> */}
			<div className="product-review">
				{review && <ProductReview data={review.data} />}
			</div>

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
									{product.variants[0].compareAtPrice ? '$' + product.variants[0].compareAtPrice : null}
									</s>
								</dd>
						</div>


						{/* <div className="price__badges">
							<span className="price__badge price__badge--sale" aria-hidden="true">
								<span>Sale</span>
							</span>
							<span className="price__badge price__badge--sold-out">
								<span>Sold out</span>
							</span>
						</div> */}

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
				{featuresList.map((item,index) =>
					<span className="item" key={index}>
						<FontAwesomeIcon icon={faCheck} style={{ color: '#93c47d'}} size="1x" />
						<strong>
							<span style={{ color: 'rgb(0,0,0)', marginLeft: '5px' }}>{item}</span>
						</strong>
					</span>
				)}
			</p>
		</>
	);
});

ProductInfo.displayName = 'ProductInfo';

export default ProductInfo;