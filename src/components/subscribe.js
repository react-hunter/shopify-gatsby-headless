import React from 'react';
import { commonData } from '../data/common';

const Subscribe = () => {
    const newsletterBackgroundStyle = {
        backgroundImage: `url(` + commonData.newsletterSettings.desktopBackground + `)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <div className="newsletter_section
            newsletter-bg
            newsletter-both-names--false 
            newsletter-bgr-true
            text-align--
            lazyloaded" 
            style={newsletterBackgroundStyle}>
            <h2 className="newsletter-header" 
                data-acsb-original-letter-spacing-value="6px"
                style={{ letterspacing: `8px!important` }}>{ commonData.newsletterSettings.title}</h2>
            <div className="newsletter-nav">
                <ul className="footer-links">
                    { commonData.footerMenu.map((menuItem, menuIndex) => 
                        <li className="newsletter_nav_link" key={menuIndex}>
                            <a href={menuItem.handle} 
                                data-acsb-original-letter-spacing-value="normal"
                                style={{ letterspacing: `2px!important` }}>{ menuItem.title }</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
    
export default Subscribe;