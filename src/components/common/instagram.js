import React, { useState, useEffect } from 'react';

const Instagram = React.memo(function Instagram(props) {
	const [photoCount, setPhotoCount] = useState(0);
	useEffect(() => {
		mobileRearrange();
		window.addEventListener('resize', mobileRearrange, true);
		return function cleanup() {
			window.removeEventListener('resize', mobileRearrange, true);
		}
	}, []);
	useEffect(() => {
		async function addScript(url) {
			const script = document.createElement("script")
			script.src = url
			script.setAttribute('data-feed-id', 'dose-of-roses')
			script.setAttribute('data-theme', 'showcase_v2_5')
			script.setAttribute('data-open-links-in-same-page', true)
			script.setAttribute('data-page-size', photoCount)
			document.getElementById('insta_header').appendChild(script)
		}
		if (photoCount > 0) {
			const previousInstagram = document.querySelectorAll(".fs-wrapper");
			for (var i=0;i<previousInstagram.length;i++) {
				previousInstagram[i].remove();
			}
			addScript('//foursixty.com/media/scripts/fs.embed.v2.5.js')
		}
	}, [photoCount]);
	function mobileRearrange() {
		if (window.innerWidth <= 768) {
			setPhotoCount(9);
		} else {
			setPhotoCount(10);
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
				<p style={ InstaH1Style }>{ props.title }</p>
			</div>
		</div>
	);
});

Instagram.displayName = 'Instagram';

export default Instagram;