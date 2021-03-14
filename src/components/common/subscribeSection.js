import React from 'react';
import { Link } from 'gatsby'
import { commonData } from '../../data/common';

const SubscribeSection = () => {
	const newsletterBackgroundStyle = {
		backgroundImage: `url(` + commonData.newsletterSettings.desktopBackground + `)`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	}
	const containerStyle = {
		textAlign: 'center',
		maxWidth: '800px',
		padding: '0 30px',
	}
	const LinkStyle = {
		color: `white`,
		textDecoration: `underline`,
		letterSpacing: `4px`
	}

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('submit arrive');
	}

	return (
		<div className="newsletter_section
			newsletter-bg
			newsletter-both-names--false 
			newsletter-bgr-true
			text-align--
			lazyloaded" 
			style={newsletterBackgroundStyle}>

			<h2 className="newsletter-header">{ commonData.newsletterSettings.title }</h2>
			
			<div className="container" style={containerStyle}>
				<div className="ten section_form">
					<div className="newsletter-text">
						<p>{ commonData.newsletterSettings.subTitle }</p>
					</div>

					<div className="newsletter">
						<span className="message"></span>
						<form id="smsForm" className="sms-form" onSubmit={onSubmit}>
							<input type="tel" id="smsFooterNumber" pattern="^[0-9-+.\s()]*$" 
								minLength="10" maxLength="10" placeholder="Mobile Phone Number" required />
							<button type="submit">SUBSCRIBE</button>
						</form>
						<div id="thanksMessage" className="thank-you-message">
							<p className="thank-you-text"><strong>Thanks for subscribing!</strong></p>
						</div>
						<div className="newsletter-agreement">
							<p>By submitting this form, you agree to receive recurring automated promotional and personalized marketing text messages (e.g. cart reminders) from Dose of Roses at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. View 
								<a style={LinkStyle} href="http://attn.tv/doseofroses/terms.html">Terms</a> & <a style={LinkStyle} href="https://attnl.tv/p/EHa">Privacy</a>.
							</p>
						</div>
					</div>
				</div>
			</div>


			<div className="newsletter-nav">
				<ul className="footer-links">
					{ commonData.footerMenu.map((menuItem, menuIndex) => 
						<li className="newsletter_nav_link" key={menuIndex}>
							<Link to={menuItem.handle}>{ menuItem.title }</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
	
export default SubscribeSection;