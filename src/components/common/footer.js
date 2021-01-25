import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import SocialIcon from './socialIcon';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { client } from '../../contentful'

const Footer = () => {
    const [footerMenu, setFooterMenu] = useState([]);
    useEffect(() => {
        async function getFooterMenu() {
            const footerMenuData = await client.getEntries({'content_type': 'footerMenu'});
            setFooterMenu(footerMenuData.items[0].fields.footerMenuItem);
        }

        getFooterMenu();
    }, []);
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
                    <div className="footer-social_cell">
                        <a href="https://www.tiktok.com/@doseofroses" target="_blank" rel="noreferrer">
                            <LazyLoadImage effect="blur" loading="eager"  src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/tiktok_200x.png?v=8989676507694972742" alt="" />
                        </a>
                    </div>
                    <div className="footer-social_cell">
                        <a href="https://www.pinterest.com/DoseofRoses" target="_blank" rel="noreferrer">
                            <LazyLoadImage  effect="blur" loading="eager"  src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/pinterest_200x.png?v=17995078981329144006" alt="" />
                        </a>
                    </div> 
                </div>
                <div className="newsletter-nav">
                    <ul className="footer-links">
                        { footerMenu.map((menuItem, menuIndex) => 
                            <li className="newsletter_nav_link" key={menuIndex}>
                                <Link to={menuItem.fields.handle}>{ menuItem.fields.title }</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="newsletter-nav-mobile" key="newsletter-nav-mobile">
                    <ul className="footer-links">
                        { footerMenu.map((mobileMenuItem, menuIndex) => 
                            <li className="newsletter_nav_link" key={menuIndex}>
                                <Link to={mobileMenuItem.fields.handle} >{ mobileMenuItem.fields.title }</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {/* <div className="footer-content_wrapper" key="footer-content_wrapper">
                </div> */}
            </footer>
        </div>
    );
};

export default Footer;