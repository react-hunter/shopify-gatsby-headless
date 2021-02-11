import React from 'react';
import { Link } from 'gatsby'
import MyImage from '../common/lazyImage'
import '../../styles/heroSection.css';

const HeroSection = (props) => {
    return (
        <div className="shopify-section">
            <div className="text_image_banner-container_outer">
                <div className="text_image_banner-container_inner">
                    <Link to={props.heroImage.imageUrl}> 
                        <MyImage src={props.heroImage.desktopImage ? props.heroImage.desktopImage.fluid.srcWebp : ''}
                            className="text_image_banner-img banner_img-desktop" style={{backgroundColor: '#000'}} alt="" />
                        {/* <Img fluid={props.heroImage.desktopImage.fluid} alt="" className="text_image_banner-img banner_img-desktop" loading="lazy" />
                        <Img fluid={props.heroImage.mobileImage.fluid} alt="" className="text_image_banner-img banner_img-mobile" loading="lazy" /> */}
                        
                        <MyImage src={props.heroImage.mobileImage ? props.heroImage.mobileImage.fluid.srcWebp : ''}
                            className="text_image_banner-img banner_img-mobile" alt="" />
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