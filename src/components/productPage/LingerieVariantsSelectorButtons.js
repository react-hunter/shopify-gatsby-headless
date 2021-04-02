import React from 'react';

const LingerieVariantsSelectorButtons = React.memo(function LingerieVariantsSelectorButtons({
	product,
	variant,
	changeOption,
	selectVariant,
	clickVariantSelect,
	findVariant
}) {
	const clickSelect = (optionName, optionValue) => {
		changeOption(optionName, optionValue)
		selectVariant(findVariant(optionName, optionValue));
		clickVariantSelect(true);
	}

	return (
		<div className="Lingerie-variants-selector-buttons">
		{ 
			product.options.map((options, optionIndex) => (
				!(options.name === 'Title' && variant[options.name] === 'Default Title') ? 
				(
					<div className="" key={optionIndex} data-type={options.name} >

						<span id={options.name} className="lingerie-option-type">{options.name}</span>
						
						<div className="lingerie-size-options_wrapper ">
							{
								options.values.map((value, index) => (
									<span className={`lingerie-size-option ${variant[options.name] === value ? 'selected-lingerie-swatch ' : '' }`} 
										onClick={() => clickSelect(options.name, value)}
										role="presentation"
										key={index}>{value}</span>
								))
							}								
						</div>
					</div>
				) : null
			))
		}
		</div>
	);
});

LingerieVariantsSelectorButtons.displayName = 'LingerieVariantsSelectorButtons';

export default LingerieVariantsSelectorButtons;