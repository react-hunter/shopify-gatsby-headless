/* eslint-disable */
import React from 'react';
import Preloader from "../../components/common/preloader"
import SEO from "../../components/common/seo"

const ContactUs = () => {
    return (
      <>
        <SEO
          title="Contact us - Dose of Roses"
          mainTitle="Contact us"
          description="Dose of Roses customer care team is available 24/7 and can be reached via this form. We aim to respond back within 24 hours."
          type="website"
        />
        <Preloader />
        <div className="contact_us-page">
          <div className="page-width">
            <div className="grid">
              <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                <div className="section-header text-center contact-form_wrapper">
                  <h1>Contact us</h1>
                </div>

                <div className="contact-form form-vertical">
                  <div id="ContactForm">
                      <input type="hidden" name="form_type" value="contact" />
                      <input type="hidden" name="utf8" value="✓" />
                      <div className="grid grid--half-gutters">
                        <div className="grid__item medium-up--one-half">
                          <label htmlFor="ContactForm-name" >Name</label>
                          <input type="text" id="ContactForm-name" name="contact[Name]" value="" />
                        </div>
                        
                        <div className="grid__item medium-up--one-half">
                          <label htmlFor="ContactForm-email" >Email <span aria-hidden="true">*</span></label>
                          <input type="email" id="ContactForm-email" name="contact[email]" autoCorrect="off" autoCapitalize="off" 
                              value="" aria-required="true" />
                        </div>
                      </div>

                      <label htmlFor="ContactForm-phone" >Phone Number</label>
                      <input type="tel" id="ContactForm-phone" name="contact[Phone Number]" pattern="[0-9\-]*" value="" />

                      <label htmlFor="ContactForm-message" >Message</label>
                      <textarea rows="10" id="ContactForm-message" name="contact[Message]"></textarea>

                      <input type="submit" className="btn contact-submit_button" value="Send" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
  
export default ContactUs