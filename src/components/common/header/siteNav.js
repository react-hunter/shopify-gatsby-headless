import React from 'react';
import { Link } from 'gatsby';

const SiteNav = ({ desktopHeader }) => {
	return (
		<>
			<nav className="small--hide border-bottom" id="AccessibleNav" role="navigation">
				<ul className="site-nav list--inline site-nav--centered" id="SiteNav">  
					{ desktopHeader.map((menuItem, menuIndex) => 
					<li key={menuIndex}>
						<Link id={menuItem.node.id} to={menuItem.node.link} className="site-nav__link site-nav__link--main">
							<span className="site-nav__label">
								{menuItem.node.title}
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