import React from 'react';
import { Link } from 'gatsby'
import "../../styles/imageSections.css";

const ImageSections = (props) => {
    return (
        <div>
        { props.imageSections.map((imageItem, imageIndex) => 
            <div className="shopify-section" key={imageIndex}>
                <div className="fifty_fifty-container">
                    <div className="fifty_fifty-wrapper">

                        { imageItem.fields.imageLeft &&
                            <div className="fifty_fifty-image_container">
                                <img className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={imageItem.fields.imageUrl.fields.file.url} alt="" />
                            </div>
                        }
                    
                        <div className="fifty_fifty-text_container">
                            <div className="fifty_fifty-text_container_inner">
                                <div className="fifty_fifty-title">
                                    {imageItem.fields.title}
                                </div>
                                <div className="fifty_fifty-subtitle">
                                    {imageItem.fields.description}
                                </div>
                                <Link to={imageItem.fields.shopLink} className="fifty_fifty-button">
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>

                        { imageItem.fields.imageLeft === false &&
                            <div className="fifty_fifty-image_container">
                                <img className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={imageItem.fields.imageUrl.fields.file.url} alt="" />
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