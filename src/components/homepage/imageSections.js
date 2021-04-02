import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import "../../styles/imageSections.css";

const ImageSections = React.memo(function ImageSections(props) {
	return (
		<>
		{ props.imageSections.map((imageItem, imageIndex) => 
			<div className="shopify-section" key={imageIndex}>
				<div className="fifty_fifty-container">
					<div className="fifty_fifty-wrapper">
						{ imageItem.imageLeft &&
							<div className="fifty_fifty-image_container">
								<span className="banner_img-mobile"><GatsbyImage image={imageItem.mobileImage.gatsbyImageData} className="fifty_fifty-img ls-is-cached" loading="lazy" alt="" /></span>
								<span className="banner_img-desktop"><GatsbyImage image={imageItem.desktopImage.gatsbyImageData} className="fifty_fifty-img ls-is-cached" loading="lazy" alt="" /></span>
							</div>
						}					
						<div className="fifty_fifty-text_container">
							<div className="fifty_fifty-text_container_inner">
								<h3 className="fifty_fifty-title">
									{imageItem.title}
								</h3>
								<p className="fifty_fifty-subtitle">
									{imageItem.description}
								</p>
								<Link to={imageItem.shopLink} className="fifty_fifty-button">
									<span>SHOP NOW</span>
								</Link>
							</div>
						</div>
						{ imageItem.imageLeft === false &&
							<div className="fifty_fifty-image_container">
								<span className="banner_img-mobile"><GatsbyImage image={imageItem.mobileImage.gatsbyImageData} className="fifty_fifty-img ls-is-cached" loading="lazy" alt="" /></span>
								<span className="banner_img-desktop"><GatsbyImage image={imageItem.desktopImage.gatsbyImageData} className="fifty_fifty-img ls-is-cached" loading="lazy" alt="" /></span>
							</div>
						}
					</div>
				</div>
			</div>
		)}
		</>
	);
});

ImageSections.displayName = 'ImageSections';

export default ImageSections;