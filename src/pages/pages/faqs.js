/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Preloader from "../../components/common/preloader"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {client} from '../../contentful'
import SEO from "../../components/common/seo"

const Faqs = () => {      
    const [faq, setFaq] = useState({
        faqBanner: {
            title: '',
            subTitle: '',
            imageDesktop: null,
            imageMobile: null
        },
        faqContent: [],
        faqCustomiserBanner: {
            imageDesktop: null,
            imageMobile: null,
            title: '',
            subTitle: '',
            text: '',
            buttonText: '',
            buttonUrl: ''
        }
    });
    useEffect(() => {
        async function getFaqData() {
            const faqEntries = await client.getEntries({'content_type': 'faq'});
            const faqBanner = faqEntries.items[0].fields.faqBanner.fields;
            const faqCustomiserBanner = faqEntries.items[0].fields.faqCustomiserBanner.fields;
            const contents = await client.getEntries({'content_type': 'faqContentItem'});
            setFaq({
                faqBanner: faqBanner,
                faqContent: contents.items,
                faqCustomiserBanner: faqCustomiserBanner
            });
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
        }
        getFaqData();
        
    }, [])
      
    return (
      <>
        <SEO
            title="FAQs - Dose of Roses"
            mainTitle="FAQs"
            description="Shop the largest selection of luxury gifts from our best-selling Rose Bear, Galaxy Rose or choose to customize and personalize your Rose Box. Send beautiful real roses that last up to 5 years."
            type="website"
        />
        <Preloader />
        <div className="faq_page">
            <div id="shopify-section-faq-banner-top" className="shopify-section">
                <div className="faq_banner-container">
                    <div className="faq_banner-wrapper">
                        <LazyLoadImage effect="blur" loading="eager"  className="faq_desktop-banner" src={ faq.faqBanner.imageDesktop ? faq.faqBanner.imageDesktop.fields.file.url : '' } alt="" />
                        <LazyLoadImage effect="blur" loading="eager"  className="faq_mobile-banner" src={ faq.faqBanner.imageMobile ? faq.faqBanner.imageMobile.fields.file.url : '' } alt="" />
                        <div className="faq_banner-text_container">
                            <div className="faq_banner-title">{ faq.faqBanner.title }</div>
                            <div className="faq_banner-title_underline"></div>
                            <div className="faq_banner-subtitle">{ faq.faqBanner.subTitle }</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="shopify-section-faq-content" className="shopify-section">
                <div className="faq_content-container">
                    <div className="faq_content-wrapper">
                        { faq.faqContent.map((item, index) => {
                            return (
                                <div key={index}>
                                    <button className="faq_content-accordion_button" key={`btn_${index}`}>
                                        {item.fields.question}
                                        <LazyLoadImage 
                                            effect="blur" loading="eager" 
                                            src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/arrow_down_white_200x.png?v=5587476236961067168" 
                                            alt="" />
                                    </button>
                                    <div className="faq_content-accordion_content" key={`answer_${index}`} 
                                        dangerouslySetInnerHTML={{ __html: item.fields.answer.content[0].content[0].value }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="shopify-section-faq-customiser-banner" className="shopify-section">
                <div className="faq_banner-container">
                    <div className="faq_banner-wrapper">
                        <LazyLoadImage effect="blur" loading="eager"  className="faq_desktop-banner" src={ faq.faqCustomiserBanner.imageDesktop ? faq.faqCustomiserBanner.imageDesktop.fields.file.url : '' } alt="" />
                        <LazyLoadImage effect="blur" loading="eager"  className="faq_mobile-banner" src={ faq.faqCustomiserBanner.imageMobile ? faq.faqCustomiserBanner.imageMobile.fields.file.url : '' } alt="" />
                        <div className="faq_customiser_banner-overlay"></div>
                        <div className="faq_customiser_banner-text_container">
                            <div className="faq_customiser_banner-title">{ faq.faqCustomiserBanner.title }</div>
                            <div className="faq_customiser_banner-subtitle">{ faq.faqCustomiserBanner.subtitle }</div>
                            <div className="faq_customiser_banner-text">{ faq.faqCustomiserBanner.text }</div>
                            <a href={ faq.faqCustomiserBanner.buttonUrl } className="faq_customiser_banner-button">{ faq.faqCustomiserBanner.buttonText }</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Faqs