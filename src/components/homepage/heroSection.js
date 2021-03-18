import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import '../../styles/heroSection.css';

const HeroSection = React.memo(function HeroSection(props) {
	return (
		<div className="shopify-section">
			<div className="text_image_banner-container_outer">
				<div className="text_image_banner-container_inner">
					<Link to={props.heroImage.imageUrl}> 
						<GatsbyImage image={props.heroImage.mobileImage.gatsbyImageData} className="text_image_banner-img banner_img-mobile" loading="lazy" alt="" />
						<GatsbyImage image={props.heroImage.desktopImage.gatsbyImageData} className="text_image_banner-img banner_img-desktop" loading="lazy" alt="" />
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
	)
});

export default HeroSection;