import React from 'react';
import { LazyImage } from "react-lazy-images";
import '../../styles/imageloader.css';

const MyImage = (props) => {
    const { src, className, style, ...other } = props
    return (
      <LazyImage
        src={props.src}
        className={className}
        style={style}
        {...other}
        placeholder={
          ({ref}) =>
            <ImageSpin ref={ref} />
        }
        actual={
          ({imageProps}) =>
            <div className={'LazyImage-Actual'}>
              <img {...imageProps} />
            </div>
        }
      />
    );
};

const ImageSpin = React.forwardRef((props, ref) => {
  const smallClass = props.small === 'small' ? 'small' : ''
  return (
    <div ref={ref} className={`LazyImage-Placeholder imageloader ${smallClass}`}>
      <div className="load-more_loader">
      </div>
    </div>
  );
})
    
export default MyImage;