import React, { useEffect, useState } from 'react'; /* eslint-disable */
import { graphql } from "gatsby";
import CollectionProductBox from "../components/collectionPage/collectionProductBox";
import CollectionPageSkeleton from "../components/collectionPage/collectionPageSkeleton";
import CollectionPageNonRoseSkeleton from "../components/collectionPage/collectionPageNonRoseSkeleton";
import SEO from "../components/common/seo"
import '../styles/collectionPage.scss';
import '../styles/widget.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

const CollectionPage = React.memo(function CollectionPage({
  data,
  pageContext
}) {
  const { productReviews, seoData } = pageContext;
  const [ displayProductCount, setDisplayProductCount ] = useState(16);
  const [ showContent, setShowContent ] = useState(false);
  const loadMoreProducts = (e) => {
    e.preventDefault();
    setDisplayProductCount(displayProductCount + 16);
  }

  useEffect(() => {
    const collectionDescription = document.querySelector('#collectionDescription');
    
    if (collectionDescription.offsetHeight < 46) {
      document.querySelector("#collectionReadMoreBtn").style.display = "none";
      document.querySelector("#collectionReadMoreFade_wrapper").style.display = "none";
    } else {
      document.querySelector("#collectionReadMoreBtn .fa-plus").style.display ='block';
      document.querySelector("#collectionReadMoreBtn .fa-minus").style.display ='none';
    }
    setHoverEffectsForCollection();
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2200);
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

  const hideContent = showContent ? '' : 'visibility-hidden';
  
  const handleKeyDown =(e) => {
    e.preventDefault();
  }

  const SkeletonUI = () => {
    const firstProduct = data.shopifyCollection.products.length > 0 ? data.shopifyCollection.products[0] : null;
		if (firstProduct) {
      const options = firstProduct.options ? firstProduct.options.filter(option => option.name === 'Rose Color') : []
		  return (options.length > 0 && options[0] !== '') ? <CollectionPageSkeleton /> : <CollectionPageNonRoseSkeleton />
    } else {
      return <CollectionPageNonRoseSkeleton />
    }
  }

  const displayedProducts = data.shopifyCollection.products.slice(0, displayProductCount)
  return (
    <>
      {/* <Preloader /> */}
      <SEO
        title={seoData.title === '' ? `${data.shopifyCollection.title} - Dose of Roses` : `${seoData.title} - Dose of Roses`}
        mainTitle={seoData.title === '' ? data.shopifyCollection.title : seoData.title}
        description={seoData.description === '' ? data.shopifyCollection.description : seoData.description}
        type="product.group"
      />
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
          {!showContent && <SkeletonUI />}
          <ul id="shop-all-content" 
            className={`products-on-page grid grid--uniform grid--view-items ${hideContent}`}>
              {
                displayedProducts.map((productItem, productIndex) => {
                  const productReview = productReviews.filter(pr => pr.handle === productItem.handle)
                  return <CollectionProductBox
                            product={productItem}
                            key={productIndex}
                            review={productReview[0]}
                            badgeStyles={data.allContentfulCollectionBadgeStyleItem.edges}
                          />
                })
              }
          </ul>
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
});

CollectionPage.displayName = 'CollectionPage';

export default CollectionPage;

export const query = graphql`
  query($id: String!){
		shopifyCollection(handle: {eq: $id}) {
			id
      handle
      title
      description
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
    allContentfulCollectionBadgeStyleItem {
      edges {
        node {
          name
          image {
            gatsbyImageData
            file {
              url
            }
          }
        }
      }
    }
	}
`
