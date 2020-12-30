import React from 'react' /* eslint-disable */
import { graphql } from "gatsby"
import ProductBox from "../components/ProductList/productBox"
import './collectionPage.css';

const collectionPage = ({ data }) => {
    
  const collectionShowMore = (e) => {
    console.log('submit arrive');
    e.preventDefault();
  }

  const collectionShowLess = (e) => {
    console.log('submit arrive');
    e.preventDefault();
  }

  const loadMoreProducts = (e) => {
    console.log('submit arrive');
    e.preventDefault();
  }
  return (
    <>
      <div id="shopify-section-collection-template" className="shopify-section">
        <div data-section-id="collection-template" data-section-type="collection-template">
          <header className="collection-header">
            <div className="page-width">
              <div className="section-header text-center">
                <h1>
                  <span className="visually-hidden" 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px' }}>Collection: </span>

                  <span className="goals-section-text" 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px' }}>{data.shopifyCollection.title}</span>
                  
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <span className="collection-page_underline"></span>
                  </span>
                </h1>
              </div>

              <div className="rte">
                <div id="collectionDescription"
                  data-acsb-original-letter-spacing-value="normal" 
                  style={{ letterSpacing: '2px' }}>

                  <div dangerouslySetInnerHTML={{__html: data.shopifyCollection.descriptionHtml}} />
                  <div id="collectionReadMore" 
                    onClick={collectionShowMore} 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px', display: 'block' }}>Read More</div>
                  <div id="collectionShowLess" 
                    onClick={collectionShowLess} 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px', display: 'none' }}>Show Less</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div className="" id="Collection">
          <ul id="shop-all-content" 
            className="products-on-page grid grid--uniform grid--view-items">
              {
                data.shopifyCollection.products.map((productItem, productIndex) => {
                  console.log(productItem);
                  return <ProductBox product={productItem} key={productIndex} />
                })
              }
          </ul>
          
        </div>

        <div className="load-more">
          <a className="load-more_btn" onClick={loadMoreProducts} 
            data-acsb-original-letter-spacing-value="normal" 
            style={{ letterSpacing: '2px' }}>LOAD MORE</a>
          <div className="load-more_loader"></div>
        </div>
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
        images {
          originalSrc
        }
        variants {
          id
          availableForSale
          price
        }
      }
    }
	}
`
