import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const VariantsSelectorButtons = React.memo(function VariantsSelectorButtons({
	product,
	variant,
	openVariantAndFill
}) {
  return (
    <div className="variants-selector-buttons">
      {product.options.map((options, optionIndex) =>
        !(options.name === 'Title' && variant[options.name] === 'Default Title') ? (
          <div
            id={`variantModal-${options.name}-button`}
            data-type={options.name}
            className="optionBtn optionDefault"
            onClick={() => openVariantAndFill(options.name)}
            key={optionIndex}
            role="presentation"
          >
            <span id={options.name}>{options.name}</span>
            <FontAwesomeIcon className="fa-angle-down arrow-icon" icon={faAngleRight} size="1x" />
            <span id="choice" className="choice-Box Color variantChoice">
              {variant[options.name]}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
});

VariantsSelectorButtons.displayName = 'VariantsSelectorButtons';

export default VariantsSelectorButtons;
