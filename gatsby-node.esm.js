const path = require(`path`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const featuredCollectionHandles = ["new", "third-collection"];
const Shopify = require('shopify-api-node')
const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
  password: process.env.SHOPIFY_ADMIN_API_PASSWORD
});
let productReviews = []

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const products = await shopify.product.list();
  productReviews = await Promise.all(products.map(async pr => {
    const metafields = await shopify.metafield.list({metafield: {owner_resource: 'product', owner_id: pr.id}});
    if (metafields[0]) {
      return {
        handle: pr.handle,
        reviews: metafields[0].value,
        badge: metafields[1].value,
        reviews_count: parseInt(metafields[2].value),
        reviews_average: parseFloat(metafields[3].value)
      }
    } else {
      return {
        handle: pr.handle,
        reviews: '',
        badge: '',
        reviews_count: 0,
        reviews_average: 0
      }
    }
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
      createPage({
        path: `/products/${id}/`,
        component: path.resolve(`./src/templates/productPage.js`),
        context: {
          id,
          productReviews: productReviews
        },
      })
    })
    result.data.allShopifyArticle.edges.forEach(({ node }) => {
      const articleId = node.handle
      createPage({
        path: `/article/${articleId}/`,
        component: path.resolve(`./src/templates/articlePage.js`),
        context: {
          id: articleId,
        },
      })
    })
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      const collectionId = node.handle
      createPage({
        path: `/collections/${collectionId}/`,
        component: path.resolve(`./src/templates/collectionPage.js`),
        context: {
          id: collectionId,
          productReviews: productReviews
        },
      })
    })
    createPage({
      path: `/pages/collections`,
      component: path.resolve(`./src/templates/featuredCollectionsPage.js`),
      context: {
        collections: featuredCollectionHandles,
        productReviews: productReviews
      },
    })
    createPage({
      path: `/pages/create`,
      component: path.resolve(`./src/templates/createPage.js`),
      context: {
      },
    })
    createPage({
      path: `/pages/customize`,
      component: path.resolve(`./src/templates/customizePage.js`),
      context: {
      },
    })
    createPage({
      path: `/pages/contact-us`,
      component: path.resolve(`./src/templates/contactusPage.js`),
      context: {
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}
