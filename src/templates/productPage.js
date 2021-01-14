import React, { useEffect } from 'react';
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Preloader from "../components/common/preloader"
import ProductGallery from "../components/ProductPage/ProductGallery"
import ProductDescription from "../components/ProductPage/productDescription"
import RelatedProductList from "../components/relatedProductList";


import '../styles/productPage.scss';

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
            <div key="reviews" dangerouslySetInnerHTML={{ __html: productReview[0].reviews }} style={{ display: 'none' }} />
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
