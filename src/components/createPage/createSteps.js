import React from 'react';
import { createPageData } from '../../data/createPage' 
import { LazyLoadImage } from 'react-lazy-load-image-component'

const createSteps = () => {
    return (
      <>
        <div id="shopify-section-create-steps" className="shopify-section">
            <div className="create_steps-outer">

                <div className="create_steps-header_outer">
                    <div className="create_steps-header_inner">
                        <h2 className="create_steps-header_content">{createPageData.createSteps.title}</h2>
                        <div className="create_header-underline"></div>
                    </div>
                </div>

                <div className="create_steps-content_outer">
                    <div className="create_steps-content_inner">
                        { createPageData.createSteps.steps.map((item, index) => 
                        <div className="create_stepsblock" key={index}>
                            <LazyLoadImage effect="blur" loading="eager" src={item.image} alt="" />
                            <span className="step-text">{item.title}</span>
                        </div>
                        )}
                    </div>
                    <p className="create_steps-content_paragraph"></p>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default createSteps