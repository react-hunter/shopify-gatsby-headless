/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const removejscssfile = (filename, filetype) => {
    var targetelement=(filetype==="js")? "script" : (filetype==="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype==="js")? "src" : (filetype==="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!==-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
const addScript = url => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
}

export const onPreRouteUpdate = () => {
  const currentUrl = window.location.href;
  if(currentUrl.includes('/product/')) {
    removejscssfile("//foursixty.com/media/scripts/fs.slider.v2.5.js", "js")
    addScript("//foursixty.com/media/scripts/fs.slider.v2.5.js")
  } else {
    removejscssfile("//foursixty.com/media/scripts/fs.embed.v2.5.js", "js")
    addScript("//foursixty.com/media/scripts/fs.embed.v2.5.js")
  }
}