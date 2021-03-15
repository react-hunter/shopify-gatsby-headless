require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Gatsby x Shopify`,
    description: `Simple theme to build a blazing simple and fast store with Gatsby and Shopify.`,
    author: `@alexislepresle`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-layout`,
    `gatsby-transformer-ffmpeg`,
    `gatsby-plugin-gatsby-cloud`,
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
        purgeOnly: ['resources/css/', 'node_modules/gatsby-plugin-fontawesome-css/'],
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        apiVersion: "2021-01",
        paginationSize: 3,
        downloadImages: true,
        includeCollections: ["shop", "content"]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 50,
        useMozJpeg: true,

      },
    },
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
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `6i951l4zkbg4`,
        accessToken: `4sHDdzR4c01y0m9bnsreCxA2FFLyiq142RYnIE5qvtI`,
      },
    }
  ],
}
