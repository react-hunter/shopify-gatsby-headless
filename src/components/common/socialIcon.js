import React from 'react';
import PropTypes from "prop-types";
import { ReactSVG } from 'react-svg';
import FacebookIcon from '../../images/icon-facebook.svg';
import InstagramIcon from '../../images/icon-instagram.svg';
import TwitterIcon from '../../images/icon-twitter.svg';
import YoutubeIcon from '../../images/icon-youtube.svg';

const SocialIcon = React.memo(function SocialIcon({ icon }) {
  switch (icon) {
    case 'facebook':
      return <ReactSVG src={FacebookIcon} />
    case 'instagram':
      return <ReactSVG src={InstagramIcon} />
    case 'twitter':
      return <ReactSVG src={TwitterIcon} />
    case 'youtube':
      return <ReactSVG src={YoutubeIcon} />
    default:
      break;
  }
});

SocialIcon.propTypes = {
  icon: PropTypes.string,
}
SocialIcon.defaultProps = {
  icon: `facebook`,
}
SocialIcon.displayName = 'SocialIcon';

export default SocialIcon;
