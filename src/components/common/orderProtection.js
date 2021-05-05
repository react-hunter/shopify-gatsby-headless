/* eslint-disable */
import React, { useState, useContext } from 'react';
import StoreContext from '../../context/store'
// import Switch from 'react-switch';
import '../../styles/order-protection.scss';
import loadable from '@loadable/component';
const OrderProtectionInfo = loadable(() => import('./orderProtectionInfo'));

const OrderProtection = (props) => {
  const [openOrderProtectionInfo, setOpenOrderProtectionInfo] = useState(false);
  const context = useContext(StoreContext);
  const protectionVariant = props.protectionVariant;
  const lineItems = context.store.checkout.lineItems;
  const filteredItems = lineItems.length > 0 ? lineItems.filter(li => li.variant.id === protectionVariant.shopifyId) : [];
  let protectionLineItem = null;
  let hasProtection = false;
  if (filteredItems.length > 0) {
    protectionLineItem = filteredItems[0];
    hasProtection = true;
  }
  const [checked, setChecked] = useState(true);

  const removeProtection = (itemId) => {
    context.removeLineItem(context.store.client, context.store.checkout.id, itemId);
  };
  const addProtection = (itemId) => {
    context.addProtection(itemId);
  };
  const handleChange = (checkedUpdate) => {
    if (checkedUpdate) {
      addProtection(protectionVariant.shopifyId);
    } else {
      if(hasProtection) {
        removeProtection(protectionLineItem.id);
      }
    }
    setChecked(checkedUpdate);
  };
  return (
    <div className="order-protection">
      <div className="order-protection-mark">
        <div className="order-protection-mark__logo">
          <img src="https://cdn.shopify.com/s/files/1/0157/4420/4900/products/2IBrfX8_350x350.png?v=1619630339" alt="" />
        </div>
        <span>
          ORDER<strong>PROTECTION.COM</strong>
        </span>
        <div className="order-protection-mark__info" onClick={() => setOpenOrderProtectionInfo(true)}>
          <div className="info">i</div>
        </div>
      </div>
      <div className="order-protection-price">$2.15</div>
      <div className="switcher">
        <label className="switch">
          <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} checked={checked} />
          <span className="slider rounded"></span>
        </label>
      </div>
      {openOrderProtectionInfo && <OrderProtectionInfo closeModal={setOpenOrderProtectionInfo}/>}
      {/* <Switch onChange={(val) => handleChange(val)} checked={checked} /> */}
    </div>
  );
};

OrderProtection.displayName = 'OrderProtection';
export default OrderProtection;
