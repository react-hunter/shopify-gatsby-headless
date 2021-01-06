import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import StoreContext from '../../../context/store'
import { ReactSVG } from 'react-svg';
import LogoIcon from '../../../images/icon-logo.svg';
import HamburgerIcon from '../../../images/icon-hamburger.svg';
import CloseIcon from '../../../images/icon-close.svg';

import SearchHeaderIcon from '../../../images/icon-search-header.svg';
import LoginHeaderIcon from '../../../images/icon-login-header.svg';
import MessageIcon from '../../../images/icon-message.svg';
import CartHeaderIcon from '../../../images/icon-cart-header.svg';
import { commonData } from '../../../data/common';
import './header.css';

import SearchDrawer from './searchDrawer';
import SiteNav from './siteNav';
import MegaMenu from './megaMenu';
import AnnoucmentBar from './annoucmentBar';
import CardSlider from './cardSlider';

let runBannerAnimation = false;

let slideIndex = 0;
let swipedLast = false;

let slides = null;
let bannerContainer = null;

var xDown = null;
var yDown = null;

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  });
  return quantity
}

const Header = ({ path }) => {
  const context = useContext(StoreContext)
  const { checkout } = context.store
  const [quantity, setQuantity] = useState(countQuantity(checkout ? checkout.lineItems : []))
  // const [modal, setModal] = useState(false)
  
  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const showSideNav = (e) => {
    e.preventDefault();
    console.log('show sidenav');

    let modal = document.getElementById('sidenav');
    let openIcon = document.getElementById('mobile-nav--open');
    let closeIcon = document.getElementById('hideSideNav');
    closeIcon.style.display = "flex";
    closeIcon.style.justifyContent = "center";
    modal.style.display = "flex";
    
    document.getElementsByTagName("html")[0].classList.add("side-menu-scroll")
    openIcon.setAttribute("style", "display: none !important;")

    initiateBannerSlider();
  }
  
  const hideSideNav = (e) => {
    e.preventDefault();

    let modal = document.getElementById('sidenav');
    let openIcon = document.getElementById('mobile-nav--open');
    let closeIcon = document.getElementById('hideSideNav');
    openIcon.classList.remove("mobile-nav--close");
    openIcon.classList.add("mobile-nav--open");
    closeIcon.style.display = "none";
    //openIcon.style.display = "flex";
    modal.style.display = "none";
    document.getElementsByTagName("html")[0].classList.remove("side-menu-scroll")
    openIcon.setAttribute("style", "display: flex !important;")

    console.log('hide sidenav');
  }

  const showSearchBar = (e) => {
    e.preventDefault();
    console.log('show search bar');
  }


  const hideSearch = (e) => {
    e.preventDefault();
    console.log('hide search');
  }

  function initiateBannerSlider() {
    if (runBannerAnimation == false) {
      runBannerAnimation = true;
    
      slides = document.getElementsByClassName("card-item");
      bannerContainer = document.getElementById("card-slider-container");
      bannerContainer.addEventListener('touchstart', handleTouchStart, false);
      bannerContainer.addEventListener('touchmove', handleTouchMove, false);
    
      showBanners();
    }
  }

  const showChildCollection = (e, id) => {
    e.preventDefault();

    let allItems = document.getElementsByClassName("sidenav-item_inner");
    for (var i=0; i<allItems.length; i++) {
      allItems[i].style.display = 'none';
    }
    
    let needShowItems = document.querySelectorAll(`[data-parent-id='${id}']`);
    for (var i=0; i<needShowItems.length; i++) {
      needShowItems[i].style.display = 'flex';
    }
    
    showBackArrowButton();
    console.log('this', id);
  }

  const menuClickHandler = (e, hasChild, title) => {
    if(hasChild) {
      showChildCollection(e, title)
    } else {
      hideSideNav(e)
      // console.log('target: ', e.target.closest('a').dataset.url)
      navigate(e.target.closest('a').dataset.url)
    }
  }

  function showBackArrowButton() {
    let modal = document.getElementById('sidenav');
    let openIcon = document.getElementById('mobile-nav--open');
    let closeIcon = document.getElementById('hideSideNav');
    let backIcon = document.getElementById('goBackNavMenu')

    openIcon.classList.remove("mobile-nav--close");
    openIcon.classList.add("mobile-nav--open");
    closeIcon.style.display = "none";
    backIcon.style.display = "flex";
  }

  function showDefaultMenuItems (e) {
    e.preventDefault();

    document.querySelector('#hideSideNav').style.display = "flex";
    document.querySelector('#goBackNavMenu').style.display = "none";


    let allItems = document.getElementsByClassName("sidenav-item_inner");
    for (var i=0; i<allItems.length; i++) {
      allItems[i].style.display = 'none';
    }

    let needShowItems = document.getElementsByClassName("first-level-item_inner");
    for (var i=0; i<needShowItems.length; i++) {
      needShowItems[i].style.display = 'flex';
    }

    console.log('function showDefaultMenuItems');
  }

  function showBanners() {
    let i;

    // Hide the images
    for (i = 0; i < slides.length; i++) {
      slides[i].style.animation = "hide-banner-animation 5s infinite";
    }

    // If the last action was a swipe, don
    if (!swipedLast) {
      slideIndex++;
    } else {
      swipedLast = false;
    }

    if (slideIndex > slides.length) {
      slideIndex = 1
    }

    // Run animation for image being displayed
    slides[slideIndex - 1].style.animation = "display-banner-animation 5s infinite";

    // Change image every 5 seconds
    setTimeout(showBanners, 4950);
  }

  function leftSwipe() {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.animation = "left-swipe-hide 3s forwards";
    }
  
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
  
    slides[slideIndex - 1].style.animation = "left-swipe-show 3s forwards";
  
    slideIndex++;
    swipedLast = true;
  }
  
  function rightSwipe() {
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.animation = "right-swipe-hide 3s forwards";
    }
  
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
  
    slides[slideIndex - 1].style.animation = "right-swipe-show 3s forwards";
  
    slideIndex++;
    swipedLast = true;
  }

  function getTouches(evt) {
    return evt.touches ||
      evt.originalEvent.touches;
  }
  
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };
  
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
  
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
  
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
  
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // left swipe action
        leftSwipe();
      } else {
        // right swipe action
        rightSwipe();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
  
  return (
    <>
      <div id="shopify-section-header" className="shopify-section">
        <div className="stickyHeader">

          <header className="site-header logo--center" role="banner">
            
            <SearchDrawer />
            <div className="main-header site-header__mobile-nav">
              <SiteNav />
              
              <a href="/fakeUrl" onClick={hideSideNav} id="hideSideNav">
                <ReactSVG src={CloseIcon} />
              </a>

              <button onClick={showSideNav} type="button" id="mobile-nav--open" 
                className="btn--link site-header__icon site-header__menu js-mobile-nav-toggle" 
                aria-controls="MobileNav" aria-expanded="false" aria-label="Menu"
              >          
                <ReactSVG src={HamburgerIcon} />
              </button>

              <a href="/fakeUrl" id="goBackNavMenu" 
                style={{ fontFamily: "monospace", cursor: "pointer" }} 
                onClick={showDefaultMenuItems}>
                &lt;
              </a>

              <div className="header_logo-container">
                <h1 className="h2 site-header__logo">
                  <Link to="/" className="site-header__logo-image site-header__logo-image--centered">
                    <ReactSVG src={LogoIcon} />
                  </Link>
                </h1>
              </div>
            
              <div className="header_icons-wrapper">
                <div className="text-right site-header__icons site-header__icons--plus">
                  <div className="site-header__icons-wrapper">
                    <a href="/fakeUrl" onClick={showSearchBar} type="button" 
                      className="btn--link site-header__icon site-header__search-toggle js-drawer-open-top">
              
                      <ReactSVG src={SearchHeaderIcon} />
                      <span className="icon__fallback-text">Search</span>
                    </a>

                    <Link to="/account/login" className="site-header__icon site-header__account">
                      <ReactSVG src={LoginHeaderIcon} />
                      <span className="icon__fallback-text">Log in</span>
                    </Link>
              
                    <Link to="/pages/contact-us" className="site-header__icon site-header__account nav-message_icon">
                      <ReactSVG src={MessageIcon} />
                      <span className="icon__fallback-text">Contact Us</span>
                    </Link>

                    <Link to="/cart" 
                      className="site-header__icon site-header__cart nav-cart_icon js-ajax-cart-drawer-trigger" 
                      aria-describedby="a11y-external-message"
                    >
                      <ReactSVG src={CartHeaderIcon} />
                      <span className="icon__fallback-text">Cart</span>

                      <div id="CartCount" className="site-header__cart-count">
                        <span data-cart-count="" data-count={quantity}>{quantity}</span>
                        <span className="icon__fallback-text medium-up--hide">items</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <MegaMenu />            
            <AnnoucmentBar />

          </header>
        
          <div id="sidenav" className="sidenav-outer">
            <div className="sidenav-modal">
              <div className="sidenav_search">
                <SearchDrawer />
              </div>

              <div className="sidenav-item_outer">
                <CardSlider />

                { commonData.mobileHeaderMenu.map((menuItem, menuIndex) => {                 
                  return (
                    <>
                      <Link to={`${menuItem.hasChildren ? '/fakeUrl' : menuItem.url}`} data-id={menuItem.title} data-url={menuItem.url}
                        // onClick={e => menuItem.hasChildren ? showChildCollection(e, menuItem.title) : hideSideNav }
                        onClick={e => menuClickHandler(e, menuItem.hasChildren, menuItem.title)}
                        className={`${menuItem.hasChildren ? 'hasChild' : ''} sidenav-item_inner first-level-item_inner`} key={menuIndex}>
                        <div className="sidenav-item_name">
                          <div className="sidenav-item_name-inner">
                            {menuItem.title}
                          </div>
                        </div>
                        <div className="sidenav-item_img">
                          <img src={menuItem.image} alt="" />
                        </div>
                      </Link>

                      {menuItem.hasChildren ? 
                      (
                        menuItem.childs.map((child_item, child_index) => {
                          return (
                            <Link to={child_item.url} style={{ display: 'none' }} 
                              data-parent-id={child_item.parent}
                              data-title={child_item.title} key={child_index}
                              onClick={hideSideNav}
                              className="sidenav-item_inner child-item" >
                              <div className="sidenav-item_name">
                                <div className="sidenav-item_name-inner">
                                  {child_item.title}
                                </div>
                              </div>
                              <div className="sidenav-item_img">
                                <img src={child_item.image} alt="" />
                              </div>
                            </Link>
                          )
                        })
                      ) : '' }
                    </>                    
                  )
                })}
        
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Header.propTypes = {
  path: PropTypes.string,
}

Header.defaultProps = {
  path: `/`,
}

export default Header
