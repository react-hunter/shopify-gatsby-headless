import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby'
import { client } from '../../contentful'
import CustomImage from '../common/image'

const CreateArrangements = () => {
    
    const [createArrangements, setCreateArrangements] = useState({
        title: 'SELECT A STYLE TO GET STARTED',
        subTitle: 'Choose your box color, material and rose colors. Personalize it with letters, numbers or symbols.',
        options: [],
        products: []
    });
    useEffect(() => {
        async function getArrangeData() {
            const arrangeData = await client.getEntries({'content_type': 'createArrangements'});
            const productsData = await client.getEntries({'content_type': 'productItem'});
            setCreateArrangements({
                title: arrangeData.items[0].fields.title,
                subTitle: arrangeData.items[0].fields.subTitle,
                options: arrangeData.items[0].fields.optionItem,
                products: productsData.items
            });

        }
        getArrangeData();
            
    }, [])
    const handleKeyDown = (e) => {
        e.preventDefault();
    }

    const triggerImg = (productName, optionIndex) => {
        let productItem = document.querySelectorAll(`[data-product-name='${productName}']`)[0];
        let productImageTag = productItem.getElementsByClassName('product-image')[0];
        let imageUrlArray = productImageTag.getAttribute('data-imgs').split(",");

        productImageTag.src = imageUrlArray[optionIndex];
    }


    const getProductImages = (item) => {
        const imgList = item.variantItem.map(va => va.fields.imgUrl.fields.file.url)
        return imgList.join(',')
    }

    return (
      <>
        <div id="shopify-section-create-arrangements" className="shopify-section">
            <div className="create_arrange-outer">
                <div className="create_arrange-header_outer">
                    <div className="create_arrange-header_inner">
                        <h2 id="customize" className="create_arrange-header">{createArrangements.title}</h2>
                        <h4 className="create_arrange-subheader">{createArrangements.subTitle}</h4>
                        <div className="create_header-underline"></div>
                    </div>
                </div>
                <div className="create_arrange-content_outer">
                    <div className="create_arrange-content_inner">
 
                        { createArrangements.products.map((item, index) => 
                            
                        <div className="create_arrange-block" key={index} data-product-name={item.fields.name}>
                            <Link to={item.fields.url}>
                                <CustomImage className="product-image" 
                                    src={item.fields.image.fields.file.url} data-imgs={getProductImages(item.fields)} alt="" />
                            </Link>
                            <div className="create_arrange-title">{item.fields.name}</div>
                            <div className="create_arrange-swatch">
                            <div className="create-landing_swatches">
                                {createArrangements.options.map((option_item, option_index) => 
                                    <CustomImage src={option_item.fields.buttonImage.fields.file.url}
                                        onClick={() => triggerImg(item.fields.name, option_index)}
                                        key={option_index} onKeyDown={handleKeyDown} small="small" role="presentation" alt="" />
                                )}
                            </div>
                            <Link to={item.fields.url}>+  More</Link>
                            </div>
                            <div className="create_arrange-price">{item.fields.fromPrice}</div>
                            <Link className="create_arrange-button" to={item.fields.url}>CUSTOMIZE NOW</Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default CreateArrangements