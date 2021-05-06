/* eslint-disable */
import React from 'react';
import '../../styles/order-protection-info.scss';

const OrderProtectionInfo = React.memo(function OrderProtectionInfo(props) {
  const closeModal = () => {
    props.closeModal();
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="order-protection-info-overlay" id="variantOverlay-">
      <div className="order-protection-info__wrapper animate-bottom" data-toggle="modal">
        <div className="close-icon" onClick={closeModal} />
        <img src="https://i.imgur.com/U96FKh8.png" />
        <div className="order-protection-info__huge-title">WHY USE SHIPPING PROTECTION?</div>
        <div className="order-protection-info__title">Hassle-Free Resolution</div>
        <div className="order-protection-info__description">Within a few clicks your approved claim will get a refund or reshipment for the following issue:</div>
        <div className="order-protection-info__description2">Stolen - Delivered Not Received - Damaged - Lost in Transit - Wrong Item</div>
        <div className="order-protection-info__credit">
          OrderProtection.com, Inc. <span> <a href="https://claims.orderprotection.com/" target="_blank">File a Claim</a></span>
        </div>
      </div>
      <div className="order-protection-info__overlay" onClick={closeModal} onKeyDown={handleKeyDown} role="button" tabIndex="0"></div>
    </div>
  );
});

OrderProtectionInfo.displayName = 'OrderProtectionInfo';

export default OrderProtectionInfo;
