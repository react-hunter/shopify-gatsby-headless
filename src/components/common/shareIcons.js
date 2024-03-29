import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons"

const ShareIcons = React.memo(function ShareIcons(props) {

	const printWindow = (e) => {
		e.preventDefault();
		window.print();
	}
	return (
		<div className="share-icons">
			<span>Share:</span>
  
			<a title="Print" className="print" href="/fakeUrl" onClick={printWindow}>
				<FontAwesomeIcon icon={faPrint} className="fas fa-print" size="1x" />
			</a>
  
			<a title="Email" className="share-email" href="mailto:support@sweetdrop.com" aria-describedby="a11y-external-message">
				<FontAwesomeIcon icon={faEnvelope} className="far fa-envelope" size="1x" />
			</a>
  
			<a title="translation missing: en.social.icons.facebook"
				href={`//www.facebook.com/sharer.php?u=${props.articleUrl}`}
				className="facebook" target="_blank"
				aria-describedby="a11y-new-window-external-message"
				rel="noreferrer">
					<FontAwesomeIcon icon={faFacebookF} className="far fa-envelope" size="1x" />
			</a>
  
			<a title="translation missing: en.social.icons.twitter"
				href={`//twitter.com/home?status=${props.articleUrl}`}
				target="_blank"
				className="twitter"
				aria-describedby="a11y-new-window-external-message"
				rel="noreferrer">
					<FontAwesomeIcon icon={faTwitter} className="far fa-envelope" size="1x" />
			</a>
  
			<a title="translation missing: en.social.icons.pinterest"
				target="blank"
				href={`//pinterest.com/pin/create/button/?url=${props.articleUrl}&amp;media=${props.articleMedia}`}
				className="pinterest"
				aria-describedby="a11y-external-message">
					<FontAwesomeIcon icon={faPinterest} className="far fa-envelope" size="1x" />
			</a>
		</div>
	);
});

ShareIcons.propTypes = {
	articleUrl: PropTypes.string,
	articleMedia: PropTypes.string,
}
ShareIcons.defaultProps = {
	articleUrl: ``,
	articleMedia: ``,
}

ShareIcons.displayName = 'ShareIcons';

export default ShareIcons;