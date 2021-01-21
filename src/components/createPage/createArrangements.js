import React from 'react';
import { Link } from 'gatsby'
import { createPageData } from '../../data/createPage' 
// import { LazyLoadImage } from 'react-lazy-load-image-component'

const createArrangements = () => {
    
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
        const imgList = item.variants.map(va => va.imgUrl)
        return imgList.join(',')
    }

    return (
      <>
        <div id="shopify-section-create-arrangements" className="shopify-section">
            <div className="create_arrange-outer">
                <div className="create_arrange-header_outer">
                    <div className="create_arrange-header_inner">
                        <h2 id="customize" className="create_arrange-header">{createPageData.createArrangements.title}</h2>
                        <h4 className="create_arrange-subheader">{createPageData.createArrangements.subTitle}</h4>
                        <div className="create_header-underline"></div>
                    </div>
                </div>
                <div className="create_arrange-content_outer">
                    <div className="create_arrange-content_inner">
 
                        { createPageData.createArrangements.products.map((item, index) => 
                        <div className="create_arrange-block" key={index} data-product-name={item.name}>
                            <Link to={item.url}>
                                <img className="product-image" 
                                    src={item.image} data-imgs={getProductImages(item)} alt="" />
                            </Link>
                            <div className="create_arrange-title">{item.name}</div>
                            <div className="create_arrange-swatch">
                            <div className="create-landing_swatches">
                                {createPageData.createArrangements.options.map((option_item, option_index) => 
                                    <img src={option_item.buttonImage}
                                        onClick={() => triggerImg(item.name, option_index)}
                                        key={option_index} onKeyDown={handleKeyDown} role="presentation" alt="" />
                                )}
                            </div>
                            <Link to={item.url}>+  More</Link>
                            </div>
                            <div className="create_arrange-price">{item.fromPrice}</div>
                            <Link className="create_arrange-button" to={item.url}>CUSTOMIZE NOW</Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default createArrangements