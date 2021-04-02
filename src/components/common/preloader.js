import React, { useState, useEffect } from 'react';

const Preloader = React.memo(function Preloader(props) {
  const [ loadMore, setLoadMore ] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoadMore(false)
      if(props.allHide)
        props.allHide(false)
    }, 500);
  });

  return (
    <>
      { loadMore ? 
        (
          <div className="preloader">
            <div className="load-more_loader">
            </div>
          </div>
        ) :
        null
      }
    </>
  );
});

Preloader.displayName = 'Preloader';

export default Preloader;
