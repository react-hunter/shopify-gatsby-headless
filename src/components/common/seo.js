import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const SEO = React.memo(function SEO(props) {
  const {
    description,
    lang,
    meta,
    title
  } = props;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  console.log('url: ', url)
  // const currentUrl = props.location;
  // const isDoseofrose = currentUrl.includes('doseofroses.com');
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        // {
        //   name: `facebook-domain-verification`,
        //   content: isDoseofrose ? `mw7ysgy9xz6mtfxtlu3zfxdytni45p` : `amuzhds1d539n8nbhnnl8a828vndzh`,
        // },
      ].concat(meta)}
    />
  )
});

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

SEO.displayName = 'SEO';

export default SEO;
