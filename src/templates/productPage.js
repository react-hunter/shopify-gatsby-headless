import React, { useEffect } from 'react';
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductGallery from "../components/ProductPage/ProductGallery"
import ProductDescription from "../components/ProductPage/productDescription"
import RelatedProductList from "../components/relatedProductList";

import './productPage.scss';

const ProductPage = ({ data, pageContext }) => {
    const product = data.shopifyProduct;
    const {id, productReviews} = pageContext;
    const relatedProducts = data.shopifyCollection.products ? data.shopifyCollection.products.slice(0, 2) : [];
    
    const productReview = productReviews.filter(pr => pr.handle === id)
    
    useEffect(() => {
        setPDPHeaderPadding();
    }, [])

    function setPDPHeaderPadding() {
        const headerElement = document.querySelector(".stickyHeader");
        const headerHeight = headerElement.offsetHeight;
      
        let mainProductSection = document.querySelector(".product-template__container");
        mainProductSection.style.marginTop = `${headerHeight}px`;
    }
      
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function setKlaviyoEvents() {
        document.getElementByClass("klav-popup-trigger").addEventListener("click", function () {
            document.getElementByClass("klav-popup").fadeIn();
            return false
        });

        document.getElementByClass("close-klav-popup").addEventListener("click", function () {
            document.getElementByClass("klav-popup").fadeOut();
            return false
        });      
    }

    function selectVariantSelectorOptionFromSwatch(overlay) {

        let productSwatches = overlay.parentElement.querySelector(".collection-product-color-swatch");
        if (productSwatches.querySelector(".selected-swatch") != null) {
          let selectedSwatch = productSwatches.querySelector(".selected-swatch").dataset.color;
          let optionSlides = overlay.querySelectorAll(".variantSelector-option_content");
      
          for (let i = 0; i < optionSlides.length; i++) {
            let optionSlide = optionSlides[i];
            let optionText = optionSlide.querySelector(".valueVariant");
            if (optionText.innerHTML == selectedSwatch) {
              optionSlide.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
              optionSlide.click();
              break;
            }
          }
        }
      }
      
    return (
        <>
            <SEO title={product.title} />

            <div id="ProductSection-product-template" className="product-template__container">
                <div className="grid product-single product-single--medium-media">
                    <ProductGallery product={product} />
                    <ProductDescription product={product} data={data} review={productReview[0]} />
                </div>
            </div>

            <RelatedProductList products={relatedProducts} reviewList={productReviews} />
            <div key="reviews" dangerouslySetInnerHTML={{ __html: productReview[0].reviews }} style={{ display: 'none' }} />
        </>
    )
}

export default ProductPage

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
