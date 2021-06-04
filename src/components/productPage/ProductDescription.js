import React, { useContext, useState, useEffect } from 'react' /* eslint-disable */
import ProductInfo from "./ProductInfo"
import StoreContext from '../../context/store'
import loadable from '@loadable/component';
import { client } from '../../contentful'
import VariantSelectorsForModal from "./VariantSelectorsForModal"
import VariantsSelectorButtons from "./VariantsSelectorButtons"
import LingerieVariantsSelectorButtons from "./LingerieVariantsSelectorButtons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import  _map  from 'lodash/map';
import  _get  from 'lodash/get';
import  _filter  from 'lodash/filter';
import  _includes  from 'lodash/includes';
import Buttons from "./Buttons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { deliveryDatesData, getDeliveryDate, getIP, getLocation, getPickupDate, getPostalCode } from '../../helper';

const AtcSticky = loadable(() => import("./AtcSticky"))

const ProductDescription = React.memo(function ProductDescription({
	product,
	protectionProduct,
	review,
	clickVariantSelect,
	selectVariant
}) {
	const context = useContext(StoreContext);
	const [quantity, setQuantity] = useState(1);
	const [variant, setVariant] = useState(product.variants[0]);
	const productVariant = context.store.client.product.helpers.variantForOptions(product, variant) || variant;
	const [available, setAvailable] = useState(productVariant.availableForSale)
	const [modalOptions, setOptions] = useState(product.options[0])
	const [modalClass, setModalClass] = useState('');
	const [productAccordions, setProductAccordions] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [availableDates, setAvailableDates] = useState([]);

	useEffect(async () => {
		async function getAccordionData() {
			const accordionData = await client.getEntries({'content_type': 'productAccordion'});
			setProductAccordions(accordionData.items);

			document.querySelectorAll('.accordion_button').forEach(button => {
				const accordionButton = button;
				accordionButton.innerHTML = accordionButton.innerHTML + '<i className="fas fa-angle-down"></i>';
				button.addEventListener('click', () => {
					button.classList.toggle('accordion_button--active');
				});
			});
		}
		let defaultOptionValues = {}
		product.options.forEach(selector => {
			defaultOptionValues[selector.name] = selector.values[0]
		})

		let pickupDate;
		try {
			let response = await getPickupDate();
			data = await response.json();
			if (data.output.allowedShipDates.length > 0) {
				const dates = data.output.allowedShipDates[0].shipDates;
				pickupDate = dates[0];
			}
		}
		catch (error) {
		}

		let recipients = {};
		try {
			let reponseIP = await getIP();
			 let IP = await reponseIP.json();
			 let data = await getLocation(IP.ipAddress);
			recipients = await data.json();
			let response = await getPostalCode(recipients.lat, recipients.lon);
			let address = await response.json();
			let zip = _findSomethingFromGooglePlace(address.results[0], 'postal_code');
			recipients = { ...recipients, zip: zip };
		}
		catch (error) {
		}
		getAccordionData();

		let data = {
			...deliveryDatesData,
			requestedShipment: {
				...deliveryDatesData.requestedShipment,
				recipients: [
					{
						address: {
							city: _get(recipients, 'city', ''),
							countryCode: _get(recipients, 'countryCode', ''),
							streetLines: [
								""
							],
							postalCode: _get(recipients, 'zip', ''),
							residential: false,
							stateOrProvinceCode: ""
						}
					}
				],
				shipTimestamp: pickupDate,
			}
		}

		getDeliveryDate(data).then(res => res.json())
			.then((data) => {
				let dates = [];
				if (data.output.rateReplyDetails && data.output.rateReplyDetails.length > 0) {
					dates = _map(data.output.rateReplyDetails, item => {
						return item.commit.dateDetail.day;
					})
					dates.length > 0 ? setStartDate(new Date(dates[0])) : setStartDate();
					setAvailableDates(dates);
					setVariant({
						...defaultOptionValues, deliveryDate: moment
							(new Date(dates[0]))
							.format('LL')
					})
				}
			})

	}, [])

	useEffect(() => {
		checkAvailability(product.shopifyId)
	}, [productVariant])

	const _findSomethingFromGooglePlace = (
		googlePlace,
		fieldText
	  ) => {
		const components = googlePlace.address_components;
	  
		const results= _filter(
		  components,
		  (addressComponent) =>
			_includes(addressComponent.types, fieldText)
		);
	  
		return _get(results, '[0].long_name', '');
	  };


	function rotateButton(identifier){
		if(document.getElementsByClassName(identifier)[0].firstElementChild.style.transform === "rotate(0deg)"){
			document.getElementsByClassName(identifier)[0].firstElementChild.style.transform = "rotate(180deg)"
		}else{
			document.getElementsByClassName(identifier)[0].firstElementChild.style.transform = "rotate(0deg)"
		}
	}

	const checkAvailability = productId => {
		context.store.client.product.fetch(productId).then((product) => {
			// this checks the currently selected variant for availability
			const result = product.variants.filter(
				variant => variant.id === productVariant.shopifyId
			)
			setAvailable(result[0] ? result[0].available : false)
		})
	}

	const handleOptionChange = (name, value) => {
		setVariant(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const openVariantAndFill = (optionName) => {
		const selectedOption = product.options.filter(po => po.name === optionName)[0];
		setOptions(selectedOption);
		setModalClass('top0');
	}

	const closeModal = () => {
		setModalClass('');
	}

	function showAccordions(jsonObj) {
		if (jsonObj) {
			for (var i=0; i<jsonObj.length; i++) {
				if (jsonObj[i].productHandle === product.handle) {
					return { display: `none` };
				}
			}
		}
	}
	
	function findVariant (optionName, optionValue) {
		var properVariant = null
		const otherOptionKeys = Object.keys(variant).filter(optionKey => (optionKey !== optionName && optionKey !== 'deliveryDate'))

		product.variants.map(va => {
			var matched = true;
			otherOptionKeys.map(ook => {
				if(!va.title.split(' / ').includes(variant[ook])) {
					matched = false
				}
			})
			if(matched === true && va.title.split(' / ').includes(optionValue)) {
				properVariant = va;
			}
		})
		return properVariant
	}

	const showAvailableDates = () => {
		let dates = [];
		if (availableDates.length > 0) {
			 dates = availableDates.map(date => {
				return new Date(date);
			})
		}
		return dates;

	}

	return (
		<div className="product_description-container">
			<div className="grid__item medium-up--one-half rightSideProductContainer">
				<div className="product-single__meta">
					<ProductInfo product={product} review={review} />
					<div className="delivery-date">
						<label>Delivery Date</label>
						<DatePicker
							selected={startDate}
							onChange={date => {
								setVariant({...variant, deliveryDate: moment
									(date)
									.format('LL')});
								setStartDate(date)}}
							// minDate={new Date()}
							includeDates={showAvailableDates()}
							onChangeRaw={(e)=> e.preventDefault()}
							 withPortal/>
						<span class="fas fa-calendar-alt" size="1x" />
					</div>
					{product.productType === 'Lingerie'? 
						<LingerieVariantsSelectorButtons product={product} variant={variant}
							changeOption={handleOptionChange} 
							selectVariant={selectVariant} 
							clickVariantSelect={clickVariantSelect}
							findVariant={findVariant} />
						:
						<VariantsSelectorButtons product={product} variant={variant} openVariantAndFill={openVariantAndFill} />
					}

					<Buttons 
						product={product}
						protectionProduct={protectionProduct}
						context={context} 
						available={available} 
						quantity={quantity} 
						productVariant={productVariant}
						variant= {variant}
					/>

					<div className="variant-selector-sideNav">
						<VariantSelectorsForModal
							changeOption={handleOptionChange}
							options={modalOptions}
							closeModal={closeModal}
							modalClass={modalClass}
							clickVariantSelect={clickVariantSelect}
							// productVariant={productVariant}
							selectVariant={selectVariant}
							findVariant={findVariant}
						/>
					</div>
						
				</div>
				
				<div className="product-single__description rte">
						
					<div className="product_accordions-container">
						<div className="product_description">
							<button className={`accordion_button accordion_button--active description`}>
								DESCRIPTION
								<FontAwesomeIcon className="fa-angle-down" icon={faAngleDown} size="1x" />                                
							</button>
							<div
								key={`body`}
								id="content"
								className="content accordion_content"
								dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
							/>
						</div>

						{ productAccordions.map((item, index) => 
							<div key={index} style={showAccordions(item.fields.disableProductList)} >
								<button key={`btn_${index}`} className={`accordion_button ${item.fields.headerClass}`}>
									{ item.fields.header }
									<FontAwesomeIcon className="fa-angle-down" icon={faAngleDown} size="1x" />                                
								</button>
								<div key={`content_${index}`} className={`accordion_content ${item.fields.contentClass}`} dangerouslySetInnerHTML={{ __html: item.fields.content }} />
							</div>
						)}
					</div>
				</div>
			</div>
			<AtcSticky 
				product={product}
				context={context} 
				available={available} 
				quantity={quantity} 
				productVariant={productVariant} />
		</div>
	);
});

ProductDescription.displayName = 'ProductDescription';

export default ProductDescription;