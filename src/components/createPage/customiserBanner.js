import React from 'react';
import { createPageData } from '../../data/createPage' 

const customiserBanner = () => {
    const scrollToOptions = (e) => {
        e.preventDefault();
        console.log('show sidenav');
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
        </div>
      </>
    )
}
  
export default customiserBanner