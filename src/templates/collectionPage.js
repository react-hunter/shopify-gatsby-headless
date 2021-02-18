import React, { useEffect, useState } from 'react' /* eslint-disable */
import { graphql } from "gatsby"
import loadable from '@loadable/component';
import CollectionProductBox from "../components/collectionPage/collectionProductBox"
import { client } from '../contentful'
import '../styles/collectionPage.scss';
import '../styles/widget.min.css';
const NotifyModal = loadable(() => import('../components/collectionPage/notifyModal'))

const collectionPage = ({ data, pageContext }) => {
  const { productReviews } = pageContext;
  const [ displayProductCount, setDisplayProductCount ] = useState(16);
  const [notifyModalShow, setNotifyModalShow] = useState(false);
  const [badgeStyles, setBadgeStyles] = useState([]);
  const loadMoreProducts = (e) => {
    e.preventDefault();
    setDisplayProductCount(displayProductCount + 16);
  }

  useEffect(() => {
    async function getBadgeData() {
      const badgeStyleData = await client.getEntries({'content_type': 'collectionBadgeStyleItem'});
      setBadgeStyles(badgeStyleData.items);
    }
    const collectionDescription = document.querySelector('#collectionDescription');
    
    if (collectionDescription.offsetHeight < 46) {
      document.querySelector("#collectionReadMoreBtn").style.display = "none";
      document.querySelector("#collectionReadMoreFade_wrapper").style.display = "none";
    } else {
      document.querySelector("#collectionReadMoreBtn").innerHTML = 'Read More';
    }
    setHoverEffectsForCollection();
    getBadgeData();
  }, [])

  function setHoverEffectsForCollection() {

    const allFirstImageElements = document.querySelectorAll(".disableSaveImageIOS");
    for (let i = 0; i < allFirstImageElements.length; i++) {
  
      $(allFirstImageElements[i]).on('touchstart', function () {  
        $(this).toggleClass('hover_effect');
      }, {passive: true});
  
    }
  }

  let showAll = false;

  const showAllContent =(e) => {
    e.preventDefault();
    
    if (showAll === false) {
      document.querySelector('#collectionDescription').style.maxHeight = 'unset';
      document.querySelector("#collectionReadMoreFade_wrapper").style.display = "none";
      document.querySelector("#collectionReadMoreBtn").innerHTML = 'Read Less';
      showAll = true;
    } else {
      document.querySelector('#collectionDescription').style.maxHeight = '50px';
      document.querySelector("#collectionReadMoreFade_wrapper").style.display = "block";
      document.querySelector("#collectionReadMoreBtn").innerHTML = 'Read More';
      showAll = false;
    }
  }

  const handleKeyDown =(e) => {
    e.preventDefault();
  }

  const showNotifyModal = () => {
    setNotifyModalShow(true)
  }

  const closeNotifyModal = () => {
    document.querySelector(".klav-popup").classList.remove("fade-in");
    document.querySelector(".klav-popup").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".klav-popup").classList.remove("fade-out");
        setNotifyModalShow(false);
    }, 500)
  }

  const displayedProducts = data.shopifyCollection.products.slice(0, displayProductCount)
  return (
    <>
      {/* <Preloader /> */}
      <div id="shopify-section-collection-template" className="shopify-section">
        <div data-section-id="collection-template" data-section-type="collection-template">
          <header className="collection-header">
            <div className="page-width">
              <div className="section-header text-center">
                <h1>
                  <span className="visually-hidden">Collection: </span>

                  <span className="goals-section-text">{data.shopifyCollection.title}</span>
                  
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <span className="collection-page_underline"></span>
                  </span>
                </h1>
              </div>

              <div className="rte">
                <div id="collectionDescription">
                  <div dangerouslySetInnerHTML={{__html: data.shopifyCollection.descriptionHtml}} />
                </div>
                <div id="collectionReadMoreFade_wrapper">
                  <div id="collectionReadMoreFade">
                  </div>
                </div>
                <div id="collectionReadMoreBtn" style={{ textAlign: 'center', cursor: 'pointer'}}                  
                  onClick={showAllContent} onKeyDown={handleKeyDown} role="button" tabIndex="0">
                </div>
              </div>

              <span className="filters-toolbar__product-count" ></span>
            </div>
          </header>
        </div>
        
        <div className="" id="Collection">
          <ul id="shop-all-content" 
            className="products-on-page grid grid--uniform grid--view-items">
              {
                displayedProducts.map((productItem, productIndex) => {
                  const productReview = productReviews.filter(pr => pr.handle === productItem.handle)
                  return <CollectionProductBox collection={data.shopifyCollection} product={productItem} key={productIndex} review={productReview[0]} showNotifyModal={showNotifyModal} badgeStyles={badgeStyles} />
                })
              }
          </ul>
          <NotifyModal closeModal={closeNotifyModal} modalShow={notifyModalShow} />
        </div>
        
        {
          displayProductCount < data.shopifyCollection.products.length ? (
            <div className="load-more">
              <a className="load-more_btn" onClick={loadMoreProducts}>LOAD MORE</a>
              <div className="load-more_loader"></div>
            </div>
          ) : null
        }
      </div>
      
    </>
  )
}

export default collectionPage

export const query = graphql`
  query($id: String!){
		shopifyCollection(handle: {eq: $id}) {
			id
      handle
      title
      descriptionHtml
      products {
        id
        handle
        title
        tags
        options {
          id
          name
          values
        }
        images {
          originalSrc
        }
        variants {
          id
          title
          availableForSale
          price
          shopifyId
          compareAtPrice
          image {
            originalSrc
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
	}
`
