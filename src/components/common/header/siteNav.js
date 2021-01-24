import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { client } from '../../../contentful'

const SiteNav = ({ path }) => {
    const [desktopHeaderMenu, setDesktopHeaderMenu] = useState([]);
    useEffect(() => {
        async function getMenuData() {
            const menuData = await client.getEntries({'content_type': 'desktopHeaderMenu'});
            setDesktopHeaderMenu(menuData.items[0].fields.desktopHeaderMenuItem);
        }
        getMenuData()
    })
    return (
        <>
        <nav className="small--hide border-bottom" id="AccessibleNav" role="navigation">
            <ul className="site-nav list--inline site-nav--centered" id="SiteNav">  
                { desktopHeaderMenu.map((menuItem, menuIndex) => 
                <li key={menuIndex}>
                    <Link id={menuItem.fields.id} to={menuItem.fields.link} className="site-nav__link site-nav__link--main">
                        <span className="site-nav__label">
                            {menuItem.fields.title}
                        </span>
                    </Link>
                </li>
                )}
            </ul>
        </nav>
        </>
    )
}

export default SiteNav