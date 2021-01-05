import React from 'react';
import { commonData } from '../data/common';
import './instagram.css'

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
                <script src="//foursixty.com/media/scripts/fs.embed.v2.5.js" data-feed-id="dose-of-roses" data-theme="showcase_v2_5" data-open-links-in-same-page="true" data-page-size="10"></script>
            </div>
        </div>
    );
};
    
export default Instagram;