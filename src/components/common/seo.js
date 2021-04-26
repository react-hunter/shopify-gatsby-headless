import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const SEO = React.memo(function SEO(props) {
  const {
    description,
    lang,
    title,
    mainTitle,
    type,
  } = props;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const isDoseofroses = currentUrl.includes('doseofroses.com');
  const isDose_roses = currentUrl.includes('dose-roses.com');
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
          name: `og:site_name`,
          content: `Dose of Roses`,
        },
        {
          name: `og:url`,
          content: currentUrl,
        },
        {
          property: `og:title`,
          content: mainTitle,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: mainTitle,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: `facebook-domain-verification`,
          content: isDoseofroses ? `mw7ysgy9xz6mtfxtlu3zfxdytni45p` : isDose_roses ? `amuzhds1d539n8nbhnnl8a828vndzh` : '',
        },
      ]}
    />
  )
});

SEO.defaultProps = {
  lang: `en`,
  title: ``,
  description: ``,
  type: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string,
  mainTitle: PropTypes.string.isRequired,
  type: PropTypes.string,
}

SEO.displayName = 'SEO';

export default SEO;
