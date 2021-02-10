import "../../resources/css/base.scss";
import "../../resources/css/preloader.css";
import "../styles/instagram.css";
import "../styles/header.scss";

import React from 'react';
import Provider from "../context/provider"
import { StaticQuery, graphql } from 'gatsby'
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'
import Header from "../components/common/header/header";
import Footer from "../components/common/footer";
import Instagram from "../components/common/instagram";
import AjaxCartCustom from "../components/common/ajaxCartCustom";
// import Preloader from "../components/common/preloader"

const queryClient = new QueryClient()

const Layout = ({ path, children }) => {
	// const [allHidden, setAllHidden] = useState(true)
	// const hideClass = allHidden ? `hide` : ``
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
												fluid {
													srcWebp
												}
											}
											mobileHeaderMenuItemChild {
												title
												url
												parentText
												image {
													fluid {
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
											fluid {
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