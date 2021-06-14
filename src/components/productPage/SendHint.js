
import React, {useState } from 'react';
import "./sendHint.scss";
import emailjs from 'emailjs-com';
import _isEmpty from 'lodash/isEmpty'



const SendHint = (props) => {

    const [yourName, setYourName] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

const sendEmail=(e)=>{
    e.preventDefault();
    const data = {
        sender: yourName,
        to_email: recipientEmail,
        subject: yourName + ' sent you a hint!',
        message:'Test',
        item_name: props.product.title,
        image: props.product.images[0].originalSrc,
        link: window.location.href
      };
  
      emailjs.send('service_dor', 'template_q0bl2kt', data, 'user_rnPuY9pc9RRepWVzR4LNZ').then(
        function (response) {
            response.status === 200 ? setIsSuccess(true): setIsSuccess(isSuccess);
        },
        function (err) {
          console.log(err);
        }
      );
}

    const disableSendhint = () => {
        if (_isEmpty(yourName) || _isEmpty(recipientName) || _isEmpty(recipientEmail)) {
            return true
        } else {
            return false
        }
    }

  return (
      <>
          <div className="variantoverlayNew" >
              <div class="send-hint__content">
                  <span class="fa fa-times" size="1x" onClick={() => { props.onClose() }} />
                  <header class="send-hint__header">
                      <h1>{!isSuccess ? 'Send a Hint' : 'YOUR HINT HAS BEEN SENT!'}</h1>
                      {!isSuccess && <p>They'll appreciate it, and you'll get what you want.</p>}
                  </header>
                  {!isSuccess && <div class="send-hint__main">
                      <form id="send_a_hint">
                          <a></a>
                          <div class="send-hint__fields">
                              <div class="send-hint__field">
                                  <label >Your Name</label>
                                  <input class="" type="text" placeholder="Your Name" onChange={(e) => { setYourName(e.target.value) }} required />
                              </div>

                              <div class="send-hint__field">
                                  <label >Your Email <span>(optional)</span></label>
                                  <input class="" type="email" placeholder="Your Email" onChange={(e) => { setYourEmail(e.target.value) }} />
                              </div>

                              <div class=" send-hint__field">
                                  <label >Recipient's Name</label>
                                  <input class="" type="text" placeholder="Recipient's Name" required onChange={(e) => { setRecipientName(e.target.value) }} />
                              </div>

                              <div class=" send-hint__field">
                                  <label>Recipient's Email</label>
                                  <input class="" type="email" placeholder="Recipient's Email" required onChange={(e) => { setRecipientEmail(e.target.value) }} />
                              </div>
                          </div>
                          <div >
                              <button type="submit" disabled={disableSendhint()} class="send-hint__submit " onClick={(e) => sendEmail(e)}>Send Hint</button>
                          </div>
                      </form>
                  </div>
                  }
              </div>
          </div>

      </>
  );
};

export default (SendHint);