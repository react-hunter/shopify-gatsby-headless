import React from 'react';
import { KlaviyoForm } from '@nacelle/react-klaviyo';

const NotifyModal = React.memo(function NotifyModal(props) {
  const classes = props.modalShow ? "klav-popup fade-in" : "klav-popup fade-in hide"
  const closeNotifyModal = (e) => {
    e.preventDefault();
    setTimeout(props.closeModal, 500);
  }  
  return (
    <div className={classes}>
      <a href="/fakeUrl" className="klav-popup-overlay close-klav-popup" onClick={closeNotifyModal}>close</a>
      <div className="klav-popup-content">
        <a href="fakeUrl" className="close-klav-popup popup-close-icon" onClick={closeNotifyModal}>
          <i className="fa fa-times"></i>
        </a>
        <div className="klav-form">
          <h2>GET NOTIFIED WHEN IT'S BACK IN STOCK!</h2>
          <KlaviyoForm />
        </div>
      </div>
    </div>
  );
});

NotifyModal.displayName = 'NotifyModal';

export default NotifyModal;