import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const CreateExpert = React.memo(function CreateExpert() {
	return (
	  <>
		<div id="shopify-section-create-expert" className="shopify-section">
			<div className="fifty-fifty_container">
				<div className="fifty-fifty_wrapper">
					<div className="fifty-image">
						<LazyLoadImage effect="blur" loading="eager" 
							src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/IMG_1795_1100x.jpeg?v=1602814566" alt=""/>
					</div>

					<div className="fifty-textblock">
						<div className="textblock-content">
							<h4 className="bring-your-visions-to-life_title">
								<span>BRING YOUR </span>
								<span >VISIONS TO LIFE</span>
							</h4>
							<h4 className="bring-your-visions-to-life_title mobile-vision">BRING YOUR VISIONS TO LIFE</h4>
							<span className="textblock-underline"></span>
							<p className="textblock-paragraph">Dose of Roses® offers 24 different rose colors and over 35 custom designs. Our floral designers can help you every step of the way to make sure you end up with with the perfect dose.</p>
							<div className="personalize">
								<span>PERSONALIZATION OPTIONS</span>
							</div>
							<div className="types">
								<span>Letters • Numbers • Hearts • Stripes • Checkered</span>
							</div>
							<Link to="/pages/contactus" >Contact us</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	  </>
	)
});

CreateExpert.displayName = 'CreateExpert';

export default CreateExpert