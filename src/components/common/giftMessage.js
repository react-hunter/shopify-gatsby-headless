import React, {useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const GiftMessage = React.memo(function GiftMessage(props) {
  const [messageContent, setMessageContent] = useState('');
  const addNoteToCart = () => {
    props.addNoteToCart(messageContent);
  }

  const changeMessage = (e) => {
    setMessageContent(e.target.value)
  }
  return (
    <div className="giftmsg-container">
      <LazyLoadImage effect="blur" loading="eager"  src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/DOR_Logo_Shop_Slim_XL_600x_600x_e8d2362f-25d0-4cc7-af87-ea45200dc5ea_300x.png?v=1565004065" 
        alt=""
        itemProp="logo" />
      <textarea onChange={changeMessage} data-limit-rows="false" rows="5" cols="25" data-cols="25"  data-rows="5" maxLength="120" placeholder="Enter your message..."  id="gift-message-text" ></textarea>
      <button className="addNote" onClick={addNoteToCart}>ADD GIFT MESSAGE</button>
    </div>
  )
});

GiftMessage.displayName = 'GiftMessage';

export default GiftMessage;