import React from 'react';
import { Link } from 'gatsby'
import { createPageData } from '../../data/createPage' 

const createArrangements = () => {
    const onClickSpan = (e) => {
        console.log('show sidenav');
        e.preventDefault();
    }
    
    const handleKeyDown = (e) => {
        console.log('key down');
        e.preventDefault();
    }

    const triggerImg = (e) => {
        console.log('show sidenav');
        e.preventDefault();
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
                        <div className="create_arrange-block" key={index}>
                            <Link to={item.url}>
                                <img src={item.image} alt="" />

                                {item.variants.map((va_item, va_index) =>
                                    <img className="hide" src={va_item.imgUrl} alt="" key={va_index} />  /* data-src= images*/
                                )}
                            </Link>
                            <div className="create_arrange-title">{item.title}</div>
                            <div className="create_arrange-swatch">
                            <div className="create-landing_swatches">
                                {createPageData.createArrangements.variantType.map((va_type_item, va_type_index) => 
                                    <img onClick={triggerImg} src={va_type_item.buttonImage} alt="" key={va_type_index} onKeyDown={handleKeyDown} role="presentation" />
                                )}
                            </div>
                            <span onClick={onClickSpan} style={{ cursor:'pointer' }}  onKeyDown={handleKeyDown} role="presentation">+  More</span>
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