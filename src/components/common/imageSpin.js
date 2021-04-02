import React from 'react';
import '../../styles/imageloader.css';
const ImageSpin = React.memo(function ImageSpin(props) {
  const smallClass = props.small === 'small' ? 'small' : ''
  return (
    <div className={`imageloader ${smallClass}`}>
      <div className="load-more_loader"></div>
    </div>
  );
});

ImageSpin.displayName = 'ImageSpin';

export default ImageSpin;