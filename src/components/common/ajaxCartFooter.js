import React from 'react';
import { ReactSVG } from 'react-svg';

import piAmazon from '../../images/slideCartFooter/pi-amazon.svg';
import piAmerican_express from '../../images/slideCartFooter/pi-american_express.svg'
import piApple_pay from '../../images/slideCartFooter/pi-apple_pay.svg'
import piBitcoin from '../../images/slideCartFooter/pi-bitcoin.svg'
import piBitcoin_cash from '../../images/slideCartFooter/pi-bitcoin_cash.svg'
// import piDiners_club from '../../images/slideCartFooter/pi-diners_club.svg'
import piDiscover from '../../images/slideCartFooter/pi-discover.svg'
import piEthereum from '../../images/slideCartFooter/pi-ethereum.svg'
// import piJcb from '../../images/slideCartFooter/pi-jcb.svg'
import piLitecoin from '../../images/slideCartFooter/pi-litecoin.svg'
import piMaster from '../../images/slideCartFooter/pi-master.svg'
import piVisa from '../../images/slideCartFooter/pi-visa.svg'


const AjaxCartFooter = () => {
	return (
		<ul className="payment-icons">
			<li>
				<ReactSVG src={piAmazon} />
			</li> 
			<li>
				<ReactSVG src={piAmerican_express} />
			</li> 
			<li>
				<ReactSVG src={piApple_pay} />
			</li> 
			<li>
				<ReactSVG src={piBitcoin} />
			</li> 
			<li>
				<ReactSVG src={piBitcoin_cash} />
			</li> 

			<li>
				<ReactSVG src={piDiscover} />
			</li> 
			<li>
				<ReactSVG src={piEthereum} />
			</li> 

			<li>
				<ReactSVG src={piLitecoin} />
			</li> 
			<li>
				<ReactSVG src={piMaster} />
			</li> 
			<li>
				<ReactSVG src={piVisa} />
			</li>
		</ul>
	);
};
	
export default AjaxCartFooter;