import React from 'react';
import { Link } from 'gatsby'
import { homepageData } from '../../data/homepage';
import '../../styles/heroSection.css';

const HeroSection = () => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <Link to={homepageData.heroImage.imageUrl}> 
                        <img src={homepageData.heroImage.desktopImage}
                            className="text_image_banner-img banner_img-desktop lazyload" alt="" />

                        <img src={homepageData.heroImage.mobileImage}
                            className="text_image_banner-img banner_img-mobile lazyload" alt="" />
                    </Link>

                    <div className="text_image_banner-content_container">
                        <div className="text_image_banner-title">{homepageData.heroImage.title}</div>
                        <div className="text_image_banner-subtitle">{homepageData.heroImage.buttonText}</div>
                        <Link to={homepageData.heroImage.imageUrl} 
                            className="text_image_banner-button">{homepageData.heroImage.buttonText}</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;