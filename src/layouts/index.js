import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import Footer from "../components/footer"
import Instagram from "../components/instagram"
import Subscribe from "../components/subscribe"
import Provider from "../context/provider"
import "../../resources/css/layout.scss"
import "../../resources/css/base.scss"


const Layout = ({ children }) => {
    
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
				<div className="scrollPreventer">
					<Header />
					<div className="page-container drawer-page-content" id="PageContainer">
						{children}
						<div className="shopify-section index-section index-section--flush">
							<Instagram />
							{/* <Subscribe /> */}
						</div>
						<Footer />
					</div>
				</div>
			)}
			/>
		</Provider>
	);
};

export default Layout;

