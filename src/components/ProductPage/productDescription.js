import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import ProductInfo from "./ProductInfo"
import StoreContext from '../../context/store'
import VariantSelectors from "./VariantSelectors"
import VariantSelectorsForModal from "./VariantSelectorsForModal"
import QuantityButton from "./QuantityButton"
import Buttons from "./Buttons"
import { Flex, Box } from 'rebass';

const ProductDescription = ({ product, review }) => {

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

        setVariant(defaultOptionValues);

        document.querySelectorAll('.accordion_button').forEach(button => {
            const accordionButton = button;
            accordionButton.innerHTML = accordionButton.innerHTML + '<i className="fas fa-angle-down"></i>';
            button.addEventListener('click', () => {
                button.classList.toggle('accordion_button--active');
            });
        });
    }, [])

    useEffect(() => {
        checkAvailability(product.shopifyId)
    }, [productVariant])


    function rotateButton(identifier){
        if(document.getElementsByClassName(identifier)[0].firstElementChild.style.transform == "rotate(0deg)"){
          document.getElementsByClassName(identifier)[0].firstElementChild.style.transform = "rotate(180deg)"
        }else{
          document.getElementsByClassName(identifier)[0].firstElementChild.style.transform = "rotate(0deg)"
        }
    }

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

    const openVariantAndFill = (id) => {
        console.log('openVariantAndFill id=', id);
    }

    return (
        <>
        <div className="product_description-container">
            <div className="grid__item medium-up--one-half rightSideProductContainer">
                <div className="product-single__meta">
                    <ProductInfo product={product} review={review} />

                    <div className="variants-selector-buttons">
                    { 
                        product.options.map((options, optionIndex) => (
                            <div id={`variantModal-${options.name}-button`} data-type={options.name} 
                                className="optionBtn optionDefault" onClick={() => openVariantAndFill(options.name)} key={optionIndex}>

                                <span id={options.name} >{options.name}</span>
                                <span style={{ float: 'right', letterSpacing: '2px' }}> &gt; </span>
                                <span style={{ float:'right', marginRight: '20px' , letterSpacing: '2px'}} id="choice" 
                                    className="choice-Box Color variantChoice">first variant</span>
                            </div>
                        ))
                    }
                    </div>

                    <div className="variants-selector">
                        {
                            product.options.map((options, optionIndex) => (
                                <div className="" key={optionIndex}>
                                    <VariantSelectors
                                        onChange={handleOptionChange}
                                        options={options}
                                    />
                                </div>
                            ))
                        }
                        <div className="column is-3" style={{ display: 'none' }}>
                            <QuantityButton quantity={quantity} setQuantity={setQuantity} />
                        </div>
                    </div>

                    <Buttons 
                        context={context} 
                        available={available} 
                        quantity={quantity} 
                        productVariant={productVariant}
                    />

                    <div className="variant-selector-sideNav">
                    {
                        product.options.map((options, optionIndex) => (
                            <VariantSelectorsForModal
                                key={optionIndex}
                                onChange={handleOptionChange}
                                options={options}
                            />
                        ))
                    }
                    </div>
                   
                </div>
                
                <div className="product-single__description rte">
                    <div
                        key={`body`}
                        id="content"
                        className="content"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />

                    <div className="product_accordions-container">
                        <button className="accordion_button returns-header">
                            BENEFITS FROM OUR ROSES<i className="fas fa-angle-down" style={{ transform: 'rotate(180deg)'}}></i>
                        </button>
                        <div className="accordion_content returns_content">
                            <p><strong>Hypoallergenic</strong>: have allergies for flowers or roses? Don’t worry, our roses won’t trigger your allergies as its living cells have been removed during preservation.</p>
                            <p><strong>Eco-Friendly</strong>: Our farms and preservation process is 100% environmentally friendly; every step of the way we take to cultivate and preserve your beautiful roses uses ecological and biodegradable techniques to ensure no waste and a healthy environmental life cycle.</p>
                            <p><strong>100% Recyclable</strong>: Unfortunately every beginning comes to an end, that’s nature. At the end of their cycle, your roses are 100% recyclable so you can dispose them easily knowing they will be reused for something else all part of our mission to preserving a healthy earth.</p>
                        </div>

                        <button className="accordion_button benefits-header">
                            LOCAL DELIVERY &amp; SHIPPING<i className="fas fa-angle-down" style={{ transform: 'rotate(180deg)'}}></i>
                        </button>
                        
                        <div className="accordion_content benefits_content">
                            <p><b>Local Pickup &amp; Delivery</b>: if you live in Los Angeles, California or nearby, we are able to deliver your beautiful rose arrangement with our concierge same-day or a future date. You can also choose to pickup your order at our distribution center in Downtown Los Angeles.</p>
                            <p><b>Domestic (US) Shipping</b>: If you live elsewhere in the United States, no worries, we’ve got you covered with fast shipping methods to ensure we meet your date and time through our delivery partners at FedEx and USPS. Rates may vary based on your order size, timeframe and location in order to provide you with the best delivery experience. Next-day (overnight) shipping is available if ordered before 1 PM PST (3 PM EST).</p>
                            <p><b>International Shipping</b>: If you or your recipient live outside the United States, we also got you covered for wherever you or they may be. We work with delivery partners such as DHL, FedEx, and USPS to make sure you and/or your loved one receive their beautiful roses within a reasonable timeframe. Again, rates may vary based on your order size, delivery timeframe and country you’re located in order to provide you with the best delivery experience. 
                                <b>Please note: your country may charge customs duties and taxes as we do not charge you for them since it’s outside our domestic territory. Please contact or visit your customs website for more information on what possible duties and taxes you may occur from your order. If your order is denied entry to your country, it is your responsibility to know if the products you purchase are allowed in your domicile. If we have to restock your order, there will be a 15% restocking fee and reasonable shipping costs for the order to return to us.
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductDescription;