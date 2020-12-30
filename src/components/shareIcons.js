import React from 'react';

const ShareIcons = () => {

    return (
        <div className="share-icons">
            <label data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>Share:</label>
  
            <a title="Print" className="print" href="#" onClick="window.print()">
                <i className="fas fa-print" aria-hidden="true"></i>
            </a>
  
            <a title="Email" className="share-email" href="mailto:support@sweetdrop.com" aria-describedby="a11y-external-message">
                <i className="far fa-envelope" aria-hidden="true"></i>
            </a>
  
            <a title="translation missing: en.social.icons.facebook" 
                href="//www.facebook.com/sharer.php?u=https://www.dose-roses.com/blogs/dose/thoughtful-gifts-for-someone-who-is-in-the-hospital" 
                className="facebook" target="_blank" 
                aria-describedby="a11y-new-window-external-message" 
                rel="noopener" 
                data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-facebook" aria-hidden="true"></i> 
            </a>
  
            <a title="translation missing: en.social.icons.twitter" 
                href="//twitter.com/home?status=https://www.dose-roses.com/blogs/dose/thoughtful-gifts-for-someone-who-is-in-the-hospital via @" 
                target="_blank" 
                className="twitter" 
                aria-describedby="a11y-new-window-external-message" 
                rel="noopener" 
                data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
  
            <a title="translation missing: en.social.icons.pinterest" 
                target="blank" 
                href="//pinterest.com/pin/create/button/?url=https://www.dose-roses.com/blogs/dose/thoughtful-gifts-for-someone-who-is-in-the-hospital&amp;media=http://cdn.shopify.com/s/files/1/0157/4420/4900/articles/thoughtful-gifts-for-hospital-patient_grande.png?v=1608824148" 
                className="pinterest" 
                aria-describedby="a11y-external-message" 
                data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>
                    <i className="fa fa-pinterest" aria-hidden="true"></i> 
            </a>
        </div>
    );
};
    
export default ShareIcons;