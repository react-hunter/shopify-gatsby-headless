import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component'
import { GatsbyImage } from "gatsby-plugin-image";

import '../../styles/productGallery.css';
import '../../styles/flickity.css';

const ProductBoxGallery = React.memo(function ProductBoxGallery(props) {
	let productGalleryCount = 0;
	let flkty;
	const product = props.product;
	const mainOption = props.mainOption;
	const swatchColor = props.swatchColor;
	const badgeStyles = props.badgeStyles;
	const placeholderImage = props.placeholderImage;
	const [ slideIndex, setSlideIndex] = useState(0);
	const [ swatchImages, setSwatchImages ] = useState([]);
	const flickityOptions = {
		pageDots: false, 
		imagesLoaded: true, 
		touchVerticalScroll: false,
		dragThreshold : 10, 
		selectedAttraction: 0.01,
		friction: 0.2
	};
	productGalleryCount = mainOption === '' ? Math.min(product.images.length, 3) : Math.min(swatchImages.length, 3);
	useEffect(() => {
		if (mainOption !== '') {
			const selectedImages = product.variants.map(variant => {
				let imageData = null;
				variant.selectedOptions.map(selectedOption => {
					if(selectedOption.name === 'Rose Color' && selectedOption.value === swatchColor) {
						imageData = variant.image ? variant.image.imageData.childImageSharp.gatsbyImageData : placeholderImage;
					}
					return true
				})
				return imageData
			})
			const filteredImages = selectedImages.filter(img => img !== null)
			setSwatchImages(filteredImages.slice(0, 3))
		}

		if (flkty) {
			flkty.on('change', () => {
				setSlideIndex(flkty.selectedIndex);
			})
		} else {
		}

	}, [mainOption, swatchColor, product.variants, flkty, placeholderImage])


	function gotoProductPage () {
		console.log("product.handle = ", product.handle);
		window.location.href=`/products/${product.handle}`;
	}

	const isBadgeEnable = () => {
		let isBadgeEnable = false;
		badgeStyles.map(item => {
			for (var i=0;i<product.tags.length;i++) {
				if (product.tags[i] === item.fields.name) {
					isBadgeEnable = true;
				}
			}
			return true
		})
		return isBadgeEnable;
	}

	const getBadgeImage = () => {
		let imageUrl = '';
		badgeStyles.map(item => {
			for (var i=0;i<product.tags.length;i++) {
				if (product.tags[i] === item.fields.name) {
					imageUrl = item.fields.image.fields.file.url;
				}
			}
			return true
		})
		return imageUrl;
	}

	const getStyle = () => {
		if (productGalleryCount === 1) {
			return  { width: '100%' };
		} else if (productGalleryCount === 2) {
			if (slideIndex === 1) {
				return { width: '50%',  transform: 'translateX(100%)' };
			} else {
				return  { width: '50%' };
			}
		} else {
			if (slideIndex === 2) {
				return { transform: 'translateX(200%)' };
			} else if (slideIndex === 1) {
				return {transform: 'translateX(100%)' };
			}
		}
	}
	return (
		<div className="product-card__image-with-placeholder-wrapper" data-image-with-placeholder-wrapper >
			<div className="grid-view-item__image-wrapper product-card__image-wrapper js">
				{   
					isBadgeEnable() ? <img  src={getBadgeImage()} className="badge" alt="" /> : ''
				}

				<div className="collection-product_image_container">
				{
					mainOption === '' ?
						<Flickity options={flickityOptions} flickityRef={c=> flkty = c} >                           
							{ product.images[0] ? 
								<GatsbyImage image={product.images[0].imageData.childImageSharp.gatsbyImageData} 
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title} /> : ''
							}
							{ product.images[1] ? 
								<GatsbyImage image={product.images[1].imageData.childImageSharp.gatsbyImageData} 
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title} /> : ''
							}
							{ product.images[2] ? 
								<GatsbyImage image={product.images[2].imageData.childImageSharp.gatsbyImageData} 
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title} /> : ''
							}
						</Flickity>
					: 
					<Flickity options={flickityOptions} flickityRef={c=> flkty = c} >
					{
						swatchImages.map((swatchImage, swatchImageIndex) => {
							return (
								<GatsbyImage 
									className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
									image={swatchImage}
									alt=''
									onClick={gotoProductPage}
									loading="lazy"
									style={{ cursor: 'pointer' }}
									key={swatchImageIndex}
								/>
							)
						})
					}
					</Flickity>
				}
				</div>
			</div>                    
			<div className="carousel-scrollbar">
				<div className="carousel-scrollbar_bar" style={getStyle()}></div>
			</div>
		</div>
	);
});

export default ProductBoxGallery;