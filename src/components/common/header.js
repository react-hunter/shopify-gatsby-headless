import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import StoreContext from '../../context/store'
import { ReactSVG } from 'react-svg';
import LogoIcon from '../../images/icon-logo.svg';
import HamburgerIcon from '../../images/icon-hamburger.svg';
import CloseIcon from '../../images/icon-close.svg';
import SearchIcon from '../../images/icon-search.svg';
import SearchHeaderIcon from '../../images/icon-search-header.svg';
import LoginHeaderIcon from '../../images/icon-login-header.svg';
import MessageIcon from '../../images/icon-message.svg';
import CartHeaderIcon from '../../images/icon-cart-header.svg';
import { commonData } from '../../data/common';
import './header.css';

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
  
  const letterSpacing2Style = {
    letterSpacing: '2px'
  }

  const letterSpacing3Style = {
    letterSpacing: '3px'
  }

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const showSideNav = (e) => {
    console.log('show sidenav');
    e.preventDefault();
  }
  
  const hideSideNav = (e) => {
    console.log('hide sidenav');
    e.preventDefault();
  }

  const showSearchBar = (e) => {
    console.log('show search bar');
    e.preventDefault();
  }

  const hideSearch = (e) => {
    console.log('hide search');
    e.preventDefault();
  }
  
  const showDefaultMenuItems = (e) => {
    console.log('show default menu items');
    e.preventDefault();
  }

  return (
    <>
      <div id="shopify-section-header" className="shopify-section">
        <div className="stickyHeader" data-section-id="header" data-section-type="header-section" data-header-section="">
          <header className="site-header logo--center" role="banner">
            <div id="SearchDrawer" 
              className="search-bar drawer drawer--top" 
              role="dialog" 
              aria-modal="true" aria-label="Search" data-predictive-search-drawer="">

              <div className="search-bar__interior">
                <div className="search-form__container" data-search-form-container="">
                  <form className="search-form search-bar__form" action="/search" method="get" role="search">
                    <div className="search-form__input-wrapper">
                      <input type="text" name="q" placeholder="Search"
                        role="combobox" aria-autocomplete="list"
                        aria-owns="predictive-search-results"
                        aria-expanded="false"
                        aria-label="Search"
                        aria-haspopup="listbox"
                        aria-controls=".predictive-search-wrapper"
                        className="search-form__input search-bar__input"
                        data-predictive-search-drawer-input="" />

                      <input type="hidden" name="options[prefix]" value="last" aria-hidden="true" />
                      <div className="predictive-search-wrapper predictive-search-wrapper--drawer" 
                        data-predictive-search-mount="drawer"></div>
                    </div>

                    <button className="search-bar__submit search-form__submit" type="submit" data-search-form-submit="">
                      <ReactSVG src={SearchIcon} />
                      <span className="icon__fallback-text"
                        data-acsb-original-letter-spacing-value="normal" 
                        style={letterSpacing2Style}>Submit</span>
                    </button>
                  </form>

                  <div className="search-bar__actions">
                    <button onClick={hideSearch} type="button" className="btn--link search-bar__close js-drawer-close">
                      <ReactSVG src={CloseIcon} />
                      <span className="icon__fallback-text" 
                        data-acsb-original-letter-spacing-value="normal" 
                        style={letterSpacing2Style}>Close search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="main-header site-header__mobile-nav">
              <nav className="small--hide border-bottom" id="AccessibleNav" role="navigation">
                <ul className="site-nav list--inline site-nav--centered" id="SiteNav">  
                  { commonData.desktopHeaderMenu.map((menuItem, menuIndex) => 
                    <li key={menuIndex}>
                      <Link id={menuItem.id} to={menuItem.link} className="site-nav__link site-nav__link--main">
                        <span className="site-nav__label" 
                          data-acsb-original-letter-spacing-value="1px" 
                          style={letterSpacing3Style}>{menuItem.title}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
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
                style={{ fontFamily: "monospace", cursor: "pointer", letterSpacing: "2px" }} 
                onClick={showDefaultMenuItems} data-acsb-original-letter-spacing-value="normal"
              >
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
                    <a href="/fakeUrl" onClick={showSearchBar} type="button" className="btn--link site-header__icon site-header__search-toggle js-drawer-open-top">
              
                      <ReactSVG src={SearchHeaderIcon} />
                      <span className="icon__fallback-text" 
                        data-acsb-original-letter-spacing-value="normal" 
                        style={letterSpacing2Style}>Search</span>
                    </a>

                    <Link to="/account/login" className="site-header__icon site-header__account">
                      <ReactSVG src={LoginHeaderIcon} />
                      <span className="icon__fallback-text" data-acsb-original-letter-spacing-value="normal" style={letterSpacing2Style}>Log in</span>
                    </Link>
              
                    <Link to="/pages/contact-us" className="site-header__icon site-header__account nav-message_icon">
                      <ReactSVG src={MessageIcon} />
                      <span className="icon__fallback-text" data-acsb-original-letter-spacing-value="normal" style={letterSpacing2Style}>Log in</span>
                    </Link>

                    <Link to="/cart" 
                      className="site-header__icon site-header__cart nav-cart_icon js-ajax-cart-drawer-trigger" 
                      aria-describedby="a11y-external-message"
                    >
                      <ReactSVG src={CartHeaderIcon} />
                      <span className="icon__fallback-text" data-acsb-original-letter-spacing-value="normal" style={letterSpacing2Style}>Cart</span>

                      <div id="CartCount" className="site-header__cart-count" data-cart-count-bubble="">
                        <span data-cart-count="" data-count={quantity} data-acsb-original-letter-spacing-value="normal" style={letterSpacing2Style}>{quantity}</span>
                        <span className="icon__fallback-text medium-up--hide" data-acsb-original-letter-spacing-value="normal" style={letterSpacing2Style}>items</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="menu-category-panel">
              <div className="menu-panel" id="BestSellers">
                <div className="menu-panel_image_wrapper">
                </div> 
              </div>
              <div className="menu-panel" id="NewArrivals">
                <div className="menu-panel_image_wrapper">
                </div> 
              </div>
              <div className="menu-panel" id="Occasions">
                <div className="menu-panel_image_wrapper">      
                </div> 
              </div>
            </div>
            
          </header>
        
          <div id="sidenav" className="sidenav-outer">
            <div className="sidenav-modal">
              <div className="sidenav_search">
                <div id="SearchDrawer" className="search-bar drawer drawer--top" role="dialog" aria-modal="true" aria-label="Search" data-predictive-search-drawer="">
                  <div className="search-bar__interior">
                    <div className="search-form__container" data-search-form-container="">
                      <form className="search-form search-bar__form" action="/search" method="get" role="search">
                        <div className="search-form__input-wrapper">
                          <input type="text" name="q" 
                            placeholder="Search" role="combobox" 
                            aria-autocomplete="list" 
                            aria-owns="predictive-search-results"
                            aria-controls="predictive-search-wrapper"
                            aria-expanded="false" 
                            aria-label="Search" 
                            aria-haspopup="listbox" 
                            className="search-form__input search-bar__input" 
                            data-predictive-search-drawer-input="" />
                          <input type="hidden" name="options[prefix]" value="last" aria-hidden="true" />
                          <div className="predictive-search-wrapper predictive-search-wrapper--drawer" 
                            data-predictive-search-mount="drawer"></div>
                        </div>

                        <button className="search-bar__submit search-form__submit" type="submit" data-search-form-submit="">
                          <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 37 40"><path d="M35.6 36l-9.8-9.8c4.1-5.4 3.6-13.2-1.3-18.1-5.4-5.4-14.2-5.4-19.7 0-5.4 5.4-5.4 14.2 0 19.7 2.6 2.6 6.1 4.1 9.8 4.1 3 0 5.9-1 8.3-2.8l9.8 9.8c.4.4.9.6 1.4.6s1-.2 1.4-.6c.9-.9.9-2.1.1-2.9zm-20.9-8.2c-2.6 0-5.1-1-7-2.9-3.9-3.9-3.9-10.1 0-14C9.6 9 12.2 8 14.7 8s5.1 1 7 2.9c3.9 3.9 3.9 10.1 0 14-1.9 1.9-4.4 2.9-7 2.9z"></path></svg>
                          <span className="icon__fallback-text" 
                            data-acsb-original-letter-spacing-value="normal" 
                            style={ letterSpacing2Style }>Submit</span>
                        </button>
                      </form>

                      <div className="search-bar__actions">
                        <button onClick={hideSearch} type="button" className="btn--link search-bar__close js-drawer-close">
                          <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-close" viewBox="0 0 40 40"><path d="M23.868 20.015L39.117 4.78c1.11-1.108 1.11-2.77 0-3.877-1.109-1.108-2.773-1.108-3.882 0L19.986 16.137 4.737.904C3.628-.204 1.965-.204.856.904c-1.11 1.108-1.11 2.77 0 3.877l15.249 15.234L.855 35.248c-1.108 1.108-1.108 2.77 0 3.877.555.554 1.248.831 1.942.831s1.386-.277 1.94-.83l15.25-15.234 15.248 15.233c.555.554 1.248.831 1.941.831s1.387-.277 1.941-.83c1.11-1.109 1.11-2.77 0-3.878L23.868 20.015z" className="layer"></path></svg>
                          <span className="icon__fallback-text" 
                            data-acsb-original-letter-spacing-value="normal" 
                            style={ letterSpacing2Style }>Close search</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidenav-item_outer">
                <div id="card-slider-container" className="card-slider-container">
                  <div className="slider-stack">
                    <div className="card-wrapper">

                      { commonData.mobileHeaderCards.map((menuItem, menuIndex) => 
                      <div className="card-item" key={menuIndex}>
                        {
                          (menuItem.link.includes('http://') || menuItem.link.includes('https://')) ? (
                            <a href={menuItem.link} aria-describedby="a11y-external-message">
                              <div style={{ width: "100%" }}>
                                <img src={menuItem.image} alt="" />
                              </div>
                            </a>
                          ) : (
                            <Link to={menuItem.link} aria-describedby="a11y-external-message">
                              <div style={{ width: "100%" }}>
                                <img src={menuItem.image} alt="" />
                              </div>
                            </Link>
                          )
                        }
                      </div>
                      )}

                    </div>
                  </div>
                </div>

                { commonData.mobileHeaderMenu.map((menuItem, menuIndex) => 
                  <Link to={menuItem.url} 
                    className="sidenav-item_inner" key={menuIndex}>
                    <div className="sidenav-item_name">
                      <div className="sidenav-item_name-inner" 
                        data-acsb-original-letter-spacing-value="normal" 
                        style={letterSpacing2Style}>
                        {menuItem.title}
                      </div>
                    </div>
                    <div className="sidenav-item_img">
                      <img src={menuItem.image} alt="" />
                    </div>
                  </Link>
                )}
        
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
