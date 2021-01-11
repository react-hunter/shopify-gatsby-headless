import React from 'react'; /* eslint-disable */

const VariantSelectorForModal = ({key, onChange, options}) => {
    const clickSelect = (e) => {
        e.preventDefault();
        console.log('clickSelect');
    }

    const closeNav = (e) => {
        e.preventDefault();
        console.log('closeNav');
    }

    return (
            <div id={`variantModal-${options.name}`} className="sidenav variantModal" key={key}>
                <div className="gridR">
                    <h3 className="varTitle">{options.name}</h3>
                    {
                        options.values.map((value, optionIndex) => (
                            <div className="gridC" onClick={clickSelect} key={optionIndex}>
                                <img id={`img-${value}`} 
                                    src="https://cdn.shopify.com/s/files/1/0157/4420/4900/products/Suede_Black_Single_Galaxy.png?v=1609647961"
                                    alt="" />
                                <h3>{ value }</h3>
                                <span id={`price-${value}`} className="sidePrice">$39</span>
                                <a href="/fakeUrl" 
                                    className="closebtn" 
                                    onClick={closeNav}>×</a>
                            </div> 
                        ))
                    }
                </div>
            </div>
    );
};

export default VariantSelectorForModal;