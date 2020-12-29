import React from 'react';
import PropTypes from "prop-types";
import { ReactSVG } from 'react-svg';
import FacebookIcon from '../../images/icon-facebook.svg';
import InstagramIcon from '../../images/icon-instagram.svg';
import TwitterIcon from '../../images/icon-twitter.svg';
import YoutubeIcon from '../../images/icon-youtube.svg';

const SocialIcon = ({ icon }) => {
  return (
    <>
      { icon === 'facebook' ? <ReactSVG src={FacebookIcon} /> : '' }
      { icon === 'instagram' ? <ReactSVG src={InstagramIcon} /> : '' }
      { icon === 'twitter' ? <ReactSVG src={TwitterIcon} /> : '' }
      { icon === 'youtube' ? <ReactSVG src={YoutubeIcon} /> : '' }
    </>
  );
}

SocialIcon.propTypes = {
  icon: PropTypes.string,
}

SocialIcon.defaultProps = {
  icon: `facebook`,
}

export default SocialIcon;
