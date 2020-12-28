import React from 'react';
import {ReactComponent as FacebookIcon} from '../../images/icon-facebook.svg';
import {ReactComponent as InstagramIcon} from '../../images/icon-instagram.svg';
import {ReactComponent as TwitterIcon} from '../../images/icon-twitter.svg';
import {ReactComponent as YoutubeIcon} from '../../images/icon-youtube.svg';

const SocialIcon = ({icon}) => {
  return (
    <div>
        { icon == 'facebook' ? <FacebookIcon /> : '' }
        { icon == 'instagram' ? <InstagramIcon /> : '' }
        { icon == 'twitter' ? <TwitterIcon /> : '' }
        { icon == 'youtube' ? <YoutubeIcon /> : '' }
    </div>
  );
}
export default SocialIcon;
