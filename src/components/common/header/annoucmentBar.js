import React from 'react';
import { commonData } from '../../../data/common';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const annoucmentBar = ({ path }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 760,
        settings: {
        }
      }
    ]
  };

    return (
      <>
        <div className="annoucment-bar-w-controls">
          <div id="wrapper-announcement" className="center" data-state="Playing">
          </div>
          <div className="announcement-bar">
            <div className="ann_bars">
              <Slider {...settings}>
              { commonData.announceBarSettings.textList.map((item, index) => 
                <p className="announcement-bar__message" key={index} style={{ fontSize: item.fontSize }}>{item.description}</p>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </>
    )
}

export default annoucmentBar