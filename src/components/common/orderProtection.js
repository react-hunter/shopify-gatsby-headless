import React, { useState } from 'react';
import Switch from "react-switch";
import '../../styles/order-protection.scss';

const OrderProtection = (props) => {
  const [checked, setChecked] = useState(true);
  const protectionVariant = props.protectionVariant;
  const context = props.context;
  const lineItems = props.lineItems;
  const filteredItems = lineItems.filter(item => item.variant.id === protectionVariant.shopifyId)
  console.log('filteredItems: ', filteredItems)
  let protectionLineItem = null;
  if(filteredItems.length > 0) {
    protectionLineItem = filteredItems[0];
  }

  
  const removeProtection = (itemId) => {
		context.removeLineItem(context.store.client, context.store.checkout.id, itemId)
	}
  const addProtection = (itemId) => {
    context.addVariantToCart(itemId, 1)
  }
  const handleChange = (checked) => {
    if(checked) {
      addProtection(protectionVariant.shopifyId)
    } else {
      removeProtection(protectionLineItem.id)
    }
    setChecked(checked);
  };
  return (
    <>
      <Switch onChange={(val)=>handleChange(val)} checked={checked} />
    </>
  );
};

OrderProtection.displayName = "OrderProtection";
export default OrderProtection;