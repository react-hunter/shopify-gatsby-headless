import React from 'react';
import Preloader from "../../components/common/preloader"

const Returns = ({ data }) => {
    return (
      <>
        <Preloader />
        <div className="page-width top-spacing page-template">
            <div className="grid">
                <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                    <div className="rte proper-margins">
                        <p><b>Refund Policy</b></p>
                        <p><b>Rose Arrangement&nbsp;Refund Policy</b></p>
                        <p>Due to the nature of the handmade preserved roses, the time and effort that goes into making the Rose Arrangement (<strong>Galaxy Rose Arrangement Included</strong>) and for sanitary purposes there are no&nbsp;returns or exchanges on Rose Arrangements. In the unlikely event you receive a damaged item, we will gladly replace it within 30 days of the date of purchase.</p>
                        <p><b>All Other Items (Ex. Galaxy Rose, Enchanted&nbsp;Galaxy Rose, etc.,)</b></p>
                        <p><span style={{ fontWeight: '400' }}>To be eligible for a return, please make sure that:&nbsp;</span></p>
                        <ol>
                            <li style={{ fontWeight: '400' }}><span style={{ fontWeight: '400' }}>The product was purchased within the last 30 days.</span></li>
                            <li style={{ fontWeight: '400' }}><span style={{ fontWeight: '400' }}>The product is unopened, in its original packaging.&nbsp;</span></li>
                            <li style={{ fontWeight: '400' }}><span style={{ fontWeight: '400' }}>You have the receipt, order confirmation or proof of purchase from Dose of Roses. We are unable to accept returns of purchases made from third-party retailers.</span></li>
                            <li style={{ fontWeight: '400' }}><span style={{ fontWeight: '400' }}>Product does not contain preserved roses as these are <strong>FINAL SALE</strong>.</span></li>
                        </ol>
                        <p><span style={{ fontWeight: '400' }}>Products that do not meet these criteria will not be considered for return.&nbsp;</span></p>
                        <p><a href="/pages/return-order" title="Return Order"><span style={{ fontWeight: '400' }}>Click here to start a new return.</span></a></p>
                        <p><b>*Please note: You will be responsible for the return shipping cost.</b>&nbsp;</p>
                        <p><span style={{ fontWeight: '400' }}>Dose of Roses does not credit original shipping charges or Sale Returns.&nbsp;</span></p>
                        <p><b>Edit, Cancel Order and Shipping Address Change</b></p>
                        <p><span style={{ fontWeight: '400' }}>Shipping Addresses can be changed </span><b>ONLY</b><span style={{ fontWeight: '400' }}> if the order has not been fulfilled. If the order has been fulfilled we advise reaching out to the shipping carrier for an alternate solution.</span></p>
                        <p><span style={{ fontWeight: '400' }}>Due to the fast nature of our supply chain our warehouse&nbsp;and or floral staff begin working on your order right away. <strong>For this reason we're unable to accept any order cancellations.</strong></span><strong>&nbsp;</strong></p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Returns