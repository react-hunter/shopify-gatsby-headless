import React, { useState, useEffect } from 'react';
import '../../styles/imageloader.css';

const CustomImage = (props) => {
    const [loading, setLoading] = useState(true);
    const { src, className, style, ...other } = props
    const [image, setImage] = useState(src)
    useEffect(() => {
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
            { loading ? <ImageSpin small={props.small} /> : null }
            {/* <ImageSpin small={props.small} /> */}
            <img 
              src={image}
              className={`${className} ${hideClass}`}
              style={style}
              onLoad={imageLoaded}
              {...other} />
          </>
        }
      </>
    );
};

const ImageSpin = (props) => {
  const smallClass = props.small === 'small' ? 'small' : ''
  return (
    <div className={`imageloader ${smallClass}`}>
      <div className="load-more_loader">
      </div>
    </div>
  );
}
    
export default CustomImage;