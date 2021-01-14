import React from 'react';
import Preloader from "../../components/common/preloader"

const Shipping = ({ data }) => {
    return (
      <>
        <Preloader />
        <div className="page-width top-spacing page-template">
            <div className="grid">
                <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                    <div className="rte proper-margins">
                        <h2 style={{ textAlign: 'center' }}><span style={{ color: '#000000' }}><strong>Shipping Information</strong></span></h2>
                        <span style={{ color: '#000000' }}> <strong>Processing Time</strong> </span>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>Please allow 1-3 business days for us to process and ship your order. Orders placed after 1pm will be processed the next business day. All orders are shipped&nbsp;FedEx or USPS and International orders are shipped USPS International. *Please note we do not ship or process orders on the weekend!</span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>&nbsp;</span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                        <p style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong>Local Pick-Up&nbsp;</strong></span></p>
                        <div style={{ textAlign: 'left' }}>
                        <ul>
                            <li><span style={{ color: '#000000' }}>Pick Up Time (10am-3:30pm)</span></li>
                            <li><span style={{ color: '#000000' }}>Customer will be notified via email when the package is available for pick up.</span></li>
                            <li><span style={{ color: '#000000' }}>Customer must provide Order Number and Valid ID when coming to pick up at our facility.(<strong>ID Name</strong> must match the name on the order.)&nbsp;</span></li>
                        </ul>
                        <p><span style={{ color: '#000000' }}><strong>Local Delivery</strong></span></p>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                        <ul>
                            <li style={{ fontWeight: '400'}}><span style={{ fontWeight: '400', color: '#000000' }}>40 mile Radius</span></li>
                            <li style={{ fontWeight: '400'}}><span style={{ fontWeight: '400', color: '#000000' }}>$35 Charge</span></li>
                            <li style={{ fontWeight: '400'}}><span style={{ fontWeight: '400', color: '#000000' }}>Delivery Timeframe (ASAP or specified time)</span></li>
                            <li style={{ fontWeight: '400'}}><span style={{ fontWeight: '400', color: '#000000' }}>Info via text only - customer will receive text message when the order is on the way</span></li>
                        </ul>
                        <p><span style={{ color: '#000000' }}><strong>FedEx and USPS Over-Night Shipping</strong></span></p>
                        <p><span style={{ color: '#000000' }}>Please note orders that are placed on Friday before 1pm will be delivered on the next business day. The next business day from Friday would be Monday!&nbsp;<strong>Packages&nbsp;are delivered Monday - Friday!&nbsp;</strong></span></p>
                        <p>&nbsp;</p>
                    </div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong></strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong></strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong></strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong></strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong>Standard Domestic Shipping</strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}>For <i>Standard Domestic Shipping</i>, Once your order has been shipped, you will receive an email with your tracking number to monitor your shipment.&nbsp;Once you have the tracking number please allow 24 hrs for it to enter the carrier’s system and update; once the tracking is updated you will have step by step knowledge to the status of your package.&nbsp;<strong>Packages will be delivered Monday - Friday!&nbsp;</strong> </span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}>&nbsp;</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}> <strong>International Shipping</strong><strong>&nbsp;</strong> </span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}> <span style={{ fontWeight: '400'}}>USPS International Economy - Cost is calculated at checkout (</span><i><span style={{ fontWeight: '400'}}>varies between item purchased and destination</span></i><span style={{ fontWeight: '400'}}>)</span> </span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}>*Please note: Dose of Roses cannot cover custom fees/taxes. A customs tax is a tariff or tax imposed on goods when transported across international borders, it is a fee from the foreign country rather than Dose of Roses.</span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><i><span style={{ fontWeight: '400'}}></span></i></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><b>INTERNATIONAL CUSTOMS</b></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>You are responsible to know the import regulations for your country. Please research to ensure that they are legal for importation PRIOR to ordering. Once the order has left our premises we cannot be held responsible for customs delays. Most countries will have no trouble but we post this disclaimer in the off chance that there is an issue.</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>We provide tracking information for all orders so please be diligent and keep track of your orders' progress through the mail system.</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>We do not have a reship policy. We <strong>DO</strong> assume that all clients are aware of their own countries' laws and therefore you are responsible for dealing with your countries' customs.</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>Please know your own import regulations before ordering. It is your responsibility. If customs does not return the products to us we cannot issue the 85% refund to you. If your order is denied entry into your country, we strongly advise attempting to have the items sent back to us and we will refund your order less shipping and a 15% restocking fee.</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong>What is Route - Shipping Insurance/Protection?</strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}>&nbsp;Route Shipping Protection&nbsp;<span style={{ fontWeight: '400'}}>provides transparency for customers post purchase experience. Route is also insures your package so if you received a lost, stolen or damaged package. Please reach out to Route to submit a claim. You will receive a "Welcome Email" from Route via the email address provided at checkout.&nbsp;</span> </span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><span style={{ fontWeight: '400'}}></span></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><strong>What is Rush Processing? And how does it work?</strong></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}>*Rush Processing expedites the fulfillment of your order so it can be verified, tailored to our Dose of Roses standards, quality checked, packaged and on the road within 24 hrs. For Rush Processing to be effective, your order must be submitted and charged before (1pm) local time (PST) Mon-Fri. If the above conditions are met and we fail to ship your order within 24 hrs., we will refund the Rush Processing fee.&nbsp;</span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}> <span style={{ fontWeight: '400'}}>Rush Processing fee </span><b>DOES NOT</b><span style={{ fontWeight: '400'}}> affect the actual shipping time in transit. If you need your order quickly, please be sure to choose the appropriate shipping method as well.</span> </span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><span style={{ fontWeight: '400'}}></span></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}>
                    <meta charSet="utf-8" />
                    <p><span style={{ color: '#000000' }}><b>Edit, Cancel Order and Shipping Address Change</b></span></p>
                    <p><span style={{ color: '#000000' }}><span style={{ fontWeight: '400'}}>Shipping Addresses can be changed&nbsp;</span><b>ONLY</b><span style={{ fontWeight: '400'}}>&nbsp;if the order has not been fulfilled. If the order has been fulfilled we advise reaching out to the shipping carrier for an alternate solution.</span></span></p>
                    <p><span style={{ color: '#000000' }}><span style={{ fontWeight: '400'}}>Due to the fast nature of our supply chain our warehouse or floral staff begin working on your order right away.&nbsp;<strong>For this reason we're unable to accept any order cancellations.</strong></span><strong>&nbsp;</strong></span></p>
                    <p>&nbsp;</p>
                    </div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400', color: '#000000' }}></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ color: '#000000' }}><em><strong>We strive to uphold the highest levels of quality customer service. It is our ultimate goal at Dose of Roses to create life-long customers and we will do everything in our power to ensure that your experience with us is one that makes you want to shop with us again and again!</strong></em></span></div>
                    <div style={{ textAlign: 'left' }}><span style={{ fontWeight: '400'}}></span></div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Shipping