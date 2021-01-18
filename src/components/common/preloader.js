import React, { useState, useEffect } from 'react';

const Preloader = (props) => {
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
            <div class="preloader">
              <div class="load-more_loader">
              </div>
            </div>
          ) :
          null
      }
    </>
  );
}

export default Preloader;
