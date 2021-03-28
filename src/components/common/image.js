import React, { useState } from 'react';
import '../../styles/imageloader.css';

const CustomImage = (props) => {
  const [loading, setLoading] = useState(true);
  const { src, ...other } = props
  const imageLoaded = () => {
    // setTimeout(() => setLoading(false), 1200);
    setLoading(false)
  }
  const hideClass = loading ? 'hide' : '';
  return (
    <>
      {src === '' ? null :
        <>
          { loading ? <ImageSpin small={props.small} /> : null }
          <img 
            src={src}
            className={`${props.className} ${hideClass}`}
            onLoad={imageLoaded}
            alt=""
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