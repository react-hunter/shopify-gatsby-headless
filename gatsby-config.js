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
        includeCollections: ['shop', 'content']
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
      },
    },
    // {
    //   resolve: 'gatsby-plugin-load-script',
    //   options: {
    //     src: 'https://sc-static.net/scevent.min.js',
    //     crossorigin: 'anonymous',
    //     onLoad: `() => {
    //       snaptr('init', '71a99375-a469-4098-9c78-604a676001cc', {
    //         'user_email': '__INSERT_USER_EMAIL__'
    //       });
    //       snaptr('track', 'PAGE_VIEW');
    //     }`,
    //   },
    // },
  ],
}
