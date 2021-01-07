import React from 'react';
import { Link } from 'gatsby';
import { commonData } from '../../../data/common';

const siteNav = ({ path }) => {
    return (
        <>
        <nav className="small--hide border-bottom" id="AccessibleNav" role="navigation">
            <ul className="site-nav list--inline site-nav--centered" id="SiteNav">  
                { commonData.desktopHeaderMenu.map((menuItem, menuIndex) => 
                <li key={menuIndex}>
                    <Link id={menuItem.id} to={menuItem.link} className="site-nav__link site-nav__link--main">
                    <span className="site-nav__label" 
                        data-acsb-original-letter-spacing-value="1px">{menuItem.title}</span>
                    </Link>
                </li>
                )}
            </ul>
        </nav>
        </>
    )
}

export default siteNav