/* eslint-disable react-hooks/exhaustive-deps, no-loop-func, no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from "@fortawesome/free-solid-svg-icons"

const AnnoucmentBar = React.memo(function AnnoucmentBar({ announceList }) {
  let anntimer = 0;
  let percent = 0;
  
  const settings = {
    dots: false,
    Infinte: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          dots:  true,
        }
      }
    ]
  };
  const slider = useRef(null);
  useEffect(() => {
    progressAnnouncement();
  }, []);

  function sliderPause() {
    slider.current.slickPause();
  }

  function sliderPrev() {
    slider.current.slickPrev();
  }

  function sliderNext(){
    slider.current.slickNext();
  }

  function progressAnnouncement() {
    document.getElementById("wrapper-announcement").addEventListener("click", function () {
      
      if (document.getElementById("wrapper-announcement").dataset.state === "Playing") {
        document.getElementById("wrapper-announcement").setAttribute("data-state", "Stopped")
        clearInterval(window.anninterval)

        sliderPause();
        document.getElementById("carousel-button").setAttribute("class", "fas fa-play pause-btn")
      } else {
        document.getElementById("wrapper-announcement").setAttribute("data-state", "Playing")
        anntimer = 0;
        sliderPause();
  
        triggerPlay();
        document.getElementById("carousel-button").setAttribute("class", "fas fa-pause pause-btn")
      }
    });

    if (window.innerWidth > 680) {
      triggerPlay();
    } else {
      sliderPause();
    }
  
    setTimeout(() => {
      let buttons = document.getElementsByClassName("flickity-button");
      for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', function () {
          sliderPause();
          anntimer = 0;
          document.getElementById("wrapper-announcement").setAttribute("data-state", "Stopped")
          clearInterval(window.anninterval)
          document.getElementById("carousel-button").setAttribute("class", "fas fa-play pause-btn")
          const progressElement = document.querySelectorAll('.progress-announcement')[0];
          let max = -219.99078369140625;
          percent = parseInt(progressElement.getAttribute('data-progress'));
          progressElement.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - (Math.round((anntimer / Number("5000")) * 100)).toFixed(2)) / 100) * max);
        })
      }
    }, 300);
  }

  function triggerPlay() {
    window.anninterval = setInterval(() => {  
      if (anntimer === Number("5000")) {
        anntimer = 0;
  
      } else {
        anntimer = anntimer + 1000;
      }
      const progressElement = document.querySelectorAll('.progress-announcement')[0];
      let max = -219.99078369140625;
      percent = parseInt(progressElement.getAttribute('data-progress'));
      progressElement.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - (Math.round((anntimer / Number("5000")) * 100)).toFixed(2)) / 100) * max);  
    }, 830);
  }

  const announcementBarStyle = {
    backgroundColor: `${announceList[0].node.announcebarsettings[0].backgroundColor}`
  };
  
  function announcementMessageStyle(index) {
    return {
      fontSize: announceList[index].node.fontSize
    }
  };  

  return (
    <>
      <div className="annoucment-bar-w-controls">
        <div id="wrapper-announcement" className="center" data-state="Playing">
          <svg className="progress-announcement white noselect" data-progress="65" x="0px" y="0px" viewBox="0 0 80 80">
            <path className="track" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
            <path className="fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
          </svg>
          
          <FontAwesomeIcon id="carousel-button" className="fa-pause" icon={faPause} size="sm" />
        </div>
        <div className="announcement-bar" style={announcementBarStyle}>
          <div className="ann_bars">
            <Slider ref={slider} {...settings}>
            { announceList.map((item, index) => 
              item.node.url ?
                <div key={index}>
                  <a href={item.node.url} className="announcement-bar__message" style={announcementMessageStyle(index)}>{item.node.description}</a>
                </div>
                :
                <div key={index}>
                  <p className="announcement-bar__message" style={announcementMessageStyle(index)}>{item.node.description}</p>
                </div>
            )}
            </Slider>
            
              <svg id="annoucmentBar_prev_button" 
                onClick={sliderPrev}
                className="flickity-button-icon prev-button" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path></svg>
              <svg id="annoucmentBar_next_button" 
                onClick={sliderNext}
                className="flickity-button-icon next-button" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path></svg>
          </div>
        </div>
      </div>
    </>
  )
});

AnnoucmentBar.displayName = 'AnnoucmentBar';

export default AnnoucmentBar;