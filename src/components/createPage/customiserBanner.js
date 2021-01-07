import React, { useEffect } from 'react';
import { createPageData } from '../../data/createPage' 

const CustomiserBanner = () => {
    const scrollToOptions = (e) => {
        e.preventDefault();

        document.querySelector('#shopify-section-create-arrangements').scrollIntoView({
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        console.log("useEffect");

        setTimeout(function(){
            smoothLoadBanner();
        }, 500)

        const element_position = document.getElementsByClassName("create_steps-outer")[0].offsetTop;

        window.addEventListener('scroll', function() {     
            let y_scroll_pos = window.pageYOffset;
            let scroll_pos_test = element_position;

            if(y_scroll_pos > scroll_pos_test - 600) {
                //do stuff
                document.querySelector('.fadeOpacity_wrapper').style.opacity = "0";
            }else {
                document.querySelector('.fadeOpacity_wrapper').style.opacity = "1";
            }
        });

        // window.on('scroll', function() {
       
        // });
    })
   
    function smoothLoadBanner() {
        console.log('smoothLoadBanner')
        let imageColumns = document.querySelectorAll('.customiser_banner-image_column');

        for (let i = 0; i < imageColumns.length; i++) {
            setTimeout(() => {
                imageColumns[i].style.bottom = "0px";
                imageColumns[i].style.opacity = "1";
            }, 250 * i);
        }
    }

    return (
      <>
        <div id="shopify-section-customiser-banner" className="shopify-section">
            <div className="customiser_banner-outer">
                <div className="customiser_banner-inner">
                    <div className="customiser_banner-text_container">
                        <div className="customiser_banner-text_header">{createPageData.customiserBanner.title}</div>
                        <div className="customiser_banner-text_subheader">{createPageData.customiserBanner.contents}</div>
                        <a href="/fakeUrl" onClick={scrollToOptions} className="customiser_banner-text_link">{createPageData.customiserBanner.buttonText}</a>
                    </div>
                    <div className="customiser_banner-image_grid_container">
                        <div className="customiser_banner-image_grid">

                            {createPageData.customiserBanner.desktopImageItems.map((item, index) => 
                            <div className="desktop_column" key={index}>
                                <div className="customiser_banner-image_column">
                                    <div className="customiser_banner-image">
                                        <img src={item.image1} alt=""/>
                                    </div>
                                    <div className="customiser_banner-image">
                                        <img src={item.image2} alt=""/>
                                    </div>
                                </div>
                            </div>
                            )}

                            {createPageData.customiserBanner.mobileImageItems.map((item, index) => 
                            <div className="mobile_column" key={index}>
                                <div className="customiser_banner-image_column">
                                    <div className="customiser_banner-image">
                                        <img src={item.image1} alt=""/>
                                    </div>
                                    <div className="customiser_banner-image">
                                        <img src={item.image2} alt=""/>
                                    </div>
                                </div>
                            </div>
                            )}   
                        </div>
                    </div>
                </div>
            </div>
            <div className="fadeOpacity_wrapper">
              <div className="fadeOpacity"></div>
            </div>
        </div>
      </>
    )
}
  
export default CustomiserBanner