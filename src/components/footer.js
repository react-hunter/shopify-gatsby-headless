import React from 'react';
import SocialIcon from './common/socialIcon';
import { homepageData } from '../data/homepage';

const Footer = () => {
    return (
        <div className="shopify-section">
            <footer className="footer-section">
                <div className="footer-socials_container">
                    <div className="footer-social_cell">
                        <a href="https://www.facebook.com/DoseofRoses" target="_blank" rel="noreferrer">
                            <SocialIcon icon="facebook" />
                        </a>
                    </div>
                    <div className="footer-social_cell">
                        <a href="https://www.instagram.com/doseofroses/" target="_blank" rel="noreferrer">
                            <SocialIcon icon="instagram" />
                        </a>
                    </div>
                    <div className="footer-social_cell">
                        <a href="https://twitter.com/DoseofRoses" target="_blank" rel="noreferrer">
                            <SocialIcon icon="twitter" />
                        </a>
                    </div>
                    <div className="footer-social_cell">
                        <a href="https://www.youtube.com/channel/UCL_hLIpdsBvTTAAyt9Bt_lA" target="_blank" rel="noreferrer">
                            <SocialIcon icon="youtube" />
                        </a>
                    </div> 
                </div>
                <div className="newsletter-nav-mobile" key="newsletter-nav-mobile">
                    <ul className="footer-links">
                        { homepageData.footerMenu.map((menuItem, menuIndex) => 
                            <li className="newsletter_nav_link" key={menuIndex}>
                                <a href="" >{ menuItem.title }</a>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="footer-content_wrapper" key="footer-content_wrapper">

                </div>
            </footer>
        </div>
    );
};

export default Footer;