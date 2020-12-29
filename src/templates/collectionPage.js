import React from 'react' /* eslint-disable */
import { graphql } from "gatsby"
import ProductBox from "../components/ProductList/productBox"
const collectionPage = ({ data }) => {
    
  return (
    <>
      <h2>{data.shopifyCollection.title}</h2>
      <div dangerouslySetInnerHTML={{__html: data.shopifyCollection.descriptionHtml}} />
      <div className="columns is-multiline">
        {
          data.shopifyCollection.products.map((productItem, productIndex) => {
            console.log(productItem);
            return <ProductBox product={productItem} key={productIndex} />
          })
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
