import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductInfo from "../components/ProductPage/ProductInfo"
import StoreContext from '../context/store'
import VariantSelectors from "../components/ProductPage/VariantSelectors"
import QuantityButton from "../components/ProductPage/QuantityButton"
import Buttons from "../components/ProductPage/Buttons"
import Gallery from "../components/ProductPage/Gallery"
import { Flex, Box } from 'rebass';
import ProductGallery from "../components/ProductPage/ProductGallery"

import RelatedProductList from "../components/relatedProductList";

const productPage = ({ data }) => {
    const context = useContext(StoreContext);
    const product = data.shopifyProduct;
    const relatedProducts = data.shopifyCollection.products ? data.shopifyCollection.products.slice(0, 7) : [];
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState(product.variants[0]);
    const productVariant = context.store.client.product.helpers.variantForOptions(product, variant) || variant;
    const [available, setAvailable] = useState(productVariant.availableForSale)

    useEffect(() => {
        let defaultOptionValues = {}
        product.options.forEach(selector => {
            defaultOptionValues[selector.name] = selector.values[0]
        })
        setVariant(defaultOptionValues)
    }, [])

    useEffect(() => {
        checkAvailability(product.shopifyId)
    }, [productVariant])

    const checkAvailability = productId => {
        context.store.client.product.fetch(productId).then((product) => {
            // this checks the currently selected variant for availability
            const result = product.variants.filter(
                variant => variant.id === productVariant.shopifyId
            )
            setAvailable(result[0].available)
        })
    }

    const handleOptionChange = event => {
        const { target } = event
        setVariant(prevState => ({
            ...prevState,
            [target.name]: target.value,
            ...console.log(variant)
        }))
    }

    return (
        <>
            <SEO title={product.title} />         

            <div id="ProductSection-product-template" className="product-template__container">
                <div className="grid product-single product-single--medium-media">
                    <div className="product_image-container">
                        <ProductGallery />
                    </div>
                    <div className="product_description-container">
                        <div className="grid__item medium-up--one-half rightSideProductContainer">
                            <div className="product-single__meta">

                            </div>
                            <div className="product-single__description rte">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-body" style={{ display: "block" }}>
                <div className="container">
                    <Flex
                        flexDirection={['column', null, 'row']}
                        pt={3}
                        px={4}
                    >
                        <Gallery product={product} />

                        <Box
                            flexDirection="column"
                            width={[1, null, 2.5 / 5]}
                            px={2}
                            data-product-info
                            order={3}
                        >
                            <div>
                                <ProductInfo product={product} />
                                <div className="columns">
                                    {
                                        product.options.map((options, optionIndex) => (
                                            <div className="column" key={optionIndex}>
                                                <VariantSelectors
                                                    onChange={handleOptionChange}
                                                    options={options}
                                                />
                                            </div>
                                        ))
                                    }
                                    <div className="column is-3">
                                        <QuantityButton quantity={quantity} setQuantity={setQuantity} />
                                    </div>
                                </div>
                                <br/>

                                <Buttons 
                                    context={context} 
                                    available={available} 
                                    quantity={quantity} 
                                    productVariant={productVariant}
                                />
                                <hr />
                                <div
                                    key={`body`}
                                    id="content"
                                    className="content"
                                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                                />
                            </div>
                        </Box>
                    </Flex>
                </div>
                <RelatedProductList products={relatedProducts} />
            </div>
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
