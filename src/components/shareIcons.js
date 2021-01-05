import React from 'react';
import PropTypes from "prop-types";

const ShareIcons = (props) => {

    const printWindow = (e) => {
        e.preventDefault();
        window.print();
    }
    return (
        <div className="share-icons">
            <span data-acsb-original-letter-spacing-value="normal"
                style={{ letterSpacing: '2px' }}>Share:</span>
  
            <a title="Print" className="print" href="/fakeUrl" onClick={printWindow}>
                <i className="fas fa-print" aria-hidden="true"></i>
            </a>
  
            <a title="Email" className="share-email" href="mailto:support@sweetdrop.com" aria-describedby="a11y-external-message">
                <i className="far fa-envelope" aria-hidden="true"></i>
            </a>
  
            <a title="translation missing: en.social.icons.facebook"
                href="//www.facebook.com/sharer.php?u={props.articleUrl}"
                className="facebook" target="_blank"
                aria-describedby="a11y-new-window-external-message"
                rel="noreferrer"
                data-acsb-original-letter-spacing-value="normal"
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
  
            <a title="translation missing: en.social.icons.twitter"
                href="//twitter.com/home?status={props.articleUrl}"
                target="_blank"
                className="twitter"
                aria-describedby="a11y-new-window-external-message"
                rel="noreferrer"
                data-acsb-original-letter-spacing-value="normal"
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
  
            <a title="translation missing: en.social.icons.pinterest"
                target="blank"
                href="//pinterest.com/pin/create/button/?url={props.articleUrl}&amp;media={props.articleMedia}"
                className="pinterest"
                aria-describedby="a11y-external-message"
                data-acsb-original-letter-spacing-value="normal"
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
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