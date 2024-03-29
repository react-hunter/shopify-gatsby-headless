import React, { useState, useContext } from 'react';
import ImageSpin from '../common/imageSpin'
import StoreContext from '../../context/store'

const AddToBagButton = React.memo(function AddToBagButton({
	getCurrentStep,
	getCollectionProducts,
	getSelections,
	getMainImageUrl,
	protectionProduct
}) {
	const [showSpin, setShowSpin] = useState(false);   
	const context = useContext(StoreContext);
	
	const handleKeyDown = (e) => {
		e.preventDefault();
	}

	const AddToBag = () => {

		var currentStep = getCurrentStep();
		var collectionProducts = getCollectionProducts();
		var selections = getSelections();
		var mainImageUrl = getMainImageUrl();

		if (currentStep !== 3)
		  return;
	
		const bagProduct = collectionProducts.filter(cp => cp.title === selections[0])
		
		const bagVariants = bagProduct[0].variants
		let bagVariant = null
		for(var i = 0; i < bagVariants.length; i++) {
		  if(bagVariants[i].options[0] === selections[1] && compareNumberLetter(bagVariants[i].options[1], selections[2])) {
				bagVariant = bagVariants[i]
				break
		  }
		}
	
		setShowSpin(true);
		
		context.addVariantToCart(bagVariant.id, 1, [
		  {key: 'Rose Color', value: selections[3]},
		  {key: 'Box', value: selections[1]},
		  {key: 'Style', value: selections[2]},
		  {key: 'linkImage', value: mainImageUrl }
		]);
		setTimeout(() => context.addProtection(protectionProduct.variants[2].shopifyId), 1200);
		if(checkIncludeFeature(selections[2])) {
			console.log('added feature, need to add $50');
			// context.addVariantToCart(roseFeatureVariantId, 1);
		}
		
		setTimeout(openCartDrawer, 2500);
	}

	function checkIncludeFeature(selectedFeature) {
		return !selectedFeature.includes('Solid');
	}

	function compareNumberLetter(variantOption, selectedOption) {
		let compared = false;
		if(variantOption === selectedOption) {
			compared = true;
		}
		if(variantOption.includes("Letter") && selectedOption.includes("Letter")) {
			compared = true;
		}
		if(variantOption.includes("Number") && selectedOption.includes("Number")) {
			compared = true;
		}

		return compared;
	}

	function openCartDrawer() {
		setShowSpin(false);	
		document.querySelector(".js-ajax-cart-drawer").classList.add('is-open');
		document.getElementsByTagName("html")[0].classList.add("cart-drawer-open");
		document.querySelector(".js-ajax-cart-overlay").classList.add('is-open');
		document.documentElement.classList.add('is-locked');	
	}

	return (
		<div style={{display:'none'}} 
			className="step-next" id="addToBAG" 
			onClick={AddToBag} onKeyDown={handleKeyDown} role="presentation">
				Add To Bag{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }
		</div>
	);
});

AddToBagButton.display = 'AddToBagButton';

export default AddToBagButton;