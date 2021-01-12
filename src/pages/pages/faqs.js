import React, { useEffect } from 'react';
import Preloader from "../../components/common/preloader"
import { faqPageData } from '../../data/faq' 

const Faqs = ({ data }) => {      
    useEffect(() => {
        /*
        document.querySelectorAll('.faq_content-accordion_button').toArray.forEach(button => {
            const accordionButton = button;
            button.addEventListener('click', () => {
                button.classList.toggle('faq_content-accordion_button--active');
            });
        });
        */
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
                        <button className="faq_content-accordion_button">
                            Where did Dose of Roses come from?
                            <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/arrow_down_white_200x.png?v=5587476236961067168" alt="" />
                        </button>
                        <div className="faq_content-accordion_content">
                            <p>The brand was founded by Joseph Ayoub, founder of some of the most well-known digital brands, and Julian Wilson, a former executive of the #1 most-searched fashion brand. Founded on January 6, 2019, Joseph and Julian were looking to start a new brand together and Valentine’s Day was right around the corner. Roses came to mind as they are the symbol of love and what most people give to their loved ones. Being different from the rest, they began selling this unique gift called the Rose Bear, a bear covered in synthetic roses that last a lifetime. After selling out completely in a matter of weeks, they started roaming through the stores of Los Angeles to find Rose Bears but weren’t able to find it as it was a relatively new product that wasn’t available in stores. Having no luck, they started looking for other gifts and that’s where they came across preserved rose arrangements. They had bought the entire inventory of multiple stores and had sold out of those in a matter of days. This is where the idea of gifting a unique luxury experience that isn’t the traditional bouquet of roses that only last a few days was born.</p>
                            <br />
                            <p>Today, you can create hundreds of different arrangements featuring unique shapes, colors, and sizes. Each arrangement contains anywhere from one to more than 150 Timeless Roses, and with proper care, your arrangement can last up to five years</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Faqs