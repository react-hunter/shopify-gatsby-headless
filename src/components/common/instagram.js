import React, { useState, useEffect } from 'react';
import { client } from '../../contentful'

const Instagram = () => {
    const [instagramTitle, setInstagramTitle] = useState('');
    useEffect(() => {
        async function getInstagramData() {
            const instagramData = await client.getEntries({'content_type': 'instagramSettings'});
            setInstagramTitle(instagramData.items[0].fields.title);
        }

        getInstagramData()
    })
    const instaHeaderStyle = {
        paddingTop: '30px',
        paddingBottom: '0px',
    }
    const InstaH1Style = {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Big Caslon',
        fontWeight: '600',
        fontSize: '14px',
        letterSpacing: '1px',
        marginBottom: '0',
        paddingBottom: '17.5px'
    }
    return (
        <div className="instagram-section">
            <div className="insta_header" style={ instaHeaderStyle }>
                <h1 style={ InstaH1Style }>{ instagramTitle }</h1>
                <script src="//foursixty.com/media/scripts/fs.embed.v2.5.js" data-feed-id="dose-of-roses" data-theme="showcase_v2_5" data-open-links-in-same-page="true" data-page-size="10"></script>
            </div>
        </div>
    );
};
    
export default Instagram;