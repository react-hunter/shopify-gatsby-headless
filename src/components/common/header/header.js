import React, { useContext, useState, useEffect } from 'react'
import loadable from '@loadable/component';
import { Link, navigate } from 'gatsby'
import StoreContext from '../../../context/store'
import { ReactSVG } from 'react-svg';
import LogoIcon from '../../../images/icon-logo.svg';
import SearchHeaderIcon from '../../../images/icon-search-header.svg';
import LoginHeaderIcon from '../../../images/icon-login-header.svg';
import MessageIcon from '../../../images/icon-message.svg';
import CartHeaderIcon from '../../../images/icon-cart-header.svg';
import MyImage from '../lazyImage'

const CardSlider = loadable(() => import('./cardSlider'));
const SearchDrawer = loadable(() => import('./searchDrawer'));
const SiteNav = loadable(() => import('./siteNav'));
const AnnoucmentBar = loadable(() => import('./annoucmentBar'));

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

const Header = React.memo(function Header(props) {
  const context = useContext(StoreContext)
  const { checkout } = context.store
  const [quantity, setQuantity] = useState(countQuantity(checkout ? checkout.lineItems : []))
  const [ searchShow, setSearchShow ] = useState(false);
  const mobileHeaderMenu = props.mobileHeaderMenu;
  const announceList = props.announceList;
  const cardList = props.cardList;
  const desktopHeader = props.desktopHeader;
  let mobileMenuStep = 0;

  useEffect(() => {
    window.addEventListener('wheel', wheelHandler, {passive: true});
    return function cleanup() {
      window.removeEventListener('wheel', wheelHandler, {passive: true});
    }
  }, []);

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  function changehamburgMenuIcon() {
    let mobileToggleBtn = document.getElementById('mobile-mega-toggle');

    mobileToggleBtn.classList.remove("active");
    mobileToggleBtn.classList.remove("closeBtn");  
    mobileToggleBtn.classList.remove("backBtn");  

    if (mobileMenuStep === 0) { // not open step

    } else if (mobileMenuStep === 1) {  // menu opened

      mobileToggleBtn.classList.add("active");
      mobileToggleBtn.classList.remove("backBtn");  
      mobileToggleBtn.classList.add("closeBtn");  

    } else if (mobileMenuStep === 2) {   // child menu opened

      mobileToggleBtn.classList.add("active");
      mobileToggleBtn.classList.add("backBtn");
    }
  }
  
  const hideSideNav = (e) => {
    e.preventDefault();

    mobileMenuStep = 0;
    changehamburgMenuIcon();

    hideMobileMenuNav();
  }

  const clickToggleBtn = (e) => {
    e.preventDefault();

    if (mobileMenuStep === 0) {
      mobileMenuStep = 1;
    }
    else if (mobileMenuStep === 1) {
      mobileMenuStep = 0;
    }
    else if (mobileMenuStep === 2) {
      mobileMenuStep = 1;
    }
    
    changehamburgMenuIcon();

    if (mobileMenuStep === 0) {
      hideMobileMenuNav();
    }
    else if (mobileMenuStep === 1) {
      showDefaultMenuItems();

      document.getElementById('sidenav').style.display = "flex";
      document.getElementsByTagName("html")[0].classList.add("side-menu-scroll")

      initiateBannerSlider();
    }
    else if (mobileMenuStep === 2) {
    }
  }

  function hideMobileMenuNav() {
    document.getElementById('sidenav').style.display = "none";

    document.getElementsByTagName("html")[0].classList.remove("side-menu-scroll")
  }

  const showSearchBar = (e) => {
    e.preventDefault();
    setSearchShow(true)
  }

  const hideSearch = () => {
    setSearchShow(false)
  }

  function initiateBannerSlider() {
    if (runBannerAnimation === false) {
      runBannerAnimation = true;
    
      slides = document.getElementsByClassName("card-item");
      bannerContainer = document.getElementById("card-slider-container");
      bannerContainer.addEventListener('touchstart', handleTouchStart, {passive: true});
      bannerContainer.addEventListener('touchmove', handleTouchMove, {passive: true});
    
      showBanners();
    }
  }

  const showChildCollection = (e, id) => {
    e.preventDefault();

    mobileMenuStep = 2;
    changehamburgMenuIcon();

    //------------------- hide
    let allMenuItems = document.getElementsByClassName("menuItem");
    for (var i=0; i<allMenuItems.length; i++) {
      allMenuItems[i].style.display = 'none';
    }
    let allfirstLevelLinks = document.getElementsByClassName("sidenav-item_inner");
    for (i=0; i<allfirstLevelLinks.length; i++) {
      allfirstLevelLinks[i].style.display = 'none';
    }
    
    // -------------------- show
    let needShowMenuItems = document.querySelectorAll(`[data-show-parent-id='${id}']`);
    needShowMenuItems[0].style.display = 'flex';
    needShowMenuItems[0].classList.add("showChild");

    let needChildMenuLink = document.querySelectorAll(`[data-parent-id='${id}']`);
    for (var j=0; j<needChildMenuLink.length; j++) {
      needChildMenuLink[j].style.display = 'flex';
    }
  }

  const menuClickHandler = (e, hasChild, title) => {
    if(hasChild) {
      showChildCollection(e, title)
    } else {
      hideSideNav(e);
      navigate(e.target.closest('a').dataset.url);
    }
  }

  function showDefaultMenuItems () {

    // ---------- hide
    let allItems = document.getElementsByClassName("sidenav-item_inner");
    for (var i=0; i<allItems.length; i++) {
      allItems[i].style.display = 'none';
    }

    let previousParientItems = document.getElementsByClassName("showChild");
    for (i=0; i<previousParientItems.length; i++) {
      previousParientItems[i].classList.remove('showChild');
    }

    // ---------- whow
    let allMenuItems = document.getElementsByClassName("menuItem");
    for (i=0; i<allMenuItems.length; i++) {
      allMenuItems[i].style.display = 'flex';
    }

    let needShowItems = document.getElementsByClassName("first-level-item_inner");
    for (var j=0; j<needShowItems.length; j++) {
      needShowItems[j].style.display = 'flex';
    }
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
  

  function wheelHandler(e) {
    let header = document.querySelector(".stickyHeader");
    let currentScrollpos = window.pageYOffset;
    if (e.deltaY > 0) {
      if (currentScrollpos >= 5) {
        header.style.top = "-200px";
      }
    } else {
      header.style.top = "0";
    }
  }

  const openSlideCart = (e) => {
    e.preventDefault();
    //fetchCart();w
    openCartDrawer();
    openCartOverlay();
  };

  function openCartDrawer() {
    document.querySelector(".js-ajax-cart-drawer").classList.add('is-open');
    document.getElementsByTagName("html")[0].classList.add("cart-drawer-open");
  }
  
  function openCartOverlay() {
    document.querySelector(".js-ajax-cart-overlay").classList.add('is-open');
    document.documentElement.classList.add('is-locked');
  }

  return (
    <>
      
      <div id="shopify-section-header" className="shopify-section">
        <div id="stickyHeader" className="stickyHeader">
          <header className="site-header logo--center" role="banner">
            {
              searchShow ? 
                (
                  <SearchDrawer hideSearch={hideSearch} />
                ) : null
            }
            <div className="main-header site-header__mobile-nav">
              <SiteNav desktopHeader={desktopHeader} />
              
              <button className="header-drawer-toggle" id="mobile-mega-toggle" onClick={clickToggleBtn} 
                aria-controls="MobileNav" aria-expanded="false" aria-label="Menu">
                <span className="header-drawer-toggle__icon" aria-hidden="true"></span>
                <span className="visually-hidden">Navigation menu</span>
              </button>

              {/* <a href="/fakeUrl" id="goBackNavMenu" 
                style={{ fontFamily: "monospace", cursor: "pointer" }} 
                onClick={showDefaultMenuItems} key="gobacknavmenu">
                &lt;
              </a> */}

              <div className="header_logo-container" key="logocontainer">
                <h1 className="h2 site-header__logo">
                  <Link to="/" className="site-header__logo-image site-header__logo-image--centered">
                    <ReactSVG src={LogoIcon} />
                  </Link>
                </h1>
              </div>
            
              <div className="header_icons-wrapper" key="headericons">
                <div className="text-right site-header__icons site-header__icons--plus">
                  <div className="site-header__icons-wrapper">
                    <a href="/fakeUrl" onClick={showSearchBar} type="button" 
                      className="btn--link site-header__icon site-header__search-toggle js-drawer-open-top">
              
                      <ReactSVG src={SearchHeaderIcon} />
                      <span className="icon__fallback-text">Search</span>
                    </a>

                    <Link to="/account/login" className="site-header__icon site-header__account" key="login">
                      <ReactSVG src={LoginHeaderIcon} />
                      <span className="icon__fallback-text">Log in</span>
                    </Link>
              
                    <Link to="/pages/contactus" className="site-header__icon site-header__account nav-message_icon" key="contactus">
                      <ReactSVG src={MessageIcon} />
                      <span className="icon__fallback-text">Contact Us</span>
                    </Link>

                    <Link to="/cart" 
                      onClick={openSlideCart}
                      className="site-header__icon site-header__cart nav-cart_icon js-ajax-cart-drawer-trigger" 
                      aria-describedby="a11y-external-message"  key="cart"
                    >
                      <ReactSVG src={CartHeaderIcon} />
                      <span className="icon__fallback-text">Cart</span>

                      <div id="CartCount" className="site-header__cart-count">
                        <span data-cart-count="" data-count={quantity} key="cartcount">{quantity}</span>
                        <span className="icon__fallback-text medium-up--hide" key="items">items</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>   
            <AnnoucmentBar announceList={announceList} />
          </header>
          <div id="sidenav" className="sidenav-outer">
            <div className="sidenav-modal">
              <div className="sidenav_search" key="sidenav_search">
                <SearchDrawer />
              </div>

              <div className="sidenav-item_outer" key="sidenav-item_outer">
                <CardSlider key="card-slider" cardList={cardList} />
                { mobileHeaderMenu.map((menuItem, menuIndex) => {                 
                  return (
                    <div className={`menuItem ${menuItem.hasChildren ? 'hasChild' : ''}`} 
                      data-show-parent-id={menuItem.title} key={menuIndex}>    

                      <Link key={`menuItem-${menuIndex}`} to={`${menuItem.hasChildren ? '/fakeUrl' : menuItem.url}`} data-id={menuItem.title}
                        onClick={e => menuClickHandler(e, menuItem.hasChildren, menuItem.title)} data-url={menuItem.url}
                        className={`${menuItem.hasChildren ? 'hasChild' : ''} sidenav-item_inner first-level-item_inner`}>
                        <div className="sidenav-item_name" key={`itemname-${menuIndex}`}>
                          <div className="sidenav-item_name-inner">
                            {menuItem.title}
                          </div>
                        </div>
                        <div className="sidenav-item_img" key={`itemimg-${menuIndex}`}>
                          <MyImage src={menuItem.image.fluid.srcWebp} className="" alt="" />
                        </div>
                      </Link>

                      {menuItem.hasChildren ? 
                      (
                        menuItem.mobileHeaderMenuItemChild.map((child_item, child_index) => {
                          return (
                            <Link to={child_item.url} style={{ display: 'none' }} 
                              data-parent-id={child_item.parentText}
                              data-title={child_item.title} key={`child-${menuIndex}-${child_index}`}
                              onClick={hideSideNav}
                              className="sidenav-item_inner child-item" >
                              <div className="sidenav-item_name" key={`childitemname-${menuIndex}-${child_index}`}>
                                <div className="sidenav-item_name-inner">
                                  {child_item.title}
                                </div>
                              </div>
                              <div className="sidenav-item_img" key={`childitemimg-${menuIndex}-${child_index}`}>
                                <MyImage src={child_item.image.fluid.srcWebp} className="" alt="" />
                              </div>
                            </Link>
                          )
                        })
                      ) : '' }
                    </div>                    
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
});

export default Header
