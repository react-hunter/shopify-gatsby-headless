import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import CustomImage from '../common/image'
import { client } from '../../contentful'

const CustomiserBanner = () => {
    const [customiserBanner, setCustomiserBanner] = useState({
        title: 'CUSTOMIZE YOUR DOSE OF ROSES',
        contents: "Choose arrangement style, box material, rose colors and personalize it with letters, numbers or symbols. All handmade with real roses that last up to five years.",
        buttonText: 'GET STARTED',
        desktopImageItems: [],
        mobileImageItems: []
    });

    useEffect(() => {
        async function getBannerData() {
            const bannerData = await client.getEntries({'content_type': 'customiserBanner'});
            const desktopImageData = await client.getEntries({'content_type': 'desktopImageItems'});
            const mobileImageData = await client.getEntries({'content_type': 'mobileImageItems'});
            setCustomiserBanner({
                title: bannerData.items[0].fields.title,
                contents: bannerData.items[0].fields.contents,
                buttonText: bannerData.items[0].fields.buttonText,
                desktopImageItems: desktopImageData.items[0].fields.customiserImageItem,
                mobileImageItems: mobileImageData.items[0].fields.customiserImageItem
            });
            setUI();
        }
        getBannerData();
    }, []);

    function setUI() {
        setTimeout(function(){
            smoothLoadBanner();
        }, 500)

        const element_position = document.getElementsByClassName("create_steps-outer")[0].offsetTop;
        
        window.addEventListener('scroll', function() {     
            let y_scroll_pos = window.pageYOffset;
            let scroll_pos_test = element_position;

            if (y_scroll_pos > scroll_pos_test - 600) {
                if (document.getElementById('fadeOpacity_wrapper') != null)
                    document.getElementById('fadeOpacity_wrapper').style.opacity = "0";
            } else {
                if (document.getElementById('fadeOpacity_wrapper') != null)
                    document.getElementById('fadeOpacity_wrapper').style.opacity = "1";
            }
        });
    }

    const scrollToOptions = (e) => {
        e.preventDefault();

        document.querySelector('#shopify-section-create-arrangements').scrollIntoView({
            behavior: 'smooth'
        });
    }
   
    function smoothLoadBanner() {
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
                        <div className="customiser_banner-text_header">{customiserBanner.title}</div>
                        <div className="customiser_banner-text_subheader">{customiserBanner.contents}</div>
                        <a href="/fakeUrl" onClick={scrollToOptions} className="customiser_banner-text_link">{customiserBanner.buttonText}</a>
                    </div>
                    <div className="customiser_banner-image_grid_container">
                        <div className="customiser_banner-image_grid">

                            {customiserBanner.desktopImageItems.map((item, index) => 
                            <div className="desktop_column" key={index}>
                                <div className="customiser_banner-image_column">
                                    <div className="customiser_banner-image">
                                        <CustomImage src={item.fields.image1.fields.file.url} alt=""/>
                                    </div>
                                    <div className="customiser_banner-image">
                                        <CustomImage src={item.fields.image2.fields.file.url} alt=""/>
                                    </div>
                                </div>
                            </div>
                            )}

                            {customiserBanner.mobileImageItems.map((item, index) => 
                            <div className="mobile_column" key={index}>
                                <div className="customiser_banner-image_column">
                                    <div className="customiser_banner-image">
                                        <CustomImage src={item.fields.image1.fields.file.url} alt=""/>
                                    </div>
                                    <div className="customiser_banner-image">
                                        <CustomImage src={item.fields.image2.fields.file.url} alt=""/>
                                    </div>
                                </div>
                            </div>
                            )}   
                        </div>
                    </div>
                </div>
            </div>
            <div id="fadeOpacity_wrapper" className="fadeOpacity_wrapper">
              <div className="fadeOpacity"></div>
            </div>
        </div>
      </>
    )
}
  
export default CustomiserBanner