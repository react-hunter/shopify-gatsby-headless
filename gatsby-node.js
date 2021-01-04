const path = require(`path`)
const featuredCollectionHandles = ["new", "third-collection"];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
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
        path: `/product/${id}/`,
        component: path.resolve(`./src/templates/productPage.js`),
        context: {
          id,
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
        path: `/collection/${collectionId}/`,
        component: path.resolve(`./src/templates/collectionPage.js`),
        context: {
          id: collectionId,
        },
      })
    })
    createPage({
      path: `/collections`,
      component: path.resolve(`./src/templates/featuredCollectionsPage.js`),
      context: {
        collections: featuredCollectionHandles,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}
