import React, { useEffect } from 'react';
import Preloader from "../../components/common/preloader"
import { faqPageData } from '../../data/faq' 

const Faqs = ({ data }) => {      
    useEffect(() => {
        document.querySelectorAll('.accordion_button').forEach(button => {
            const accordionButton = button;
            accordionButton.innerHTML = accordionButton.innerHTML + '<i className="fas fa-angle-down"></i>';
            button.addEventListener('click', () => {
                button.classList.toggle('accordion_button--active');
            });
        });

        document.querySelectorAll('.faq_content-accordion_button').forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('faq_content-accordion_button--active');
            });
        });
    })
      
    return (
      <>
        <Preloader />
        <div className="faq_page">
            <div id="shopify-section-faq-banner-top" className="shopify-section">
                <div className="faq_banner-container">
                    <div className="faq_banner-wrapper">
                        <img className="faq_desktop-banner" src={ faqPageData.banner.imageDesktop } alt="" />
                        <img className="faq_mobile-banner" src={ faqPageData.banner.imageMobile } alt="" />
                        <div className="faq_banner-text_container">
                            <div className="faq_banner-title">{ faqPageData.banner.title }</div>
                            <div className="faq_banner-title_underline"></div>
                            <div className="faq_banner-subtitle">{ faqPageData.banner.subTitle }</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="shopify-section-faq-content" className="shopify-section">
                <div className="faq_content-container">
                    <div className="faq_content-wrapper">
                        { faqPageData.faqContent.map((item, index) => {
                            return (
                                <>
                                <button className="faq_content-accordion_button" key={`btn_${index}`}>
                                    {item.question}
                                    <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/arrow_down_white_200x.png?v=5587476236961067168" 
                                        alt="" />
                                </button>
                                <div className="faq_content-accordion_content" key={`answer_${index}`} 
                                    dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="shopify-section-faq-customiser-banner" className="shopify-section">
                <div className="faq_banner-container">
                    <div className="faq_banner-wrapper">
                        <img className="faq_desktop-banner" src={ faqPageData.customiserBanner.imageDesktop } alt="" />
                        <img className="faq_mobile-banner" src={ faqPageData.customiserBanner.imageMobile } alt="" />
                        <div className="faq_customiser_banner-overlay"></div>
                        <div className="faq_customiser_banner-text_container">
                            <div className="faq_customiser_banner-title">{ faqPageData.customiserBanner.title }</div>
                            <div className="faq_customiser_banner-subtitle">{ faqPageData.customiserBanner.subtitle }</div>
                            <div className="faq_customiser_banner-text">{ faqPageData.customiserBanner.text }</div>
                            <a href={ faqPageData.customiserBanner.buttonUrl } className="faq_customiser_banner-button">{ faqPageData.customiserBanner.buttonText }</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Faqs