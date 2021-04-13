require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  flags: { 
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: process.env.NODE_ENV === 'development',
    DEV_SSR: process.env.NODE_ENV === 'development',
    PARALLEL_SOURCING: !(process.env.NODE_ENV === 'development'),
  },
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
        develop: process.env.NODE_ENV === 'development',
        purgeOnly: ['resources/css/', 'node_modules/gatsby-plugin-fontawesome-css/'],
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        apiVersion: '2021-04',
        paginationSize: 3,
        downloadImages: true,
        includeCollections: ['shop', 'content'],
        // shopifyQueries: {
        //   products: `
        //     query GetProducts($first: Int!, $after: String) {
        //       products(first: $first, after: $after) {
        //         pageInfo {
        //           hasNextPage
        //         }
        //         edges {
        //           cursor
        //           node {
        //             availableForSale
        //             createdAt
        //             description
        //             descriptionHtml
        //             handle
        //             id
        //             seo {
        //               title
        //               description
        //             }
        //           }
        //         }
        //       }
        //     }`
        // }
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
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "674420356308050",
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KDND8G7",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
        // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-131795175-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "dose-roses.com",
      },
    },
  ],
}
