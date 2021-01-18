import React from 'react';
import { commonData } from '../../../data/common';
import { LazyLoadImage } from 'react-lazy-load-image-component'

/* Banner carousel animation for side menu */

const cardSlider = ({ path }) => {

    return (
        <>
            <div id="card-slider-container" className="card-slider-container">
                <div className="slider-stack">
                    <div className="card-wrapper">
                        { commonData.cardSlider.map((item, index) => 
                        <div className="card-item" key={index}>
                            <a href={item.href}>
                                <div style={{ width:'100%' }}>
                                    <LazyLoadImage effect="blur" loading="eager" src={item.imageUrl} alt="" />
                                </div>
                            </a>
                        </div>
                        )}                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default cardSlider