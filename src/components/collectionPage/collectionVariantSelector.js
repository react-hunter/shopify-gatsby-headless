import React, { useContext, useState, useEffect, forwardRef } from 'react';
import { navigate, Link } from 'gatsby';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StoreContext from '../../context/store';
import ImageSpin from '../common/imageSpin';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import  _map  from 'lodash/map';
import  _get  from 'lodash/get';
import  _filter  from 'lodash/filter';
import  _includes  from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import DeliveryDateModal from '../productPage/DeliveryDateModal';
import { processFedExCalendar, calculateShipAndDeliverDate } from '../../helper/delivery';

const CollectionVariantSelector = React.memo(function CollectionVariantSelector(props) {
	const context = useContext(StoreContext);
	const product = props.product;
	const protectionProduct = props.protectionProduct;
	const firstVariant = product.variants[0];
	const [variant, setVariant] = useState(firstVariant);
	const [showSpin, setShowSpin] = useState(false);
	const mainOption = product.options[0]
	const otherOptions = product.options.length > 1 ? product.options.slice(1, product.options.length) : []
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

	useEffect(() => {
		processFedExCalendar().then(dates => {
			if (_isEmpty(dates) === false) {
				setStartDate(new Date(dates[0]));
				setAvailableDates(dates);
				setVariant({
					...variant, deliveryDate: moment
						(new Date(dates[0]))
						.format('LL')
				})
			}
		});
	}, []);

	 useEffect(async () => {
		Array.prototype.slice.call(document.querySelectorAll('.color-swatch')).map(el => {
			const optionName = String(el.dataset.optionname)
			const dataAttributeName = optionName.replace(' ', '_').toLowerCase()
			el.dataset[dataAttributeName] = el.dataset.optionvalue
			return true
		})
		document.getElementsByTagName("html")[0].classList.add("no-scroll");
		document.querySelector(".scrollPreventer").style.overflow = "hidden";
		attachCloseMobileVariantSelector();
	 }, []);

	const getVariantByOption = (optionName, optionValue) => {
		var properVariant = null
		const otherOptionList = variant.selectedOptions.filter(op => op.name !== optionName)
		let variantOptions = {}
		variant.selectedOptions.map(so => {
			variantOptions[so.name] = so.value
			return true
		})
		product.variants.map(va => {
			var matched = true;
			otherOptionList.map(oo => {
				if(!va.title.split(' / ').includes(variantOptions[oo.name])) {
					matched = false
				}
				return true
			})
			if(matched === true && va.title.split(' / ').includes(optionValue)) {
				properVariant = va;
			}
			return true
		})
		return properVariant
	}
	const checkVariantExist = (optionName, optionValue) => {
		const theVariant = getVariantByOption(optionName, optionValue)
		return theVariant ? true : false
	}
	const getSaleClass = (optionName, optionValue) => {
		const theVariant = getVariantByOption(optionName, optionValue)
		return theVariant ? (theVariant.availableForSale ? '' : 'sold-out-swatch') : '';
	}

	const getValueByName = (optionName) => {
		const theOption = variant.selectedOptions.filter(so => so.name === optionName)[0]
		return theOption.value
	}

	const selectVariantOption =(optionName, optionValue) => {
		const theVariant = getVariantByOption(optionName, optionValue);
		setVariant(theVariant)
	}
	const addToSideCart =() => {
		setShowSpin(true);
		const properties = calculateShipAndDeliverDate(variant.deliveryDate, _get(availableDates, 0));
		context.addVariantToCart(variant.shopifyId, 1, properties, variant.deliveryDate || moment
			(startDate)
			.format('LL'));
		setTimeout(() => context.addProtection(protectionProduct.variants[2].shopifyId, variant.deliveryDate), 1200);
		setTimeout(showCart, 2500);
	}
	function showCart() {
		setShowSpin(false);
		props.closeModal();
		document.querySelector('.site-header__cart').click()
	}
	const changeUrl = () => {
		navigate('/pages/create')
	}
	const closeVariantSelector =() => {
		props.closeModal();
	}
	const handleKeyDown =(e) => {
		e.preventDefault();
	}

	let xDownVariant = null;
	let yDownVariant = null;

	function attachCloseMobileVariantSelector() {
		let mobileTriggers = document.querySelectorAll(".closeVariantSelector");
		let mobileTrigger = mobileTriggers[0]
		// for (let i = 0; i < mobileTriggers.length; i++) {
			// mobileTrigger = mobileTriggers[i];
			mobileTrigger.addEventListener('touchstart', (evt) => {
				const firstTouch = getTouches(evt)[0];
				xDownVariant = firstTouch.clientX;
				yDownVariant = firstTouch.clientY;
			}, {passive: true});

			mobileTrigger.addEventListener('touchmove', (evt) => {
				if (!xDownVariant || !yDownVariant) {
					return;
				}

				var xUp = evt.touches[0].clientX;
				var yUp = evt.touches[0].clientY;

				var xDiff = xDownVariant - xUp;
				var yDiff = yDownVariant - yUp;

				if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
				} else {
					if (yDiff > 0) {
						/* up swipe */
					} else {
						/* down swipe */
						// swipeDownVariantSelector(mobileTrigger);
						props.closeModal();
					}
				}
				/* reset values */
				xDownVariant = null;
				yDownVariant = null;
			}, {passive: true});
		// }
	}
	function getTouches(evt) {
		return evt.touches ||             // browser API
		evt.originalEvent.touches; // jQuery
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
		<div className="variantoverlayNew" id="variantOverlay-">
			<div className="variantSelector_wrapper animate-bottom" data-toggle="modal">
				<div className="variantSelector-section"> 
					<div className="closeVariantSelector">
						<div className="closeVariantSelector_content">
							<span className="variantSelector_close_message"
								onClick={changeUrl} onKeyDown={handleKeyDown} role="button" tabIndex="0"
								style={{ float: 'left', cursor: 'pointer', marginLeft: '10px' }}>Need more options? Customize now</span>
							<span className="variantSelector_close"  
								onClick={closeVariantSelector} onKeyDown={handleKeyDown} role="button" tabIndex="0"
								style={{ float: 'right'}}>×</span>
						</div>
						<div className="closeVariantSelector-mobile_swipe"></div>
					</div>
					<div className="preview-main-option_wrapper">
						{ 
						product.productType !== 'Lingerie'? 
							<div className="preview_wrapper">
								{/* { variant.image &&
									<GatsbyImage image={variant.image.imageData ? variant.image.imageData.childImageSharp.gatsbyImageData : props.placeholderImage} 
										className="variantSelector-preview_img"
										loading="lazy" alt={variant.title} />
								} */}
								{ variant.image &&
									<LazyLoadImage src={variant.image.originalSrc}
										className="variantSelector-preview_img"
										effect="blur" loading="eager" alt={variant.title} />
								}
							</div>
						: 
						<div className="preview_wrapper special_ratio">
							<LazyLoadImage className="variantSelector-preview_img" alt=""
								src={product.images[0] ? product.images[0].originalSrc : ''}
								effect="blur" loading="eager" />
							<LazyLoadImage className="variantSelector-preview_img second_image" alt=""
								src={product.images[1] ? product.images[1].originalSrc : ''}
								effect="blur" loading="eager" />
							{/* { product.images[0] &&
								<GatsbyImage image={product.images[0].imageData ? product.images[0].imageData.childImageSharp.gatsbyImageData : props.placeholderImage}
									className="variantSelector-preview_img"
									loading="lazy" alt={variant.title} />
							}
							{ product.images[1] &&
								<GatsbyImage image={product.images[1].imageData ? product.images[1].imageData.childImageSharp.gatsbyImageData : props.placeholderImage}
									className="variantSelector-preview_img second_image"
									loading="lazy" alt={variant.title} />
							} */}
						</div>
						}

						<div className="main-option_wrapper variantSelector-option_wrapper">
							<span className="option-header">{mainOption.name}: {getValueByName(mainOption.name)}</span>
							<div className="option_options_wrapper">
								{
									product.variants.length > 1 && mainOption.values.map((mo, moIndex) => {
										const selectEffectClass = getValueByName(mainOption.name) === mo ? 'select-effect' : ''
										return (
											<div className={`swatch-wrapper ${selectEffectClass}`} key={moIndex}>
												<div className={`color-swatch ${getSaleClass(mainOption.name, mo)}`} 
													onClick={() => selectVariantOption(mainOption.name, mo)} onKeyDown={handleKeyDown}
													role="button" tabIndex="0" data-swatch_type={mainOption.name} 
													data-optionname={mainOption.name} data-optionvalue={mo}>
													{mainOption.name === 'Size' ? mo.charAt(0) : null}{mainOption.name === 'Quantity' ? mo : null}
												</div>
												<div></div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>

					<div className="line-break_container">
						<div className="variantSelector_line_break"></div>
					</div>
	
					{
						otherOptions.length > 0 && otherOptions.map((otherOption, otherOptionIndex) => {
							return (
								<div className="sub-option_wrapper variantSelector-option_wrapper" key={otherOptionIndex}>
									<span className="option-header">{otherOption.name}: {getValueByName(otherOption.name)}</span>
									{product.variants.length > 1 && <div className="option_options_wrapper">
										{
											  otherOption.values.map((oo, ooIndex) => {
												const selectOtherEffectClass = getValueByName(otherOption.name) === oo ? 'select-effect' : ''
												return (
													checkVariantExist(otherOption.name, oo) && (<div className={`swatch-wrapper ${selectOtherEffectClass}`} key={ooIndex}>
														<div className={`color-swatch selected-swatch ${getSaleClass(otherOption.name, oo)}`} 
															data-optionname={otherOption.name} data-optionvalue={oo} data-swatch_type={otherOption.name} role="button" tabIndex="0"
															onClick={() => selectVariantOption(otherOption.name, oo)} onKeyDown={handleKeyDown}>
															{otherOption.name === 'Size' ? oo.charAt(0) : null}
														</div>
														<div></div>
													</div>)
												)
											})
										}
									</div>
						}
								</div>
							)
						})
					}
				</div>

				<div className="variant-selector_add_to_bag_wrapper">
					{
						_isEmpty(availableDates) === false && (
							<div className="delivery-date">
								<label>Delivery Date</label>
								{windowDimensions < 550 && <button className='date-button' onClick={()=> setModal(true)}>{startDate ? moment
											(startDate)
											.format('LL'): ''}</button>
								}
								{windowDimensions > 550 && <DatePicker
									selected={startDate}
									onChange={date => {
										setVariant({...variant, deliveryDate: moment
											(date)
											.format('LL')});
										setStartDate(date)}}
									{...availableDates.length > 0 && {
										minDate: new Date(availableDates[0])
									}}
									dateFormat="MMMM d, yyyy"
									// includeDates={showAvailableDates()}
									withPortal 
									customInput={<ExampleCustomInput />}
									onChangeRaw={(e)=> e.preventDefault()}/>
										}
								<span class="fas fa-calendar-alt" size="1x" />
								
							</div>
						)
					}
					<div>
					{ variant.availableForSale ? 
						<button className="variant-selector_add_to_bag" 
							onClick={addToSideCart}>
								ADD TO BAG - ${variant.price}{showSpin ? <span className="image-spin-wrapper"><ImageSpin small="small" /></span> : null }
						</button> :
						<button className="variant-selector_add_to_bag" 
							onClick={props.showNotifyModal}
							style={{ display: 'inline-block' }}>NOTIFY ME</button>
					}
					{ product.productType !== 'Lingerie' && product.productType !== 'Rose Bear' ?
						<Link to="/pages/create" className="mobile-more-options">NEED MORE OPTIONS? CUSTOMIZE NOW</Link> :
						null
					}
					</div>
				</div>
			</div>
			<div className="variantSelector_overlay" 
				onClick={closeVariantSelector} onKeyDown={handleKeyDown} role="button" tabIndex="0">

			</div>
			{_isEmpty(availableDates) === false && modal && <DeliveryDateModal
			selected={startDate}
			onChange={(date) => {
				setVariant({...variant, deliveryDate: moment
					(date)
					.format('LL')});
				setStartDate(date);
				setModal(false)
			}}
			includeDates={showAvailableDates()}
			onClose={()=>setModal(false)}
			/>
			}
		</div>
		
		</>
	);
});

CollectionVariantSelector.displayName = 'CollectionVariantSelector';

export default CollectionVariantSelector;