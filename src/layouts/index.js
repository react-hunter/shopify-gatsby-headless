import "../../resources/css/base.scss";
import "../../resources/css/preloader.css";
import "../styles/instagram.css";
import "../styles/header.scss";

import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import { StaticQuery, graphql } from 'gatsby';
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query';
import Provider from "../context/provider"
import Footer from '../components/common/footer'
import Instagram from '../components/common/instagram'
import Header from '../components/common/header/header';
const AjaxCartCustom = loadable(() => import('../components/common/ajaxCartCustom'));

const queryClient = new QueryClient();

const Layout = ({ path, children }) => {
	useEffect(() => {
		console.log('initialized');
		// const ReactPixel =  require('react-snapchat-pixel');
		// ReactPixel.init('71a99375-a469-4098-9c78-604a676001cc');
		// ReactPixel.pageView();
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Provider>
				<StaticQuery
					query={graphql`
						query {
							giftProduct: shopifyProduct(handle: {eq: "gift-note"}) {
								id
								shopifyId
								variants {
									id
									shopifyId
									price
								}
							}
							rushProduct: shopifyProduct(handle: {eq: "rush-processing"}) {
								id
								shopifyId
								variants {
									id
									shopifyId
									price
								}
							}
							siteLogo: file(relativePath: { eq: "icon-logo.png" }) {
								childImageSharp {
									gatsbyImageData (
										width: 600
										placeholder: TRACED_SVG
										formats: [AUTO, WEBP]
									)
								}
							}
							allContentfulInstagramSettings {
								nodes {
									title
								}
							}
							allContentfulFooterMenuItem {
								edges {
									node {
										handle
										title
									}
								}
							}
							allContentfulMobileHeaderMenu {
								edges {
									node {
										mobileHeaderMenuItem {
											hasChildren
											title
											url
											image {
												fluid (maxWidth: 450) {
													srcWebp
												}
											}
											mobileHeaderMenuItemChild {
												title
												url
												parentText
												image {
													fluid (maxWidth: 450) {
														srcWebp
													}
												}
											}
										}
									}
								}
							}
							allContentfulAnnounceTextItem {
								edges {
									node {
										fontSize
										description
									}
								}
							}
							allContentfulCardSliderItem {
								edges {
									node {
										href
										imageUrl {
											fluid (maxWidth: 700) {
												srcWebp
											}
										}
									}
								}
							}
							allContentfulDesktopHeaderMenuItem {
								edges {
									node {
										id
										link
										title
									}
								}
							}
						}
					`}
					render={data => (
						<>
							{/* <Preloader allHide={setAllHidden} /> */}
							{/* <div className={`scrollPreventer ${hideClass}`}> */}
							<div className="scrollPreventer">
								<AjaxCartCustom giftVariant={data.giftProduct.variants[0]} rushVariant={data.rushProduct.variants[0]} />
								<Header
									path={path}
									mobileHeaderMenu={data.allContentfulMobileHeaderMenu.edges[0].node.mobileHeaderMenuItem}
									announceList={data.allContentfulAnnounceTextItem.edges}
									cardList={data.allContentfulCardSliderItem.edges}
									desktopHeader={data.allContentfulDesktopHeaderMenuItem.edges}
									siteLogo={data.siteLogo.childImageSharp.gatsbyImageData}
								/>
								<div className="page-container drawer-page-content" id="PageContainer">
									{children}
									<div className="shopify-section index-section index-section--flush">
										{ path.includes('/products/') || path.includes('/cart') ? 
												null : 
												<Instagram title={data.allContentfulInstagramSettings.nodes[0].title} />
										}
									</div>
									<Footer menuList={data.allContentfulFooterMenuItem.edges} />
								</div>
							</div>
						</>
					)}
				/>
			</Provider>
		</QueryClientProvider>
	);
};

export default Layout;