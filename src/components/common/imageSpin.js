import React from 'react';
import '../../styles/imageloader.css';
const ImageSpin = (props) => {
  const smallClass = props.small === 'small' ? 'small' : ''
  return (
    <div className={`imageloader ${smallClass}`}>
      <div className="load-more_loader"></div>
    </div>
  );
}

export default ImageSpin;