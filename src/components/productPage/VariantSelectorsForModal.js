import React from 'react'; /* eslint-disable */

const VariantSelectorForModal = ({productVariant, variantList, variant, changeOption, options, closeModal, modalClass}) => {
    const clickSelect = (optionName, optionValue) => {
        changeOption(optionName, optionValue)
        closeModal()
    }

    const closeNav = (e) => {
        e.preventDefault();
        closeModal()
    }

    const findVariant = (optionName, optionValue) => {
        var properVariant = null
        const otherOptionKeys = Object.keys(variant).filter(optionKey => optionKey !== optionName)

        variantList.map(va => {
            var matched = true;
            otherOptionKeys.map(ook => {
                if(!va.title.split(' / ').includes(variant[ook])) {
                    matched = false
                }
            })
            if(matched === true && va.title.split(' / ').includes(optionValue)) {
                properVariant = va;
            }
        })
        return properVariant
    }

    const findImage = (optionName, optionValue) => {
        const variant = findVariant(optionName, optionValue)
        return variant ? variant.image.originalSrc : '//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_300x.png'
    }
    const findPrice = (optionName, optionValue) => {
        const variant = findVariant(optionName, optionValue)
        return variant ? variant.price : 0
    }

    return (
            <div id={`variantModal-${options.name}`} className={`sidenav variantModal ${modalClass}`}>
                <div className="gridR">
                    <h3 className="varTitle">{options.name}</h3>
                    {
                        options.values.map((value, optionIndex) => (
                            <div className="gridC" onClick={() => clickSelect(options.name, value)} key={optionIndex}>
                                <img src={findImage(options.name, value)} alt="" />
                                <h3>{ value }</h3>
                                <span className="sidePrice">${findPrice(options.name, value)}</span>
                                <a href="/fakeUrl" className="closebtn" onClick={closeNav}>×</a>
                            </div> 
                        ))
                    }
                </div>
            </div>
    );
};

export default VariantSelectorForModal;