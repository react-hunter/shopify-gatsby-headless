import "../../resources/css/base.scss";
import "../../resources/css/stampedio.css";
import "../../resources/css/preloader.css";
import "../styles/instagram.css";
import "../styles/header.css";

import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Header from "../components/common/header/header"
import Footer from "../components/common/footer"
import Instagram from "../components/instagram"
import SubscribeSection from "../components/subscribeSection"
import Provider from "../context/provider"
import AjaxCartCustom from "../components/common/ajaxCartCustom"
import Preloader from "../components/common/preloader"

const Layout = ({ path, children }) => {
	const [allHidden, setAllHidden] = useState(true)
	const hideClass = allHidden ? `hide` : ``
	return (
		<Provider>
			<StaticQuery
				query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
				}
			`}
			render={data => (
				<>
					<Preloader allHide={setAllHidden} />
					<div className={`scrollPreventer ${hideClass}`}>
						<AjaxCartCustom />
						<Header path={path} />
						<div className="page-container drawer-page-content" id="PageContainer">
							{children}
							<div className="shopify-section index-section index-section--flush">
								{ path.includes('/products/') || path.includes('/cart') ? 
										null : 
										<Instagram />
								}
								{
									path.includes('/cart') ? 
										null :
										<SubscribeSection />
								}
							</div>
							<Footer />
						</div>
					</div>
				</>
			)}
			/>
		</Provider>
	);
};

export default Layout;

