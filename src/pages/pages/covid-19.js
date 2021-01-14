import React from 'react';
import Preloader from "../../components/common/preloader"

const Covid19 = ({ data }) => {
    return (
      <>
        <Preloader />
        <div className="page-width top-spacing page-template">
            <div className="grid">
                <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                    <div className="rte proper-margins">
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>
                            <strong>WE’RE BETTER TOGETHER</strong>
                            <br/>
                            <strong>OUR RESPONSE TO COVID-19</strong>
                            <br/>
                            <span>&nbsp;</span>
                            <br/>
                            <span>At Dose of Roses, we are dedicated and intent on protecting the safety and health of our employees, customers and community. We want you to know that we're here for you and will continue to communicate the proactive steps we’re taking to support and maintain the safety of our Dose of Roses family during this extremely challenging time. In addition to following recommended government guidelines on how to stay safe during the COVID-19 pandemic, here are a few updates for what we’re doing to keep you protected.&nbsp;</span>
                            <br/>
                            <span>&nbsp;</span><br/>
                            <span>&nbsp;</span><br/>
                            <strong>SHIPPING UPDATES</strong>
                            <br/>
                            <strong>As COVID-19 continues to put a strain on shipping logistics, we are working closely with our delivery partners to ensure all deliveries arrive safely and as on-time as possible. At Dose of Roses, the health and wellbeing of our customers is our top priority and all necessary precautions are being taken to ensure the additional safety of both customers and couriers during this time.&nbsp;&nbsp;</strong>
                            <br/>
                            <span>Due to COVID-19 and increased demand , some orders may experience shipping delays and we thank you for your patience and understanding with any delays that may occur.&nbsp;</span>
                            <br/>
                            <span>Our teams are working around the clock to make things happen and ensure your order is fulfilled as we work to get orders out to you as safely and quickly as possible.&nbsp;</span>
                            <br/>
                            <span>&nbsp;</span>
                            <br/>
                            <span>Keep an eye out on order updates based on your preferred communication preference via text or email. We'll keep you updated </span>
                            <em>as soon as</em>
                            <span> items in your order ship or any other news that may impact your order.</span>
                            <br/>
                            <span>&nbsp;</span>
                            <br/>
                            <strong>FAMILY COMES FIRST</strong>
                            <br/>
                            <span>Our online services are fully functional as we work to make sure these timeless roses and gifts are sent to your loved ones. To flatten the curve and ensure the safety of our teams, all corporate and customer service teams are working remotely from home.</span>
                            <br/>
                            <span>&nbsp;</span>
                            <br/>
                            <span>Here at Dose of Roses, we are committed to staying on top of the newest government guidelines and regulations as we continue to work with our diligent fulfillment centers (where permitted to operate by local governments).&nbsp;</span>
                            <br/>
                            <span>&nbsp;</span>
                            <br/>
                            <span>We want to make sure you feel supported -- for any further questions or concerns, reach out to us at </span>
                            <a target="_blank" rel="noopener noreferrer" className="PrimaryLink BaseLink" href="mailto:support@doseofroses.com" aria-describedby="a11y-new-window-external-message">support@doseofroses.com</a>
                            <span> or call us at (323)-792-1201 Monday – Friday between 8:00am – 3:30pm PDT.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Covid19