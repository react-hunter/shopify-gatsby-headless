/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// const removejscssfile = (filename, filetype) => {
//   var targetelement=(filetype==="js")? "script" : (filetype==="css")? "link" : "none" //determine element type to create nodelist from
//   var targetattr=(filetype==="js")? "src" : (filetype==="css")? "href" : "none" //determine corresponding attribute to test for
//   var allsuspects=document.getElementsByTagName(targetelement)
//   for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
//     if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!==-1)
//       allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
//   }
// }
// const addScript = url => {
//   console.log('add snapchat');
//   const script = document.createElement("script")
//   script.src = url
//   script.async = true
//   script.setAttribute("data-for-url", true);
//   document.body.appendChild(script)
// }

/* const addScriptHead = url => {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.async = true;
  script.id = "stamped-script-widget";
  script.setAttribute("data-api-key", "pubkey-76rP6Zq8e371uFqgk0DjXju08d2ACm");
  head.appendChild(script);
}

export const onClientEntry = () => {
  window.onload = () => {
    addScriptHead("https://cdn-stamped-io.azureedge.net/files/widget.min.js")
  }
} */

// export const onPreRouteUpdate = ({ location }) => {
//   var currentPath = location.pathname;
//   if(currentPath.includes('/products/') || 
//     currentPath.includes('/collections/') || 
//     currentPath.includes('pages/collections') || 
//     currentPath.includes('/search')) {
//       removejscssfile("https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=NDbw2r&shop=dose-of-roses.myshopify.com", "js")
//       addScript("https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=NDbw2r&shop=dose-of-roses.myshopify.com")
//   }
// }

// export const onPreRouteUpdate = () => {
//   removejscssfile("./src/scripts/snapchat.js", "js");
//   addScript("./src/scripts/snapchat.js");
// }