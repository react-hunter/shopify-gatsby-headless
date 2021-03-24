import React, { useEffect, useState } from 'react'; /* eslint-disable */
import { graphql } from "gatsby";
import CollectionProductBox from "../components/collectionPage/collectionProductBox";
import CollectionPageSkeleton from "../components/collectionPage/collectionPageSkeleton";
import { client } from '../contentful';
import '../styles/collectionPage.scss';
import '../styles/widget.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

const collectionPage = ({ data, pageContext }) => {
  const { productReviews } = pageContext;
  const [ displayProductCount, setDisplayProductCount ] = useState(16);
  const [ showContent, setShowContent ] = useState(false);
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
      document.querySelector("#collectionReadMoreBtn .fa-plus").style.display ='block';
      document.querySelector("#collectionReadMoreBtn .fa-minus").style.display ='none';
    }
    setHoverEffectsForCollection();
    getBadgeData();
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timer);
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

      document.querySelector("#collectionReadMoreBtn .fa-plus").style.display ='none';
      document.querySelector("#collectionReadMoreBtn .fa-minus").style.display ='block';
      showAll = true;
    } else {
      document.querySelector('#collectionDescription').style.maxHeight = '50px';
      document.querySelector("#collectionReadMoreFade_wrapper").style.display = "block";

      document.querySelector("#collectionReadMoreBtn .fa-plus").style.display ='block';
      document.querySelector("#collectionReadMoreBtn .fa-minus").style.display ='none';
      showAll = false;
    }
  }

  const handleKeyDown =(e) => {
    e.preventDefault();
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
                    <FontAwesomeIcon className="fa-icon fa-plus" icon={faPlus} size="1x" style={{}} />
                    <FontAwesomeIcon className="fa-icon fa-minus" icon={faMinus} size="1x" style={{}} />
                </div>
              </div>
              <span className="filters-toolbar__product-count" ></span>
            </div>
          </header>
        </div>
        
        <div className="" id="Collection">
          {showContent ? (
            <ul id="shop-all-content" 
              className="products-on-page grid grid--uniform grid--view-items">
                {
                  displayedProducts.map((productItem, productIndex) => {
                    const productReview = productReviews.filter(pr => pr.handle === productItem.handle)
                    return <CollectionProductBox 
                              product={productItem} 
                              key={productIndex} 
                              review={productReview[0]}
                              badgeStyles={badgeStyles}
                              placeholderImage={data.placeholderImage.childImageSharp.gatsbyImageData}  />
                  })
                }
            </ul>              
            ) : <CollectionPageSkeleton />
          }
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
        productType
        options {
          id
          name
          values
        }
        images {
          originalSrc
          imageData: localFile {
            childImageSharp {
              gatsbyImageData (
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                layout: CONSTRAINED
              )
            }
          }
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
            imageData: localFile {
              childImageSharp {
                gatsbyImageData (
                  width: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  layout: CONSTRAINED
                )
              }
            }
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    placeholderImage: file(relativePath: { regex: "/placeholder_500x.png/" }) {
      childImageSharp {
        gatsbyImageData (
          width: 500
          placeholder: BLURRED
          formats: [AUTO, WEBP]
          layout: CONSTRAINED
        )
      }
    }
	}
`
