import "../../resources/css/base.scss";
import "../../resources/css/stampedio.css";
import "../../resources/css/preloader.css";
import "../styles/instagram.css";
import "../styles/header.css";

import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby'
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'
import Header from "../components/common/header/header"
import Footer from "../components/common/footer"
import Instagram from "../components/common/instagram"
//import SubscribeSection from "../components/common/subscribeSection"
import Provider from "../context/provider"
import AjaxCartCustom from "../components/common/ajaxCartCustom"
import Preloader from "../components/common/preloader"

const queryClient = new QueryClient()

const Layout = ({ path, children }) => {
	const [allHidden, setAllHidden] = useState(true)
	const hideClass = allHidden ? `hide` : ``
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
						}
					`}
					render={data => (
						<>
							<Preloader allHide={setAllHidden} />
							<div className={`scrollPreventer ${hideClass}`}>
								<AjaxCartCustom giftVariant={data.giftProduct.variants[0]} rushVariant={data.rushProduct.variants[0]} />
								<Header path={path} />
								<div className="page-container drawer-page-content" id="PageContainer">
									{children}
									<div className="shopify-section index-section index-section--flush">
										{ path.includes('/products/') || path.includes('/cart') ? 
												null : 
												<Instagram />
										}
										{/* {
											path.includes('/cart') ? 
												null :
												<SubscribeSection />
										} */}
									</div>
									<Footer />
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