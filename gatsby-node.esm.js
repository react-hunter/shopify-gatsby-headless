const path = require(`path`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const featuredCollectionHandles = ["rose-bear", "galaxy", "persuede", "marbleous", "leather", "bloom-box", "tie-dye", "24k-gold-dipped-roses", "lingerie"];
const Shopify = require('shopify-api-node')
const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
  password: process.env.SHOPIFY_ADMIN_API_PASSWORD,
  timeout: 50000,
  autoLimit: {
      calls: 2,
      interval: 2000,
      bucketSize: 35
  }
});

let productReviews = []

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  let products = new Array(0);
  let params = { limit: 30, fields: ['id', 'handle'] };
  do {
    const productListPiece = await shopify.product.list(params);
    products.push(...productListPiece)
    params = productListPiece.nextPageParameters;
  } while (params !== undefined);
  
  productReviews = await Promise.all(products.map(async pr => {
    const metafields = await shopify.metafield.list({metafield: {owner_resource: 'product', owner_id: pr.id}});
    let productReview = {}
    metafields.map(mf => {
      productReview.handle = pr.handle
      if(mf.namespace === 'stamped') {
        switch (mf.key) {
          case 'badge':
            productReview.badge = mf.value
          case 'reviews_count':
            productReview.reviews_count = mf.value
        }
      }
      if(mf.namespace === 'product' && mf.key==='features') {
        productReview.features = mf.value
      }

    })
    productReview.badge = productReview.badge ? productReview.badge : ''
    productReview.reviews_count = productReview.reviews_count ? parseInt(productReview.reviews_count) : 0
    productReview.features = productReview.features ? productReview.features : ''
    return productReview
  }))

  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyArticle {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      const id = node.handle
      try {
        createPage({
          path: `/products/${id}/`,
          component: path.resolve(`./src/templates/productPage.js`),
          context: {
            id,
            productReviews: productReviews
          },
        })
      } catch (error) {
        console.log('product create error: ', id)
      }
    })
    result.data.allShopifyArticle.edges.forEach(({ node }) => {
      const articleId = node.handle
      try {
        createPage({
          path: `/article/${articleId}/`,
          component: path.resolve(`./src/templates/articlePage.js`),
          context: {
            id: articleId,
          },
        })        
      } catch (error) {
        console.log('article page create error: ', articleId)
      }
    })
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const collectionId = node.handle
      try {
        createPage({
          path: `/collections/${collectionId}/`,
          component: path.resolve(`./src/templates/collectionPage.js`),
          context: {
            id: collectionId,
            productReviews: productReviews
          },
        })        
      } catch (error) {
        console.log('collection create error: ', collectionId)
      }
    })
    try {
      createPage({
        path: `/pages/collections`,
        component: path.resolve(`./src/templates/featuredCollectionsPage.js`),
        context: {
          collections: featuredCollectionHandles,
          productReviews: productReviews
        },
      })      
    } catch (error) {
      console.log('collection create error: ', error)
    }
    try {
      createPage({
        path: `/search`,
        component: path.resolve(`./src/templates/searchPage.js`),
        context: {
          productReviews: productReviews
        },
      })      
    } catch (error) {
      console.log('search page create error: ', error)
    }
    try {
      createPage({
        path: `/pages/customize`,
        component: path.resolve(`./src/templates/customizePage.js`),
        context: {
        },
      })      
    } catch (error) {
      console.log('customize page create error: ', error)
    }   
    
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}
