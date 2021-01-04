import React from 'react';
import { commonData } from '../data/common';

const Instagram = () => {
    const instaHeaderStyle = {
        paddingTop: '30px',
        paddingBottom: '10px',
    }
    const InstaH1Style = {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Big Caslon',
        fontWeight: '600',
        fontSize: '14px',
        letterSpacing: '1px'
    }
    return (
        <div className="instagram-section">
            <div className="insta_header" style={ instaHeaderStyle }>
                <h1 style={ InstaH1Style }>{ commonData.instagramSettings.title }</h1>
                <script defer src="//foursixty.com/media/scripts/fs.embed.v2.5.js" 
                        data-feed-id="dose-of-roses" 
                        data-open-links-in-same-page="false" 
                        data-theme="showcase_v2_5" data-page-size="10">
                </script>
            </div>
        </div>
    );
};
    
export default Instagram;