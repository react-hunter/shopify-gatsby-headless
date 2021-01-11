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

    const findImage = (optionName, optionValue) => {
        var imgUrl = ''
        const otherOptionKeys = Object.keys(variant).filter(optionKey => optionKey !== optionName)

        variantList.map(va => {
            var matched = true;
            otherOptionKeys.map(ook => {
                if(!va.title.split(' / ').includes(variant[ook])) {
                    matched = false
                }
            })
            if(matched === true && va.title.split(' / ').includes(optionValue)) {
                imgUrl = va.image.originalSrc;
            }
        })
        return imgUrl
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
                                <span className="sidePrice">${productVariant.price}</span>
                                <a href="/fakeUrl" className="closebtn" onClick={closeNav}>×</a>
                            </div> 
                        ))
                    }
                </div>
            </div>
    );
};

export default VariantSelectorForModal;