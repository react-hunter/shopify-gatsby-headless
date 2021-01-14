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
            <svg className="progress-announcement white noselect" data-progress="65" x="0px" y="0px" viewBox="0 0 80 80">
              <path className="track" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
              <path className="fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
              <text className="value" x="50%" y="55%">
                <i id="carousel-button" className="fas fa-pause pause-btn"></i>
              </text>
            </svg>
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