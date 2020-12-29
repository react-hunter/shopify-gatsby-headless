import React from 'react';
import { homepageData } from '../data/homepage';

const HeroSection = () => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <a href={homepageData.heroImage.imageUrl}> 
                        <img src={homepageData.heroImage.desktopImage}
                            class="text_image_banner-img banner_img-desktop lazyload" />

                        <img src={homepageData.heroImage.mobileImage}
                            class="text_image_banner-img banner_img-mobile lazyload" />
                    </a>
                    <div className="text_image_banner-content_container">
                    </div>
                </div>
            </div>
        </div>
    );
};
    
export default HeroSection;