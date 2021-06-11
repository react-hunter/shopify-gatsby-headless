import React, { useContext, useState, useEffect, forwardRef } from 'react' /* eslint-disable */
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
import _map from 'lodash/map';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import Buttons from "./Buttons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { deliveryDatesData, getDeliveryDate, getIP, getLocation, getPickupDate, getPostalCode } from '../../helper';
import DeliveryDateModal from './DeliveryDateModal';
import { processFedExCalendar } from '../../helper/delivery';

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
	const [modal, setModal] = useState(false);
	const hasWindow = typeof window !== 'undefined';
	const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

	useEffect(() => {
		if (hasWindow) {
			function handleResize() {
				setWindowDimensions(window.innerWidth);
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [hasWindow]);

	useEffect(async () => {
		async function getAccordionData() {
			const accordionData = await client.getEntries({ 'content_type': 'productAccordion' });
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
		let listDates=[];
		processFedExCalendar().then(dates => {
			if (_isEmpty(dates) === false) {
				listDates = dates
				setStartDate(new Date(dates[0]));
				setAvailableDates(dates);
			}
		});
		setVariant({
			...defaultOptionValues, deliveryDate: listDates ? moment
				(new Date(listDates[0]))
				.format('LL'): null
		})
		getAccordionData();
	}, [])

	useEffect(() => {
		checkAvailability(product.shopifyId)
	}, [productVariant])


	function rotateButton(identifier) {
		if (document.getElementsByClassName(identifier)[0].firstElementChild.style.transform === "rotate(0deg)") {
			document.getElementsByClassName(identifier)[0].firstElementChild.style.transform = "rotate(180deg)"
		} else {
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
			for (var i = 0; i < jsonObj.length; i++) {
				if (jsonObj[i].productHandle === product.handle) {
					return { display: `none` };
				}
			}
		}
	}

	function findVariant(optionName, optionValue) {
		var properVariant = null
		const otherOptionKeys = Object.keys(variant).filter(optionKey => (optionKey !== optionName && optionKey !== 'deliveryDate' && optionKey !== 'messageContent'))

		product.variants.map(va => {
			var matched = true;
			otherOptionKeys.map(ook => {
				if (!va.title.split(' / ').includes(variant[ook])) {
					matched = false
				}
			})
			if (matched === true && va.title.split(' / ').includes(optionValue)) {
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
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button className="date-button" onClick={onClick} ref={ref}>
			{value}
		</button>
	));

	return (
		<>
			{!modal && <div className="product_description-container">
				<div className="grid__item medium-up--one-half rightSideProductContainer">
					<div className="product-single__meta">
						<ProductInfo product={product} review={review} />
						{
							_isEmpty(availableDates) === false && (
								<div className="delivery-date">
									<label >Delivery Date</label>
									{windowDimensions < 550 && <button className='date-button' onClick={() => setModal(true)}>{startDate ? moment
										(startDate)
										.format('LL') : ''}</button>
									}
									{windowDimensions > 550 && <DatePicker
										selected={startDate}
										onChange={date => {
											setVariant({
												...variant, deliveryDate: moment
													(date)
													.format('LL')
											});
											setStartDate(date)
										}}
										// minDate={new Date()}
										{
											...availableDates.length > 0 && {
												minDate: new Date(availableDates[0])
											}
										}
										// includeDates={showAvailableDates()}
										onChangeRaw={(e) => e.preventDefault()}
										dateFormat="MMMM d, yyyy"
										customInput={<ExampleCustomInput />}
										withPortal />
									}
									<span class="fas fa-calendar-alt" size="1x" />
								</div>
							)
						}
						{product.productType === 'Lingerie' ?
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
							variant={variant}
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

							{productAccordions.map((item, index) =>
								<div key={index} style={showAccordions(item.fields.disableProductList)} >
									<button key={`btn_${index}`} className={`accordion_button ${item.fields.headerClass}`}>
										{item.fields.header}
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
			}
			{_isEmpty(availableDates) === false && modal && <DeliveryDateModal
				selected={startDate}
				onChange={(date) => {
					setVariant({
						...variant, deliveryDate: moment
							(date)
							.format('LL')
					});
					setStartDate(date);
					setModal(false)
				}}
				includeDates={showAvailableDates()}
				onClose={() => setModal(false)}
			/>
			}
		</>
	);
});

ProductDescription.displayName = 'ProductDescription';

export default ProductDescription;