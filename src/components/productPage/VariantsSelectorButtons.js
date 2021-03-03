import React from 'react';

const VariantsSelectorButtons = ({product,variant,openVariantAndFill}) => {

    return (
        <div className="variants-selector-buttons">
        { 
            product.options.map((options, optionIndex) => (
                !(options.name === 'Title' && variant[options.name] === 'Default Title') ? 
                (<div id={`variantModal-${options.name}-button`} data-type={options.name} 
                    className="optionBtn optionDefault" onClick={() => openVariantAndFill(options.name)} key={optionIndex}>

                    <span id={options.name} >{options.name}</span>
                    <span style={{ float: 'right', letterSpacing: '2px' }}> &gt; </span>
                    <span style={{ float:'right', marginRight: '20px' , letterSpacing: '2px'}} id="choice" 
                        className="choice-Box Color variantChoice">{variant[options.name]}</span>
                </div>) : null
            ))
        }
        </div>
    );
};

export default VariantsSelectorButtons;