import React, { useState, useEffect } from 'react';

const Preloader = (props) => {
  const [ loadMore, setLoadMore ] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoadMore(false)
      props.allHide ? props.allHide(false) : console.log('hide');
    }, 500);
  });

  return (
    <>
      { loadMore ? 
          (
            <div className="preloader">
              <div className="spinner"></div>
              <div className="spinner-2"></div>
            </div>
          ) :
          null
      }
    </>
  );
}

export default Preloader;
