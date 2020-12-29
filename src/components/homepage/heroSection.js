import React from 'react';
import { homepageData } from '../../data/homepage';
import './heroSection.css';

const HeroSection = () => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <a href={homepageData.heroImage.imageUrl}> 
                        <img src={homepageData.heroImage.desktopImage}
                            className="text_image_banner-img banner_img-desktop lazyload" alt="" />

                        <img src={homepageData.heroImage.mobileImage}
                            className="text_image_banner-img banner_img-mobile lazyload" alt="" />
                    </a>
                    <div className="text_image_banner-content_container">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;