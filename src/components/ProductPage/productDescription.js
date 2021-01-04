import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import ProductInfo from "./ProductInfo"
import StoreContext from '../../context/store'
import VariantSelectors from "./VariantSelectors"
import QuantityButton from "./QuantityButton"
import Buttons from "./Buttons"
import { Flex, Box } from 'rebass';

const ProductDescription = ({ product }) => {

    const context = useContext(StoreContext);
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
        <div className="product_description-container">
            <div className="grid__item medium-up--one-half rightSideProductContainer">
                <div className="product-single__meta">
                    <ProductInfo product={product} />
                </div>
                <div className="product-single__description rte">

                </div>
            </div>
        </div>

        <div className="product_description-container">
                    <Flex
                        flexDirection={['column', null, 'row']}
                        pt={3}
                        px={4}
                    >
                        <Box
                            flexDirection="column"
                            px={2}
                            data-product-info
                            order={3}
                        >
                            <div>
                                
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
        </>
    );
}

export default ProductDescription;