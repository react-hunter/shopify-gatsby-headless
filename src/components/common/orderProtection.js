import React, { useState } from 'react';
import Switch from "react-switch";
import '../../styles/order-protection.scss';

const OrderProtection = (props) => {
  const [checked, setChecked] = useState(true);
  const protectionVariant = props.protectionVariant;
  const context = props.context;
  const lineItems = props.lineItems;
  const filteredItems = lineItems.filter(item => item.variant.id === protectionVariant.shopifyId)
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
    <div className="order-protection">
      <div className="order-protection-mark">
        <img src="https://cdn.shopify.com/s/files/1/0157/4420/4900/products/2IBrfX8_350x350.png?v=1619630339" alt="" />
        ORDERPROTECTION.COM
        Shipping Protection
        from Damage, Loss, & Theft for $2.15
        By deselecting shipping protection, Dose of Roses is not liable for lost, damaged, or stolen items.
      </div>
      <Switch onChange={(val)=>handleChange(val)} checked={checked} />
    </div>
  );
};

OrderProtection.displayName = "OrderProtection";
export default OrderProtection;