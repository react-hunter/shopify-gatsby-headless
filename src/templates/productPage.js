/* eslint-disable */
import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import '../styles/productPage.scss';
import '../styles/widget.min.css';
const ProductGallery = loadable(() => import("../components/productPage/ProductGallery"))
const ProductDescription = loadable(() => import("../components/productPage/ProductDescription"))
const RelatedProductList = loadable(() => import("../components/productPage/RelatedProductList"))

const ProductPage = React.memo(function ProductPage({ data, pageContext }) {
	const product = data.shopifyProduct;
	const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
	const {
		id,
		productReviews,
		seoData
	} = pageContext;
	const relatedProducts = data.shopifyCollection.products ? data.shopifyCollection.products.slice(0, 8) : [];

	const [isVarantSelected, setIsVarantSelected] = useState(false);

	const productReview = productReviews.filter(pr => pr.handle === id)
	
	useEffect(() => {
		setTimeout(setPDPHeaderPadding, 1000);
	}, [])

	function setPDPHeaderPadding() {
		const headerElement = document.querySelector(".stickyHeader");
		const headerHeight = headerElement.offsetHeight;
		let mainProductSection = document.querySelector(".product-template__container");
		mainProductSection.style.marginTop = `${headerHeight}px`;
	}
		 
	return (
		<>
			<SEO
        title={seoData.title === '' ? `${product.title} - Dose of Roses` : `${seoData.title} - Dose of Roses`}
				mainTitle={seoData.title === '' ? product.title : seoData.title}
        description={seoData.description === '' ? product.description : seoData.description}
				type="product"
      />
			<div key="product-template" id="ProductSection-product-template" className="product-template__container">
				<div className="grid product-single product-single--medium-media">
					<ProductGallery product={product} isVarantSelected={isVarantSelected} selectedVariant={selectedVariant} key="product-gallery" />
					<ProductDescription
						product={product}
						protectionProduct={data.protectionProduct}
						data={data} 
						review={productReview[0]} 
						clickVariantSelect = {setIsVarantSelected}
						selectVariant={setSelectedVariant} 
						key="product-description" />
				</div>
			</div>
			<RelatedProductList 
				key="related-list"
				products={relatedProducts}
				protectionProduct={data.protectionProduct}
				reviewList={productReviews}
				badgeStyles={data.allContentfulCollectionBadgeStyleItem.edges}
			/>
		</>
	)
});

ProductPage.displayName = 'ProductPage';

export default ProductPage;

export const query = graphql`
	query($id: String!){
		shopifyProduct(handle: {eq: $id}) {
			id
			title
			handle
			productType
			descriptionHtml
			shopifyId
			options {
				id
				name
				values
			}
			variants {
				id
				title
				price
				availableForSale
				shopifyId
				compareAtPrice
				image {
					originalSrc
				}
				selectedOptions {
					name
					value
				}
			}
			images {
				originalSrc
				id
			}
		}
		shopifyCollection(handle: {eq: "best-sellers"}) {
			products {
				id
				handle
				productType
				title
				tags
				options {
					id
					name
					values
				}
				images {
					originalSrc
				}
				variants {
					id
					title
					availableForSale
					price
					shopifyId
					compareAtPrice
					image {
						originalSrc
					}
					selectedOptions {
						name
						value
					}
				}
			}
		}
		allContentfulCollectionBadgeStyleItem {
			edges {
				node {
					name
					image {
						gatsbyImageData
						file {
							url
						}
					}
				}
			}
		}
		protectionProduct: shopifyProduct(handle: {eq: "order-protection"}) {
      id
      shopifyId
      variants {
        id
        shopifyId
        price
      }
    }
	}
`
