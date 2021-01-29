import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import ProductInfo from "./ProductInfo"
import StoreContext from '../../context/store'
import { client } from '../../contentful'
import VariantSelectorsForModal from "./VariantSelectorsForModal"
import Buttons from "./Buttons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const ProductDescription = ({ product, review, selectVariant }) => {

    const context = useContext(StoreContext);
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState(product.variants[0]);
    const productVariant = context.store.client.product.helpers.variantForOptions(product, variant) || variant;
    const [available, setAvailable] = useState(productVariant.availableForSale)
    const [modalOptions, setOptions] = useState(product.options[0])
    const [modalClass, setModalClass] = useState('');
    const [productAccordions, setProductAccordions] = useState([]);

    useEffect(() => {
        async function getAccordionData() {
            const accordionData = await client.getEntries({'content_type': 'productAccordion'});
            setProductAccordions(accordionData.items);
            document.querySelectorAll('.accordion_button').forEach(button => {
                const accordionButton = button;
                accordionButton.innerHTML = accordionButton.innerHTML + '<i className="fas fa-angle-down"></i>';
                button.addEventListener('click', () => {
                    button.classList.toggle('accordion_button--active');
                });
            });
        }
        let defaultOptionValues = {}
        product.options.forEach(selector => {
            defaultOptionValues[selector.name] = selector.values[0]
        })

        setVariant(defaultOptionValues);
        getAccordionData()
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
            setAvailable(result[0] ? result[0].available : false)
        })
    }

    const handleOptionChange = (name, value) => {
        setVariant(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const openVariantAndFill = (optionName) => {
        const selectedOption = product.options.filter(po => po.name === optionName)[0];
        setOptions(selectedOption);
        setModalClass('top0');
    }

    const closeModal = () => {
        setModalClass('');
    }
    
    return (
        <div className="product_description-container">
            <div className="grid__item medium-up--one-half rightSideProductContainer">
                <div className="product-single__meta">
                    <ProductInfo product={product} review={review} />
                    <div className="variants-selector-buttons">
                    { 
                        product.options.map((options, optionIndex) => (
                            !(options.name === 'Title' && variant[options.name] === 'Default Title') ? 
                            (<div id={`variantModal-${options.name}-button`} data-type={options.name} 
                                className="optionBtn optionDefault" onClick={() => openVariantAndFill(options.name)} key={optionIndex}>

                                <span id={options.name} >{options.name}</span>
                                <span style={{ float: 'right', letterSpacing: '2px' }}> &gt; </span>
                                <span style={{ float:'right', marginRight: '20px' , letterSpacing: '2px'}} id="choice" 
                                    className="choice-Box Color variantChoice">{variant[options.name]}</span>
                            </div>) : null
                        ))
                    }
                    </div>

                    <Buttons 
                        context={context} 
                        available={available} 
                        quantity={quantity} 
                        productVariant={productVariant}
                    />

                    <div className="variant-selector-sideNav">
                        <VariantSelectorsForModal
                            changeOption={handleOptionChange}
                            options={modalOptions}
                            closeModal={closeModal}
                            modalClass={modalClass}
                            variantList={product.variants}
                            variant={variant}
                            // productVariant={productVariant}
                            selectVariant={selectVariant}
                        />
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
                    { productAccordions.map((item, index) => 
                        <div key={index}>
                        <button key={`btn_${index}`} className={`accordion_button ${item.fields.headerClass}`}>
                            { item.fields.header }
                            
                            <FontAwesomeIcon className="fa-angle-down" icon={faAngleDown} size="1x" />
                            
                        </button>   
                        <div key={`content_${index}`} className={`accordion_content ${item.fields.contentClass}`} dangerouslySetInnerHTML={{ __html: item.fields.content.content[0].content[0].value }} />
                        </div>
                    )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDescription;