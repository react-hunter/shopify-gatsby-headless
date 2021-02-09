import React, { useState, useEffect } from 'react';
import { client } from '../../contentful'

const Instagram = () => {
    const [photoCount, setShotoCount] = useState(0);

    const [instagramTitle, setInstagramTitle] = useState('');
    useEffect(() => {
        async function getInstagramData() {
            const instagramData = await client.getEntries({'content_type': 'instagramSettings'});
            setInstagramTitle(instagramData.items[0].fields.title);
        }

        getInstagramData();
        mobileRearrange();
        window.onresize = function () { mobileRearrange() };
    })
    useEffect(() => {
        if (photoCount > 0) {
            const previousInstagram = document.querySelectorAll(".fs-wrapper");
            for (var i=0;i<previousInstagram.length;i++) {
                previousInstagram[i].remove();
            }
            setTimeout(addScript('//foursixty.com/media/scripts/fs.embed.v2.5.js'), 2000);
        }
    }, [photoCount])

    const addScript = url => {
        const script = document.createElement("script")
        script.src = url
        script.setAttribute('data-feed-id', 'dose-of-roses')
        script.setAttribute('data-theme', 'showcase_v2_5')
        script.setAttribute('data-open-links-in-same-page', true)
        script.setAttribute('data-page-size', photoCount)
        document.getElementById('insta_header').appendChild(script)
    }

    function mobileRearrange() {
        if (window.innerWidth <= 768) {
            setShotoCount(9);
        } else {
            setShotoCount(10);
        }
      }

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
            <div className="insta_header" id="insta_header" style={ instaHeaderStyle }>
                <p style={ InstaH1Style }>{ instagramTitle }</p>
            </div>
        </div>
    );
};
    
export default Instagram;