import "../../resources/css/base.scss";
import "../../resources/css/preloader.css";
import "../styles/instagram.css";
import "../styles/header.scss";

import React from 'react';
import Helmet from "react-helmet"
import loadable from '@loadable/component';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
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
							protectionProduct: shopifyProduct(handle: {eq: "order-protection"}) {
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
							allContentfulAnnounceTextItem(sort: {fields: position, order: ASC}) {
								edges {
									node {
										announcebarsettings {
											textColor
											backgroundColor
										}
										url
										description
										fontSize
										position
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
							<Helmet>
								<script src={withPrefix('snapchat.js')} type="text/javascript" />
								<script src={withPrefix('voyage.js')} type="text/javascript" />
								<script async src="https://assets.voyagetext.com/voyage.production.js"></script>
							</Helmet>
							<div className="scrollPreventer">
								<AjaxCartCustom
									giftVariant={data.giftProduct.variants[0]}
									rushVariant={data.rushProduct.variants[0]}
									protectionVariant={data.protectionProduct.variants[2]}
								/>
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