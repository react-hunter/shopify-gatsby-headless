import React from 'react';
import CustomiserBanner from '../components/createPage/customiserBanner';
import CustomiserSteps from '../components/createPage/createSteps';
import CreateArrangements from '../components/createPage/createArrangements';
import CreateExpert from '../components/createPage/createExpert';

const contactusPage = ({ data }) => {
    return (
      <>
      <div class="contact_us-page">
        <div class="page-width">
          <div class="grid">
            <div class="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
              <div class="section-header text-center contact-form_wrapper">
                <h1>Contact us</h1>
              </div>

              <div class="contact-form form-vertical">
                <div id="ContactForm">
                    <input type="hidden" name="form_type" value="contact" />
                    <input type="hidden" name="utf8" value="✓" />
                    <div class="grid grid--half-gutters">
                      <div class="grid__item medium-up--one-half">
                        <label for="ContactForm-name" >Name</label>
                        <input type="text" id="ContactForm-name" name="contact[Name]" value="" />
                      </div>
                      
                      <div class="grid__item medium-up--one-half">
                        <label for="ContactForm-email" >Email <span aria-hidden="true">*</span></label>
                        <input type="email" id="ContactForm-email" name="contact[email]" autocorrect="off" autocapitalize="off" 
                            value="" aria-required="true" />
                      </div>
                    </div>

                    <label for="ContactForm-phone" >Phone Number</label>
                    <input type="tel" id="ContactForm-phone" name="contact[Phone Number]" pattern="[0-9\-]*" value="" />

                    <label for="ContactForm-message" >Message</label>
                    <textarea rows="10" id="ContactForm-message" name="contact[Message]"></textarea>

                    <input type="submit" class="btn contact-submit_button" value="Send" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}
  
export default contactusPage