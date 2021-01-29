import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { client } from '../../../contentful'

/* Banner carousel animation for side menu */

const CardSlider = ({ path }) => {
    const [cardSlider, setCardSlider] = useState([]);
    useEffect(() => {
        async function getSliderData() {
            const sliderData = await client.getEntries({'content_type': 'cardSlider'});
            setCardSlider(sliderData.items[0].fields.cardSliderItem);
        }

        getSliderData();
    }, [])
    return (
        <>
            <div id="card-slider-container" className="card-slider-container">
                <div className="slider-stack">
                    <div className="card-wrapper">
                        { cardSlider.map((item, index) => 
                            <div className="card-item" key={index}>
                                <a href={item.fields.href}>
                                    <div style={{ width:'100%' }}>
                                        <LazyLoadImage effect="blur" loading="eager" src={item.fields.imageUrl.fields.file.url} alt="" />
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

export default CardSlider