import React from 'react';
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import '../../styles/heroSection.css';

const HeroSection = (props) => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <Link to={props.heroImage.imageUrl}> 
                        <Img fluid={props.heroImage.desktopImage.fluid} alt="" className="text_image_banner-img banner_img-desktop" loading="lazy" />
                        <Img fluid={props.heroImage.mobileImage.fluid} alt="" className="text_image_banner-img banner_img-mobile" loading="lazy" />
                        
                    </Link>

                    <div className="text_image_banner-content_container">
                        <h2 className="text_image_banner-title">{props.heroImage.title}</h2>
                        <p className="text_image_banner-subtitle">{props.heroImage.subTitle}</p>
                        <Link to={props.heroImage.imageUrl} 
                            className="text_image_banner-button">{props.heroImage.buttonText}</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;