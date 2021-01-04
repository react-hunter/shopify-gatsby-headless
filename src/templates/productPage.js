import React from 'react';
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGallery from "../components/ProductPage/ProductGallery"
import ProductDescription from "../components/ProductPage/ProductDescription"
import RelatedProductList from "../components/relatedProductList";

import './productPage.scss';

const productPage = ({ data }) => {
    const product = data.shopifyProduct;
    const relatedProducts = data.shopifyCollection.products ? data.shopifyCollection.products.slice(0, 2) : [];

    return (
        <>
            <SEO title={product.title} />         

            <div id="ProductSection-product-template" className="product-template__container">
                <div className="grid product-single product-single--medium-media">
                    <ProductGallery product={product} />
                    <ProductDescription product={product} data={data} />
                </div>
            </div>

            <RelatedProductList products={relatedProducts} />
        </>
    )
}

export default productPage

export const query = graphql`
    query($id: String!){
		shopifyProduct(handle: {eq: $id}) {
			handle
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
				selectedOptions {
					name
					value
				}
			}
			images {
				originalSrc
				id
				localFile {
					childImageSharp {
						fluid(maxWidth: 910) {
							...GatsbyImageSharpFluid_withWebp_noBase64
						}
					}
				}
            }
        }
        shopifyCollection(handle: {eq: "best-sellers"}) {
            products {
                id
                handle
                title
                images {
                    originalSrc
                }
                variants {
                    id
                    availableForSale
                    price
                }
            }
        }
	}
`
