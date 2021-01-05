import React from 'react';
import { homepageData } from '../../data/homepage';
import "./imageSections.css";

const ImageSections = () => {
    return (
        <div>
        { homepageData.imageSections.map((menuItem, menuIndex) => 
            <div className="shopify-section" key={menuIndex}>
                <div className="fifty_fifty-container">
                    <div className="fifty_fifty-wrapper">

                        { menuItem.imageLeft &&
                            <div className="fifty_fifty-image_container">
                                <img className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={menuItem.imageUrl} alt="" />
                            </div>
                        }
                    
                        <div className="fifty_fifty-text_container">
                            <div className="fifty_fifty-text_container_inner">
                                <div className="fifty_fifty-title">
                                    {menuItem.title}
                                </div>
                                <div className="fifty_fifty-subtitle">
                                    {menuItem.description}
                                </div>
                                <a href={menuItem.shopLink} className="fifty_fifty-button">
                                    SHOP NOW
                                </a>
                            </div>
                        </div>

                        { menuItem.imageLeft === false &&
                            <div className="fifty_fifty-image_container">
                                <img className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={menuItem.imageUrl} alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )}
        </div>        
    );
};
    
export default ImageSections;