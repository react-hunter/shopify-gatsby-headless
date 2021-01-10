import React from 'react';
import { ReactSVG } from 'react-svg';
import SearchIcon from '../../../images/icon-search.svg';
import CloseIcon from '../../../images/icon-close.svg';

const SearchDrawer = ( props ) => {
    const hideSearch = (e) => {
      e.preventDefault();
      props.hideSearch();
    }

    return (
        <>
          <div id="SearchDrawer" className="search-bar drawer drawer--top">
            <div className="search-bar__interior">
              <div className="search-form__container" data-search-form-container="">
                <form className="search-form search-bar__form" action="/search" method="get" role="search">
                  <div className="search-form__input-wrapper">
                    <input type="text" name="q" placeholder="Search"
                      aria-label="Search"
                      className="search-form__input search-bar__input" />
                  </div>

                  <button className="search-bar__submit search-form__submit" type="submit">
                    <ReactSVG src={SearchIcon} />
                    <span className="icon__fallback-text">Submit</span>
                  </button>
                </form>

                <div className="search-bar__actions">
                  <button onClick={hideSearch} type="button" className="btn--link search-bar__close js-drawer-close">
                    <ReactSVG src={CloseIcon} />
                    <span className="icon__fallback-text">Close search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default SearchDrawer