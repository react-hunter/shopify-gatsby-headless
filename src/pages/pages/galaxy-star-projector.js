import React, { useEffect, useState, useContext } from 'react';

import StoreContext from '../../context/store'
import Preloader from "../../components/common/preloader"

import "../../styles/galaxy-star.scss";

import { ReactSVG } from 'react-svg';
import DownChevron from '../../images/down-chevron.svg';

import { useStaticQuery, graphql } from "gatsby"
 
const GalaxyStarProjector = ()  => {

    const id = "galaxy-star-projector";

    const { product } = useStaticQuery(
        graphql`
            query {
                product: shopifyProduct(handle: {eq: "galaxy-star-projector"}) {
                    id
                    shopifyId
                    variants {
                        id
                        shopifyId
                        price
                    }
                }
            }
        `
    )

    const context = useContext(StoreContext);
    const [showSpin, setShowSpin] = useState(false);

    const galaxyScroll = (e) => {
        e.preventDefault();

        document.getElementById('galaxyDescription').scrollIntoView({
            behavior: 'smooth'
        });
    }


    const addItemToCart = (e) => {
        e.preventDefault();

        setShowSpin(true);


        console.log("product = ", product);
        console.log("product.variants[0].shopifyId == ", product.variants[0].shopifyId);

        context.addVariantToCart(product.variants[0].shopifyId, 1);

        setTimeout(showCart, 1200);
    }

    const showCart = () => {
        setShowSpin(false);
        document.querySelector('.site-header__cart').click();
    }

    useEffect(() => {
        console.log("galaxy-star-projector------------------------------------------------");

        console.log("product === ", product);

        document.querySelectorAll('.galaxy_accordion-title').forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('galaxy_accordion-title--active');
            });
        });

    }, [])

    return (
      <>
            <Preloader />

            <div className="galaxy_projector-background">


                <div className="galaxy_hero-container">
                    <div className="galaxy_hero-textbox">
                        <div className="galaxy_hero-title">GALAXY STAR PROJECTOR</div>
                        <div className="galaxy_hero-subtitle">The Galaxy Projector turns any room into a night of stars, light, and color and entering you in a cosmic world</div>
                        <a className="galaxy_hero-arrow" onClick={ galaxyScroll }>
                            <ReactSVG src={DownChevron} />
                        </a>
                    </div>
                </div>


                <div id="shopify-section-galaxy-projector-product" className="shopify-section">
                    <div className="galaxy_product-container">
                        <div className="galaxy_product-wrapper">
                            <div className="galaxy_product-textbox">
                                <div className="galaxy_product-price">${product.variants[0].price}</div>
                                <div className="quadpay-widget"></div>
                                <div className="galaxy_product-description">See the Galaxy in the comfort of your own home and fall asleep under the stars. Transform any room in your living space instantly with the Galaxy Projector, an easy plug &amp; play installation that casts an ethereal orchestra of the night sky onto each surface light can contact</div>
                                <button className="galaxy_product-ATC" onClick={addItemToCart}>ADD TO BAG</button>
                            </div> 
                            <div className="galaxy_product-imagebox">
                                <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/projector_1_1100x.png?v=1611775949" />
                            </div>
                        </div>
                    </div>
                </div>


                <div id="shopify-section-galaxy-projector-video" className="shopify-section">
                    <div className="galaxy_video-container">
                        <div className="galaxy_video-wrapper">
                            <div className="galaxy_video">
                                <video controls="" muted="" 
                                    src="//cdn.shopify.com/s/files/1/0157/4420/4900/t/234/assets/GalaxyProjector.mp4?v=9032016789607494561"></video>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="shopify-section-galaxy-projector-description" className="shopify-section">
                    <div id="galaxyDescription" className="galaxy_description-container">

                        <div className="galaxy_description-initial_box">
                            <div className="galaxy_description-paragraph">
                                <p>The Galaxy Projector turns any room into a night of stars, light, and color and entering you in a cosmic world</p>
                                <p></p>
                                <p>See the Galaxy in the comfort of your own home and fall asleep under the stars. Transform any room in your living space instantly with the Galaxy Projector, an easy plug &amp; play installation that casts an ethereal orchestra of the night sky onto each surface light can contact</p>
                            </div>
                        </div>

                        <div className="galaxy_description-box_wrapper">
                            <div className="galaxy_description-left_flex">
                    
                                <div className="galaxy_description-box">
                                    <div className="galaxy_description-title">BENEFITS</div>
                                    <div className="galaxy_description-paragraph">
                                        <p>Instantly reflects a field of beautiful stars against a transforming nebula cloud.</p>
                                        <p>Incorporates precision glass optics, holographic inovations, and laser to create an exquisite visual experence</p>
                                        <p>With sound enabled effects that create a relaxing or party environment in any room, the Galaxy Star Projector makes a great gift for everyone.</p>
                                        <p>Enjoy dinner under the stars, create a soothing environment or improve your home theater experience; the Galaxy Star Projector is an instant game-changer for any room in your living space.</p>
                                        <p>Simple button controls make it easy to cycle through light effects, play music, adjust brightness, or start/stop the rotating motion.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="galaxy_description-right_flex">
                                <div className="galaxy_description-box">
                                    <div className="galaxy_description-title">SMART CONTROL</div>
                                    <div className="galaxy_description-paragraph">
                                        <p>DancingLightTM lets you observe the charming light following the beat of your favourite music!</p>
                                        <p></p>
                                        <p>Switch between six static or patterned color-combination modes with our progressive touch control sensor innovation. Encounter a diverse universe with the touch of your fingers and witness true visualizations of the Galaxy.</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="galaxy_description-box">
                                    <div className="galaxy_description-title">WIRELESS</div>
                                    <div className="galaxy_description-paragraph">
                                        <p>Powered by a built-in rechargeable batttery, take a pieve of the galaxy to your next party spot and wow the crowd with the touch of a button.</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="galaxy_description-box">
                                    <div className="galaxy_description-title">A UNIQUE GIFT</div>
                                    <div className="galaxy_description-paragraph">
                                        <p>Why scratch your head while thinking of the perfect gift for a loved one's special day, when we've already done that for you? Wrap up their new Galaxy Star Projector and give them a surprise they's never guess in a million years.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="shopify-section-galaxy-projector-included" className="shopify-section">
                    <div className="galaxy_included-container">
                        <div className="galaxy_included-title">WHAT'S INCLUDED</div>
                        <div className="galaxy_included-contents_box">
                        
                            <div className="galaxy_included-content">
                                <div className="galaxy_included-content_image">
                                    <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/GalaxyProjector_TopShot_2_1100x.png?v=1611232648" />
                                </div>
                                <div className="galaxy_included-content_title">Galaxy Projector</div>
                            </div>
                        
                            <div className="galaxy_included-content">
                                <div className="galaxy_included-content_image">
                                    <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/GalaxyProjector_Adapter_1_1100x.png?v=1611232658" />
                                </div>
                                <div className="galaxy_included-content_title">Power Adapter</div>
                            </div>
                        
                            <div className="galaxy_included-content">
                                <div className="galaxy_included-content_image">
                                    <img src="//cdn.shopify.com/s/files/1/0157/4420/4900/files/GalaxyProjector_Cable_1_1100x.png?v=1611232669" />
                                </div>
                                <div className="galaxy_included-content_title">Micro USB Charging Cable</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="shopify-section-galaxy-projector-accordions" className="shopify-section">
                    <div className="galaxy_accordion-container">
                        <div className="galaxy_accordion-wrapper">
                            <div className="galaxy_accordion">
                                
                                    <div className="galaxy_accordion-title">
                                        PRODUCT CARE
                                        <div className="accordion_plus">
                                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"></path></svg>
                                        </div>
                                        <div className="accordion_minus">
                                        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"></path></svg>
                                        </div>
                                    </div>
                                    <div className="galaxy_accordion-content"><p>TEST 1</p></div>
                                
                                    <div className="galaxy_accordion-title">
                                        BENEFITS FROM OUR ROSES
                                        <div className="accordion_plus">
                                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"></path></svg>
                                        </div>
                                        <div className="accordion_minus">
                                        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"></path></svg>
                                        </div>
                                    </div>

                                    <div className="galaxy_accordion-content"><p>TEST 2</p></div>
                                
                                    <div className="galaxy_accordion-title">
                                        LOCAL DELIVERY &amp; SHIPPING
                                        <div className="accordion_plus">
                                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-plus" viewBox="0 0 20 20"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"></path></svg>
                                        </div>
                                        <div className="accordion_minus">
                                        <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-minus" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"></path></svg>
                                        </div>
                                    </div>

                                    <div className="galaxy_accordion-content"><p>TEST 3</p></div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
      </>
    )
}
  
export default GalaxyStarProjector