import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { client } from '../../contentful'

const CreateSteps = () => {
    const [createSteps, setCreateSteps] = useState({
        title: 'How to Create Your Custom Dose',
        steps: []
    })
    useEffect(() => {
        async function getStepData() {
            const stepData = await client.getEntries({'content_type': 'createSteps'});
            setCreateSteps({
                title: stepData.items[0].fields.title,
                steps: stepData.items[0].fields.stepItem
            });
        }
        getStepData();
    }, [])
    return (
      <>
        <div id="shopify-section-create-steps" className="shopify-section">
            <div className="create_steps-outer">

                <div className="create_steps-header_outer">
                    <div className="create_steps-header_inner">
                        <h2 className="create_steps-header_content">{createSteps.title}</h2>
                        <div className="create_header-underline"></div>
                    </div>
                </div>

                <div className="create_steps-content_outer">
                    <div className="create_steps-content_inner">
                        { createSteps.steps.map((item, index) => 
                        <div className="create_stepsblock" key={index}>
                            <LazyLoadImage effect="blur" loading="eager" src={item.fields.image.fields.file.url} alt="" />
                            <span className="step-text">{item.fields.title}</span>
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
  
export default CreateSteps