/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const addScript = url => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
}

export const onClientEntry = () => {
  window.onload = () => {
    const currentUrl = window.location.href;
    if(currentUrl.includes('/product/')) {
      addScript("//foursixty.com/media/scripts/fs.slider.v2.5.js")
    } else {
      addScript("//foursixty.com/media/scripts/fs.embed.v2.5.js")
    }
  }
}