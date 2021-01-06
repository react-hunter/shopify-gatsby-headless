import React from 'react';
import { Link } from 'gatsby';
import { commonData } from '../../../data/common';

/* Banner carousel animation for side menu */

const cardSlider = ({ path }) => {

    return (
        <>
            <div id="card-slider-container" className="card-slider-container">
                <div className="slider-stack">
                    <div className="card-wrapper">
                        { commonData.cartSlider.map((item, index) => 
                        <div className="card-item" key={index}>
                            <a href={item.href}>
                                <div style={{ width:'100%' }}>
                                    <img src={item.imageUrl} />
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