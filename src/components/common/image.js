import React, { useState, useEffect } from 'react';
import '../../styles/imageloader.css';

const CustomImage = (props) => {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(props.src)
    useEffect(() => {
      console.log('image: ', props.src)
      setImage(props.src);
    }, [props])
    const imageLoaded = () => {
      setLoading(false);
    }
    const hideClass = loading ? 'hide' : ''
    return (
      <>
        {image === '' ? null :
          <>
            { loading ? <ImageSpin /> : null }
            <img 
              src={image}
              className={`${props.className} ${hideClass}`}
              style={props.style}
              onLoad={imageLoaded}
              alt="" />
          </>
        }
      </>
    );
};

const ImageSpin = () => {
  return (
    <div className="imageloader">
      <div className="load-more_loader">
      </div>
    </div>
  );
}
    
export default CustomImage;