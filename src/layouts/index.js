import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import Footer from "../components/footer"
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
				<>
					<Header siteTitle={data.site.siteMetadata.title} />
					<div className="page-container drawer-page-content" id="PageContainer">
						{children}
						<Footer />
					</div>
				</>
			)}
			/>
		</Provider>
	);
};

export default Layout;

