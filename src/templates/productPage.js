import React, { useEffect } from 'react';
import SEO from "../components/common/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import ProductGallery from "../components/productPage/ProductGallery"
import ProductDescription from "../components/productPage/ProductDescription"
import RelatedProductList from "../components/productPage/RelatedProductList";

import '../styles/productPage.scss';
import '../styles/widget.min.css';

const ProductPage = ({ data, pageContext }) => {
    const product = data.shopifyProduct;
    const {id, productReviews} = pageContext;
    const relatedProducts = data.shopifyCollection.products ? data.shopifyCollection.products.slice(0, 2) : [];
    
    const productReview = productReviews.filter(pr => pr.handle === id)
    
    useEffect(() => {
        setTimeout(setPDPHeaderPadding, 800);
        const addToCartButtonSticky = document.querySelector(".atcSticky");

        if (addToCartButtonSticky){
            for (var i=0;i<addToCartButtonSticky.length;i++) {
                addToCartButtonSticky[i].style.display = "none";
            }
        } 
        // let showing = false;
    }, [])

    function setPDPHeaderPadding() {
        const headerElement = document.querySelector(".stickyHeader");
        const headerHeight = headerElement.offsetHeight;
      
        console.log("headerElement = ", headerElement);
        console.log("headerHeight = ", headerHeight);

        let mainProductSection = document.querySelector(".product-template__container");
        mainProductSection.style.marginTop = `${headerHeight}px`;
    }
         
    return (
        <>
            <Preloader />
            <SEO title={product.title} />

            <div key="product-template" id="ProductSection-product-template" className="product-template__container">
                <div className="grid product-single product-single--medium-media">
                    <ProductGallery product={product} key="product-gallery" />
                    <ProductDescription product={product} data={data} review={productReview[0]} key="product-description" />
                </div>
            </div>

            <RelatedProductList key="related-list" products={relatedProducts} reviewList={productReviews} />
        </>
    )
}

export default ProductPage

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
