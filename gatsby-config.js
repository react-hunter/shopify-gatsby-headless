require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Gatsby x Shopify`,
    description: `Simple theme to build a blazing simple and fast store with Gatsby and Shopify.`,
    author: `@alexislepresle`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-apollo-shopify`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        develop: true,
        purgeOnly: ['resources/css/'],
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        apiVersion: "2020-10",
        paginationSize: 5,
        includeCollections: ["shop", "content"]
      }
    },
    // {
    //   resolve: 'gatsby-source-shopify-admin',
    //   options: {
    //     storeName: process.env.SHOP_NAME,
    //     apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
    //     storefrontApiKey: null,
    //     onlyPublished: false, // only show products that are currently published on the 'publication' aka the private app
    //     pollInterval: 1000 * 10,
    //     imagesMetafields: {
    //       product: null,
    //       collection: null
    //     },
    //     relatedCollectionMetafields: null,
    //     verbose: false,
    //     restrictQueries: false, // Adds "(first: 1)" to collections query (then ONLY creates nodes for that collections product). Probably avoid using 'onlyPublished' at the same time, incase the 'first' collection returned isn't published on your sales channel (private app). This setting aims to help when builds are slow due to lots of images but you are happy to development with limited data; be warned this may create issues with data parity to Shopify (i.e. relatedCollectionMetafields would not have data if the selected collection isn't the 1 collection we have queried)
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-146773242-1",
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-shopify-theme`,
        short_name: `gatsby-shopify`,
        start_url: `/`,
        background_color: `#333`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `10179203510`,
        maxPosts: 10,
      },
    }
  ],
}
