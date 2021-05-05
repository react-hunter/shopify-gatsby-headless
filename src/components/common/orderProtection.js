/* eslint-disable */
import React, { useState } from 'react';
// import Switch from 'react-switch';
import '../../styles/order-protection.scss';
import loadable from '@loadable/component';
const OrderProtectionInfo = loadable(() => import('./orderProtectionInfo'));

const OrderProtection = (props) => {
  const [checked, setChecked] = useState(true);
  const [openOrderProtectionInfo, setOpenOrderProtectionInfo] = useState(false);
  const protectionVariant = props.protectionVariant;
  const context = props.context;
  const lineItems = props.lineItems;
  const filteredItems = lineItems.filter((item) => item.title === 'Order Protection');
  let protectionLineItem = null;
  if (filteredItems.length > 0) {
    protectionLineItem = filteredItems[0];
  }

  const removeProtection = (itemId) => {
    context.removeLineItem(context.store.client, context.store.checkout.id, itemId);
  };
  const addProtection = (itemId) => {
    context.addVariantToCart(itemId, 1);
  };
  const handleChange = (checked) => {
    if (checked) {
      addProtection(protectionVariant.shopifyId);
    } else {
      removeProtection(protectionLineItem.id);
    }
    setChecked(checked);
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
