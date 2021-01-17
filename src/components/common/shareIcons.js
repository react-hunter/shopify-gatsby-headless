import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import SocialIcon from './socialIcon';

const ShareIcons = (props) => {

    const printWindow = (e) => {
        e.preventDefault();
        window.print();
    }
    return (
        <div className="share-icons">
            <span>Share:</span>
  
            <a title="Print" className="print" href="/fakeUrl" onClick={printWindow}>
                <i className="fas fa-print" aria-hidden="true"></i>
                <FontAwesomeIcon icon={faPrint} className="fas fa-print" size="1x" />
            </a>
  
            <a title="Email" className="share-email" href="mailto:support@sweetdrop.com" aria-describedby="a11y-external-message">
                <i className="far fa-envelope" aria-hidden="true"></i>
                <FontAwesomeIcon icon={faEnvelope} className="far fa-envelope" size="1x" />
            </a>
  
            <a title="translation missing: en.social.icons.facebook"
                href={`//www.facebook.com/sharer.php?u=${props.articleUrl}`}
                className="facebook" target="_blank"
                aria-describedby="a11y-new-window-external-message"
                rel="noreferrer">
                    <SocialIcon icon="facebook" className="fa fa-facebook" />
            </a>
  
            <a title="translation missing: en.social.icons.twitter"
                href={`//twitter.com/home?status=${props.articleUrl}`}
                target="_blank"
                className="twitter"
                aria-describedby="a11y-new-window-external-message"
                rel="noreferrer">
                    <SocialIcon icon="twitter" className="fa fa-twitter"  />
            </a>
  
            <a title="translation missing: en.social.icons.pinterest"
                target="blank"
                href={`//pinterest.com/pin/create/button/?url=${props.articleUrl}&amp;media=${props.articleMedia}`}
                className="pinterest"
                aria-describedby="a11y-external-message">
                    <img className="fa fa-pinterest" src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/pinterest_50x.png?v=17995078981329144006" alt="" />
            </a>
        </div>
    );
};

ShareIcons.propTypes = {
    articleUrl: PropTypes.string,
    articleMedia: PropTypes.string,
}

ShareIcons.defaultProps = {
    articleUrl: ``,
    articleMedia: ``,
}
    
export default ShareIcons;