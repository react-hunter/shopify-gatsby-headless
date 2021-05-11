const path = require(`path`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const featuredCollectionHandles = ["rose-bear", "galaxy", "persuede", "marbleous", "leather", "bloom-box", "tie-dye", "24k-gold-dipped-roses", "lingerie"];
// const featuredCollectionHandles = ["best-sellers", "new", "third-collection"];
const Shopify = require('shopify-api-node')
const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
  password: process.env.SHOPIFY_ADMIN_API_PASSWORD,
  timeout: 100000,
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
    let productReview = {
      handle: pr.handle,
      data: {
        reviewCount: 0,
        reviewAverageValue: ''
      },
      features: ''
    }
    metafields.map(mf => {
      if(mf.namespace === 'okendo' && mf.key === 'summaryData') {
        productReview.data = JSON.parse(mf.value);
      }
      if(mf.namespace === 'product' && mf.key==='features') {
        productReview.features = mf.value
      }
    });
    return productReview
  }))

  let collectionList = new Array(0);
  params = { limit: 30, fields: ['id', 'handle'] };
  do {
    const collectionListPiece = await shopify.customCollection.list(params);
    collectionList.push(...collectionListPiece)
    params = collectionListPiece.nextPageParameters;
  } while (params !== undefined);
  params = { limit: 30, fields: ['id', 'handle'] };
  do {
    const collectionListPiece = await shopify.smartCollection.list(params);
    collectionList.push(...collectionListPiece)
    params = collectionListPiece.nextPageParameters;
  } while (params !== undefined);

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
  `).then(async (result) => {
    await Promise.all(result.data.allShopifyProduct.edges.map(async ({ node }) => {
      const productHandle = node.handle;
      const productId = products.filter(pr => pr.handle === productHandle)[0].id
      const productMetafield = await shopify.metafield.list({metafield: {owner_resource: 'product', owner_id: productId}})
      let productSeo = {
        title: '',
        description: ''
      };
      
      productMetafield.map(mf => {
        if(mf.namespace === 'global' && mf.key === 'title_tag') {
          productSeo.title = mf.value;
        }
        if(mf.namespace === 'global' && mf.key==='description_tag') {
          productSeo.description = mf.value
        }
      })
      
      try {
        createPage({
          path: `/products/${productHandle}/`,
          component: path.resolve(`./src/templates/productPage.js`),
          context: {
            id: productHandle,
            productReviews: productReviews,
            seoData: productSeo
          },
        })
      } catch (error) {
        console.log('product create error: ', productHandle)
      }
    }))
    result.data.allShopifyArticle.edges.map(({ node }) => {
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
    await Promise.all(result.data.allShopifyCollection.edges.map(async ({ node }) => {
      const collectionHandle = node.handle
      const collectionId = collectionList.filter(col => col.handle === collectionHandle)[0].id
      const collectionMetafield = await shopify.metafield.list({metafield: {owner_resource: 'collection', owner_id: collectionId}})
      let collectionSeo = {
        title: '',
        description: ''
      };
      
      collectionMetafield.map(mf => {
        if(mf.namespace === 'global' && mf.key === 'title_tag') {
          collectionSeo.title = mf.value;
        }
        if(mf.namespace === 'global' && mf.key==='description_tag') {
          collectionSeo.description = mf.value
        }
      })
      
      try {
        await createPage({
          path: `/collections/${collectionHandle}/`,
          component: path.resolve(`./src/templates/collectionPage.js`),
          context: {
            id: collectionHandle,
            productReviews: productReviews,
            seoData: collectionSeo
          },
        })        
      } catch (error) {
        console.log('collection create error: ', collectionHandle)
      }
    }))
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

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false
    });
  } else {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
    })
  }
};