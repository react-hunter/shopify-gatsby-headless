import React from 'react';
import { Link } from 'gatsby'
// import CustomImage from '../common/image'
import MyImage from '../common/lazyImage'
import "../../styles/imageSections.css";

const ImageSections = (props) => {
    return (
        <>
        { props.imageSections.map((imageItem, imageIndex) => 
            <div className="shopify-section" key={imageIndex}>
                <div className="fifty_fifty-container">
                    <div className="fifty_fifty-wrapper">

                        { imageItem.fields.imageLeft &&
                            <div className="fifty_fifty-image_container">
                                <MyImage className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={imageItem.fields.imageUrl.fields.file.url} alt="" />
                            </div>
                        }
                    
                        <div className="fifty_fifty-text_container">
                            <div className="fifty_fifty-text_container_inner">
                                <h3 className="fifty_fifty-title">
                                    {imageItem.fields.title}
                                </h3>
                                <p className="fifty_fifty-subtitle">
                                    {imageItem.fields.description}
                                </p>
                                <Link to={imageItem.fields.shopLink} className="fifty_fifty-button">
                                    <span>SHOP NOW</span>
                                </Link>
                            </div>
                        </div>

                        { imageItem.fields.imageLeft === false &&
                            <div className="fifty_fifty-image_container">
                                <MyImage className="fifty_fifty-img ls-is-cached lazyloaded" 
                                    src={imageItem.fields.imageUrl.fields.file.url} alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )}
        </>        
    );
};
    
export default ImageSections;