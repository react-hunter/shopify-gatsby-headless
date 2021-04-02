import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component'
import '../../styles/productGallery.css';
import '../../styles/flickity.css';

const ProductBoxGallery = React.memo(function ProductBoxGallery(props) {
	let productGalleryCount = 0;
	let flkty;
	const product = props.product;
	const mainOption = props.mainOption;
	const swatchColor = props.swatchColor;
	const badgeStyles = props.badgeStyles;
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
				let imageUrl = '';
				variant.selectedOptions.map(selectedOption => {
					if(selectedOption.name === 'Rose Color' && selectedOption.value === swatchColor) {
						imageUrl = variant.image ? variant.image.originalSrc : 'https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_300x.png';
					}
					return true
				})
				return imageUrl
			})
			const filteredImages = selectedImages.filter(img => img !== '')
			setSwatchImages(filteredImages.slice(0, 3))
		}

		if (flkty) {
			flkty.on('change', () => {
				setSlideIndex(flkty.selectedIndex);
			})
		}
	}, [mainOption, swatchColor, product.variants, flkty])


	function gotoProductPage () {
		window.location.href=`/products/${product.handle}`;
	}

	const isBadgeEnable = () => {
		let isBadgeEnable = false;
		badgeStyles.map(item => {
			for (var i=0;i<product.tags.length;i++) {
				if (product.tags[i] === item.node.name) {
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
				if (product.tags[i] === item.node.name) {
					imageUrl = item.node.image.file.url;
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
							{ product.images[0] &&
								<img
									src={product.images[0].originalSrc}
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									role="presentation"
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title}
								/>
							}
							{ product.images[1] &&
								<img 
									src={product.images[1].originalSrc}
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									role="presentation"
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title}
								/>
							}
							{ product.images[2] &&
								<img 
									src={product.images[2].originalSrc}
									className="product-tile__image product-collection_image_primary grid-view-item__image"
									onClick={gotoProductPage}
									role="presentation"
									style={{ cursor: 'pointer' }}
									loading="lazy" alt={product.title}
								/>
							}
						</Flickity>
					: 
					<Flickity options={flickityOptions} flickityRef={c=> flkty = c} >
					{
						swatchImages.map((swatchImage, swatchImageIndex) => {
							return (
								<img 
									src={swatchImage}
									className="product-tile__image product-collection_image_primary grid-view-item__image lazy-load-mc"
									onClick={gotoProductPage}
									role="presentation"
									style={{ cursor: 'pointer' }}
									loading="lazy"
									key={swatchImageIndex}
									alt=''
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

ProductBoxGallery.displayName = 'ProductBoxGallery';

export default ProductBoxGallery;