import React from 'react';
import { Link } from 'gatsby'
import CustomImage from '../common/image'
import '../../styles/heroSection.css';

const HeroSection = (props) => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <Link to={props.heroImage.imageUrl}> 
                        <CustomImage src={props.heroImage.desktopImage ? props.heroImage.desktopImage.fields.file.url : ''}
                            className="text_image_banner-img banner_img-desktop lazyload" style={{backgroundColor: '#000'}} alt="" />
                        
                        <CustomImage src={props.heroImage.mobileImage ? props.heroImage.mobileImage.fields.file.url : ''}
                            className="text_image_banner-img banner_img-mobile lazyload" alt="" />
                    </Link>

                    <div className="text_image_banner-content_container">
                        <div className="text_image_banner-title">{props.heroImage.title}</div>
                        <div className="text_image_banner-subtitle">{props.heroImage.subTitle}</div>
                        <Link to={props.heroImage.imageUrl} 
                            className="text_image_banner-button">{props.heroImage.buttonText}</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;