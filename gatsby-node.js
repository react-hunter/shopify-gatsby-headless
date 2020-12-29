const path = require(`path`)

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
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}
