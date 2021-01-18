import React, { useEffect, useContext } from 'react';
import { graphql } from 'gatsby'
import { customizePageData } from '../data/customizePage' 
import Preloader from "../components/common/preloader"
import StoreContext from '../context/store'

const CustomizePage = ({ data }) => {
  const context = useContext(StoreContext);
  const collectionProducts = data.shopifyCollection.products.map(pr => {
    const productVariants = pr.variants.map(va => {
      return {
        id: va.shopifyId,
        title: va.title,
        option1: va.selectedOptions[0].value,
        option2: va.selectedOptions[1].value,
        requires_shipping: va.requiresShipping,
        featured_image: null,
        available: va.availableForSale,
        options: [va.selectedOptions[0].value, va.selectedOptions[1].value],
        price: va.price
      }
    })
    const productImages = pr.images.map(pi => {
      return pi.originalSrc ? pi.originalSrc : ''
    })
    const productOptionNames = pr.options.map(po => {
      return po.name
    })
    return {
      id: pr.shopifyId,
      title: pr.title,
      handle: pr.handle,
      available: pr.availableForSale,
      variants: productVariants,
      images: productImages,
      featured_image: pr.images[0] ? pr.images[0].originalSrc : '',
      options: productOptionNames
    }
  })
  
  var allProducts;
  var selectedProduct;
  var currentStep = 0;
  var selections = [];
  var selectedRoses = [];
  var selectedRosesLine = [];
  var selectedStyle;
  let selectedProductBoxStock;

  var isShare = false;

  useEffect(() => {
    setAllProduct();

    var arrTypes = document.getElementById("arrangementSelector-0");

    for (var i = 0; i < allProducts.length; i++) {
      var product = allProducts[i];

      var arrangment = document.createElement("div");
      arrangment.setAttribute("class", "arr-type-box")
      arrangment.setAttribute("data-productId", `${product.productId}`)
      arrangment.setAttribute("id", `${product.Arrangement.replace(" ", "-")}`)
      arrangment.innerHTML = `<span>${product.Arrangement}</span>`;
      arrTypes.appendChild(arrangment)
    }

    let needShowItems = document.querySelectorAll('#arrangementSelector-0 .arr-type-box');
    for (var j=0; j<needShowItems.length; j++ ) {
      needShowItems[j].addEventListener("click", function(e){
        selectArrangement(this.getAttribute('data-productid'));
      });
    }
    
    isShareLink();
    mobileRearrange()
    window.addEventListener('scroll', stickyFunction);
    window.onresize = function () { mobileRearrange() }

    return function cleanup() {
      window.removeEventListener('scroll', stickyFunction);
    }
  })

  const selectArrangement = (id) => {
    for (var i = 0; i < allProducts.length; i++) {
      var product = allProducts[i];
      if (product.productId === id) {
        setSelectedProduct(product);
        if (!document.getElementById("arr-Type")) {
          addArrangementBlock("ARRANGEMENT", "arr-Type", product.Arrangement, product.subtext, "0")
        } else {
          document.getElementById("arr-Type").innerText = product.Arrangement;
          document.getElementById("sub-text").innerText = product.subtext;
        }
  
        if (document.getElementById(`${product.Arrangement}-product`)) {
          product = JSON.parse(document.getElementById(`${product.Arrangement}-product`).dataset.json)
          selectedProductBoxStock = product;
          if (product.featured_image) {
            document.getElementById("mainIMG").src = product.featured_image;
          }
        }
  
        let needShowItems = document.querySelectorAll('#arrangementSelector-0 .arr-type-box');
        
        for (var k=0; k<needShowItems.length; k++ ) {
          var innerDivId = needShowItems[k].getAttribute('data-productid');

          if (id === innerDivId) {
            needShowItems[k].style.backgroundColor = "#000000";
            needShowItems[k].children[0].style.color = '#ffffff';
          } else {
            needShowItems[k].children[0].style.color = '#000000';
            needShowItems[k].style.backgroundColor =  "#ffffff ";
          }
        }
        break;
      }
    }
  }

  // function scanJSONForSoldOut(json) {

  // }

  function setAllProduct() {
    allProducts = customizePageData.products;
  }

  function setSelectedProduct(product) {
    selectedProduct = product;
  }

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  function isShareLink(){
    if (window.location.href.includes("&")) {
      isShare = true;
      var point = window.location.href.toString().split("?")[1]
      var args = point.split("&");
      for (var i = 0; i < args.length; i++) {
        var arg = args[i].split("-").join(" ");
        var testarg = '';
        if (arg.indexOf(" ") > 0) {
          testarg = setCharAt(arg, arg.indexOf(" "), '-')
          if (testarg.includes("Letter-")) {
            eventFire(document.getElementById("Letters"), 'click')
          } else if (testarg.includes("Number-")) {
            eventFire(document.getElementById("Numbers"), 'click')
          }
        } else {
          testarg = arg
        }
  
        if (testarg.includes("+")) {
          var roses = testarg.split("+")
          var rose1 = document.getElementById(roses[0].replace("-", " ") + "-0");
          var rose2 = document.getElementById(roses[1].replace("-", " ") + "-1");
  
          if (rose1) {
            eventFire(rose1, 'click')
            eventFire(rose1, 'click')  
          }
  
          if (rose2) {
  
            eventFire(rose2, 'click')
            eventFire(rose2, 'click')
          }
        } else if (document.getElementById(testarg)) {
          eventFire(document.getElementById(testarg), 'click')
          if (currentStep < selectedProduct.maxOptions) {
            eventFire(document.getElementById(`step-next`), 'click')
          }
        } else {
          if (document.getElementById(testarg + "-0") && !testarg.includes("+")) {
            isShare = false;
            eventFire(document.getElementById(testarg.replace("-", " ") + "-0"), 'click')
            eventFire(document.getElementById(testarg.replace("-", " ") + "-0"), 'click')
          }
        }
      }
      isShare = false;
      if (rose1 && rose2) {
        eventFire(rose2, 'click')
      }
    } else if (window.location.href.includes("?") && !window.location.href.includes("&")) {
      var select = window.location.href.split("?")[1].split("-");
      var click = select.join(" ").replace(" ", "-")
      
      if (document.getElementById(click)) {
        eventFire(document.getElementById(click), 'click');

        if (document.getElementById('step-next'))
          eventFire(document.getElementById('step-next'), 'click')
      }
    } else {
      eventFire(document.getElementById("arrangementSelector-0").firstElementChild, 'click')
    }
  }

  function mobileRearrange() {
    if (window.innerWidth <= 700) {
//      document.getElementById("col-left").insertAfter(document.getElementById("col-right"), null);
    } else {
//      document.getElementById("col-left").insertBefore(document.querySelector(".arrangement-center"), null);
    }
  }

  function stickyFunction(){

  }
  
  function nextStep() {
    currentStep = currentStep + 1;
  
    if (document.getElementById(`arrangementSelector-${currentStep}`)) {
      document.getElementById(`arrangementSelector-${currentStep}`).style.display = "block"
    }
  }

  function addArrangementBlock(heading, subtype, subheading, tagline, step) {
    var container = document.getElementById("col-left");
    var statusBlock = document.createElement("div");
    statusBlock.setAttribute("class", `statusBox`)
    statusBlock.setAttribute("id", `statbox-${currentStep}`)
    if (subtype === "price-Type") {
      statusBlock.innerHTML = `<h5 style="font-weight: bold;">${heading}:</h5> <h5 style="font-size: 1rem; text-transform: capitalize;" id="${subtype}">${subheading}</h5> <span id="sub-text">${tagline}</span>`;
  
    } else {
      statusBlock.innerHTML = `<h5 class="statusBox-edit" data-step="${step}">Edit</h5> <h5 style="font-weight: bold;">${heading}:</h5> <h5 style="font-size: 1rem; text-transform: capitalize;" id="${subtype}">${subheading}</h5> <span id="sub-text">${tagline}</span>`;
  
    }
    container.appendChild(statusBlock);

    const statusBoxElement = document.querySelectorAll(".statusBox-edit");
    for (var i=0;i< statusBoxElement.length;i++) {
      statusBoxElement[i].addEventListener("click", function(e){
        revert(parseInt(this.getAttribute('data-step')));
      });
    }
  }
  
  function revert(step) {
    document.getElementById("addToBAG").style.display = "none"
    document.getElementsByClassName("step-next")[0].style.display = "block"
  
    let colRightItems = document.getElementById("col-right").children;
    for (var i =0; i< colRightItems.length; i++) {
      colRightItems[i].style.display = 'none';
    }

    setStep(step);
    var step2 = selectedProduct.options[currentStep - 1];
    var title = '';

    if (!step2) {
      title = "Choose Arrangement";
    } else {
      title = step2.option;
    }
  
    document.getElementById("arrangementSelector_title").innerHTML = title
    document.getElementById(`arrangementSelector-${step}`).style.display = "block";
  }

  function setBox(title, src, element) {
    var images = document.getElementsByClassName("box-contents")[0].getElementsByClassName("box");
  
    for (var i = 0; i < images.length; i++) {
      images[i].style.boxShadow = "";
    }
  
    element.style.boxShadow = "0px 0px 0px 4px rgba(0,0,0,1)"
  
    document.getElementById("mainIMG").src = src;
  
    if (!document.getElementById("BOX-Type")) {
      addArrangementBlock("BOX", "BOX-Type", title, "", `${currentStep}`)
    } else {
      document.getElementById("BOX-Type").innerHTML = title;
    }
  
    addSelection(currentStep, title)
    getFirstVariantBasePrice();
    document.getElementById("mobile-arr-type").innerText = selections[0]
  }
  
  function setStyle(title, style) {
  
    if (!document.getElementById("Style-Type")) {
      addArrangementBlock("Style", "Style-Type", title, "", `${currentStep}`)
    } else {
      document.getElementById("Style-Type").innerHTML = title;
    }
  
    addSelection(currentStep, title)
    getMainImage();
    var styles = document.getElementById(`arrangementSelector-${currentStep}`).children;
  
    for (var i = 0; i < styles.length; i++) {
      if (styles[i].id !== `${title}`) {
        styles[i].style.background = "#ffffff"
        styles[i].firstElementChild.style.color = "#000000"
      } else {
        styles[i].style.background = "#000000"
        styles[i].firstElementChild.style.color = "#FFFFFF"
      }
    }
  
    if (title === "Letters") {
      document.getElementById(`arrangementSelector-${currentStep}`).style.display = "none";
      document.getElementById(`arrangementSelector-Letters`).style.display = "block";
      eventFire(document.getElementById("Letter-A"), 'click')
    }
  
    if (title === "Numbers") {
      document.getElementById(`arrangementSelector-${currentStep}`).style.display = "none";
      document.getElementById(`arrangementSelector-Numbers`).style.display = "block";
      eventFire(document.getElementById("Number-0"), 'click')
    }
  
    updatePrice()
  }

  function setStep(step) {
    currentStep = Number(step);
  }

  function getFirstVariantBasePrice() {
    var json = JSON.parse(document.getElementById(`${selectedProduct.Arrangement}`).dataset.json)
  
    for (var i = 0; i < json.length; i++) {
      if (json[i].title === `${selections[1]} / Box`) {
        if (!document.getElementById("price-Type")) {
          addArrangementBlock("Price", "price-Type", `$${json[i].price / 100}`, "", currentStep)
        } else {
          document.getElementById("price-Type").innerText = `$${json[i].price / 100}`;
  
        }
        document.getElementById("mobile-arr-price-span").innerText = `$${json[i].price / 100}`
      }
    }
  }

  function updatePrice() {
    var json = JSON.parse(document.getElementById(`${selectedProduct.Arrangement}`).dataset.json);
    var choice = [];
    for (var i = 1; i < selections.length; i++) {
      choice.push(selections[i])
    }
  
    for (var j = 0; j < json.length; j++) {
      var element = json[j];
      if (choice.join(",") === element.title.replace(" \/ ", ",")) {
  
        if (!document.getElementById("price-Type")) {
          addArrangementBlock("Price", "price-Type", `$${element.price / 100}`, "", currentStep)
        } else {
          document.getElementById("price-Type").innerText = `$${element.price / 100}`;
  
        }
        document.getElementById("mobile-arr-price-span").innerText = `$${element.price / 100}`
        break;
      }
    }
  }

  function addSelection(position, data) {
    selections[position] = data
  }

  function eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  function getMainImage() {
    if (document.getElementById("Style-Type").innerText !== "Letters" || document.getElementById("Style-Type").innerText !== "Numbers") {
      resetNumbersAndLetter();
      var xhr = new XMLHttpRequest();
  
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          document.getElementById("mainIMG").src = `${this.responseText}`
        }
      });
  
      var style;
      if (document.getElementById("Style-Type").innerText === "Letters") {
        style = "Letter-A"
      } else if (document.getElementById("Style-Type").innerText === "Numbers") {
        style = "Number-0"
      } else {
        style = document.getElementById("Style-Type").innerText;
      }
      var collection = [];
      var backup1 = ["Red"]
      var backup2 = ["Red", "Pink"]
  
      if (selectedRoses.length === 0) {
        if (style === "Solid") {
          selectedRoses = backup1;
          collection = backup1.join(",")
        } else {
          selectedRoses = backup2;
          collection = backup2.join(",")
        }
      } 
      else {
        if (style === "Solid") {
          if (selectedRoses.length > 1) {
            collection.push(selectedRoses[0]);
          } else {
            collection = selectedRoses.join(",")
          }
        } else {
          if (selectedRoses.length === 1) {
            selectedRoses.push(backup2[1]);
            collection = selectedRoses.join(",")
          } else {
            collection = selectedRoses.join(",")
          }
        }
      }
      
      if (!isShare) {
        xhr.open("GET", `https://mediacarryapi.com/dor/generator?store=dose-roses.com&product=${selectedProduct.Arrangement}&style=${style}&data=${collection}`);
        xhr.send();
      }
    }
  }
  
  function resetNumbersAndLetter() {
    var styles = document.getElementsByClassName("numberChoice");
  
    for (var i = 0; i < styles.length; i++) {
      styles[i].style.background = "#ffffff"
      styles[i].firstElementChild.style.color = "#000000"
    }
  
    var Letterstyles = document.getElementsByClassName("letterChoice");
  
    for (var j = 0; j < Letterstyles.length; j++) {
      Letterstyles[j].style.background = "#ffffff"
      Letterstyles[j].firstElementChild.style.color = "#000000"
    }
  }

  const handleKeyDown = (e) => {
    e.preventDefault();
  }

  const hideLetters = (e) => {
    e.preventDefault();
    
    document.getElementById(`arrangementSelector-${currentStep}`).style.display = "block";
    document.getElementById(`arrangementSelector-Letters`).style.display = "none";
  }

  function movePrice() {
    if (document.getElementById("price-Type")) {
      var price = document.getElementById("price-Type").parentElement;
      document.getElementById("col-left").appendChild(price);
    }
  }

  function generateBoxSelector() {
    var container = document.createElement("div");
    container.setAttribute("id", `arrangementSelector-${currentStep}`);

    var subDiv = document.createElement("div");
    subDiv.setAttribute("class", "box-contents");
    subDiv.setAttribute("style", "margin-top: 10px;")
  
    var boxes = selectedProduct["boxes"];
    for (var i = 0; i < boxes.length; i++) {
      const boxTitle = boxes[i].title;
      let result = selectedProductBoxStock.variants.filter(variant => variant.option1 === boxTitle)[0];
      var box = document.createElement("img");
  
      box.src = boxes[i].src;
      box.setAttribute('title', `${boxes[i].title}`)
      box.setAttribute('id', `${boxes[i].title.replace(" ", "-")}`)
      if (result.available !== false) {
        box.addEventListener("click", function(e){
          setBox(this.getAttribute('title'), this.getAttribute('src') ,this);
        });

        box.setAttribute("class", "box");
      } else {
        box.setAttribute("class", "boxSoldOut");
      }
  
      subDiv.appendChild(box)
    }
  
    container.appendChild(subDiv);
  
    if (!document.getElementById(`arrangementSelector-${currentStep}`)) {
      document.getElementById("col-right").appendChild(container)
    } else {
      document.getElementById(`arrangementSelector-${currentStep}`).remove()
      document.getElementById("col-right").appendChild(container)
    }
  
    if (subDiv) {
      let firstAvailable = subDiv.querySelectorAll(".box")[0];
      eventFire(firstAvailable, 'click')
      firstAvailable.style.boxShadow = "#000000 0px 0px 0px 4px"
    }
  }

  function generateStyleSelector() {
    var container = document.createElement("div");
  
    container.setAttribute("id", "arrangementSelector-" + currentStep);
    container.setAttribute("class", "arrangement-container  style-container")
    container.setAttribute("style", "margin-top: 10px;")
  
    var styles = selectedProduct["styles"];
  
    for (var i = 0; i < styles.length; i++) {
      if (!styles[i].style.includes("Letter-") && !styles[i].style.includes("Number-")) {
        var style = document.createElement("div");
        style.setAttribute("class", "arrangement-pattern")
        style.setAttribute("id", `${styles[i].style.replace(" ", "-")}`)
        style.setAttribute("data-style", `${styles[i].style}`)
        style.setAttribute("data-preview", `${styles[i].preview}`)
        style.setAttribute("data-roseCounts", `${styles[i].roseTypes}`)

        style.addEventListener("click", function(e){
          setStyle(this.getAttribute('data-style'));
        });
  
        style.innerHTML = `<span className="arrangement-pattern_title styleOption" id="StyleText-${styles[i].style}">${styles[i].style}</span>`
        container.appendChild(style);
      }
    }
  
    if (!document.getElementById(`arrangementSelector-${currentStep}`)) {
      document.getElementById("col-right").appendChild(container)
    } else {
      document.getElementById(`arrangementSelector-${currentStep}`).remove()
      document.getElementById("col-right").appendChild(container)
    }
  
    if (document.getElementsByClassName("style-container")[0].children.length === 1) {
      eventFire(document.getElementsByClassName("style-container")[0].firstElementChild, 'click')
      eventFire(document.getElementById(`step-next`), 'click')
    } else {
      if (selectedStyle) {
        if (hasStyle(selectedStyle.style)) {
          if (selectedStyle.style.includes("Letter")) {
            eventFire(document.getElementById("Letters"), 'click')
          } else if (selectedStyle.style.includes("Number")) {
            eventFire(document.getElementById("Numbers"), 'click')
          }
          eventFire(document.getElementById(selectedStyle.style), 'click')
        } else {
          eventFire(document.getElementsByClassName("style-container")[0].firstElementChild, 'click')
        }
      } else {
        eventFire(document.getElementsByClassName("style-container")[0].firstElementChild, 'click')
      }
    }
  }

  function generateRosesSelector() {
    if (document.getElementById("arrangementSelector-" + currentStep)) {
      document.getElementById("arrangementSelector-" + currentStep).remove();
      // resetRoseSelections()
    }
  
    var container = document.createElement("div");
  
    container.setAttribute("id", "arrangementSelector-" + currentStep);
    container.setAttribute("class", "arrangement-container")
    container.setAttribute("style", "margin-top: 10px;")
    var subDiv = document.createElement("div");
    subDiv.setAttribute("class", "rose-contents");
  
    var roses = selectedProduct["roses"];
    var styles = selectedProduct["styles"];
  
    for (var k = 0; k < styles.length; k++) {
      if (document.getElementById("Style-Type").innerText === styles[k].style) {
        setSelectedStyle(styles[k])
      }
    }
  
    var rosesCount = selectedStyle.roseTypes;
    for (var i = 0; i < rosesCount; i++) {
      var header = document.createElement("div")
      header.setAttribute("class", "rosechoice-header")
      header.innerHTML = `<span> Rose ${i + 1} Color</span>`;
      subDiv.appendChild(header);
  
      var roseblock = document.createElement("div")
      roseblock.setAttribute("id", `roseblock-${i}`)
  
      for (var j = 0; j < roses.length; j++) {
        if (roses[j].soldOut !== true) {
          var rose = document.createElement("img");
          rose.setAttribute("class", "round");
          rose.setAttribute("id", roses[j].rose + "-" + i)
          rose.src = roses[j].src;
          rose.setAttribute('title', `${roses[j].rose}`)
          rose.setAttribute('index', `${i}`);
          rose.addEventListener("click", function(e){
            setRose(this.getAttribute('title'), this, parseInt(this.getAttribute('index')));
          });
          
          if (roses[j].rose === "Galaxy") {
            if (selectedStyle.style === "Solid") {
              roseblock.appendChild(rose)
            }
          } else {
            roseblock.appendChild(rose)
          }
        }
      }
      subDiv.appendChild(roseblock)
    }
    container.appendChild(subDiv);
  
    if (!document.getElementById(`arrangementSelector-${currentStep}`)) {
      document.getElementById("col-right").appendChild(container)
    } else {
      document.getElementById(`arrangementSelector-${currentStep}`).remove()
      document.getElementById("col-right").appendChild(container)
    }
  
    var count = container.firstElementChild.children.length / 2;
  
    if (count < selectedRoses.length) {
      resetRoseSelections();
    }
  
    if (!isShare) {
      for (var ii = 0; ii < 100; ii++) {
        if (document.getElementById("roseblock-" + ii)) {
          if (count === selectedRoses.length) {
            eventFire(document.getElementById(selectedRoses[ii] + "-" + ii), 'click')
          } else {
            eventFire(document.getElementById("roseblock-" + ii).firstElementChild, 'click')
            document.getElementById("roseblock-" + ii).firstElementChild.style.boxShadow = "#000000 0px 0px 0px 4px"
          }
  
        } else {
          break;
        }
      }
    }
  }

  function addRoseSelectionLine(position, data) {
    selectedRosesLine[position] = data
  }

  function addRoseSelection(position, data) {
    selectedRoses[position] = data
  }

  function isProductNotUsingStencil(productId) {
    if (document.querySelector("#excluded_products")) {
      let excludedProducts = JSON.parse(document.querySelector("#excluded_products").dataset.ids);
      for (let i = 0; i < excludedProducts.length; i++) {
        if (excludedProducts[i] === productId) {
          return true;
        }
      }
    }
    return false;
  }
  

  function setRose(type, element, layer) {
    var images = document.getElementById(`roseblock-${layer}`).getElementsByClassName("round");
  
    for (var i = 0; i < images.length; i++) {
      images[i].style.boxShadow = "";
    }
  
    element.style.boxShadow = "0px 0px 0px 4px rgba(0,0,0,1)"
    addRoseSelectionLine(layer, selectedStyle["layer" + layer] + " x " + type)
    addRoseSelection(layer, type);

    var newLayer = layer + 1;


    document.getElementById(`rose-mobile-${newLayer}`).innerText = type;
    
    if (selectedStyle.roseTypes === selectedRoses.length) {
  
      var choices = selectedRoses.join(",");
  
      let productId = Number(document.getElementById(document.getElementById("arr-Type").innerHTML).classList[0].split("-")[0]);
      //Check if product is using drawn stencil
      let usingStencil = isProductNotUsingStencil(productId);
      
      if(usingStencil === true){
        let arrangement_selected = document.getElementById("arr-Type").innerHTML.replaceAll(' ', "_");
        let box_selected = document.getElementById('BOX-Type').innerHTML.replaceAll(' ', "_");
        let style_selected = document.getElementById('Style-Type').innerHTML.replaceAll(' ', "_");
        let imageToDisplay = `${arrangement_selected}-${box_selected}-${style_selected}-${choices}`;
        
        document.getElementById("mainIMG").src = `https://ik.imagekit.io/vajwlqjsrw/customizer-images/${imageToDisplay}.jpg`
      }else{
        var xhr = new XMLHttpRequest();
  
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            document.getElementById("mainIMG").src = `${this.responseText}`
          }
        });
        if (!isShare) {
          xhr.open("GET", `https://mediacarryapi.com/dor/generator?store=dose-roses.com&product=${selectedProduct.Arrangement}&style=${document.getElementById("Style-Type").innerText}&data=${choices}`);
          xhr.send();
        }
      }
  
      if (!document.getElementById("Rose-Type")) {
        addArrangementBlock("Rose Colors", "Rose-Type", selectedRoses.join(" + "), "", `${currentStep}`)
      } else {
        document.getElementById("Rose-Type").innerHTML = selectedRoses.join(" + ");
      }
      addSelection(currentStep, selectedRoses.join("+"))
      movePrice();
  
      var selectString = selections.join("&")
      if (isShare === false) {
        ChangeUrl("Arrangement", window.location.origin + "/pages/customize?" + selectString.split(" ").join("-"))
      }  
    }
  }

  
  function resetRoseSelections() {
    selectedRosesLine = []
    selectedRoses = [];
  }

  function setSelectedStyle(style) {
    selectedStyle = style;
  }

  function hasStyle(StyleName) {
    var styles = selectedProduct.styles;
    var contains = false;
    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      if (style.style === StyleName) {
        contains = true;
        break;
      }
    }
  
    if (contains === true) {
      return true;
    } else {
      return false;
    }
  }

  function ChangeUrl(title, url) {
    if (typeof (window.history.pushState) != "undefined") {
      var obj = { Title: title, Url: url };
      window.history.pushState(obj, obj.Title, obj.Url);
    } else {
      alert("Browser does not support HTML5.");
    }
  }

  function resetSelections() {
    selections = [];
    var i = 1;
    do {
      if (document.getElementById(`statbox-${i}`)) {
        document.getElementById(`statbox-${i}`).remove();
      }
      i++;
    } while (document.getElementById(`statbox-${i}`));
  }

  const previous = () => {
    if (currentStep - 1 !== -1) {
      if (currentStep - 1 === selectedProduct.maxOptions) {
        document.getElementById("addToBAG").style.display = "none"
        document.getElementsByClassName("step-next")[0].style.display = "block"
      }
      revert(currentStep - 1)
    }
  }

  const next = () => {
    if (selections[0]) {
      if (!selections[0].includes(selectedProduct.Arrangement)) {
        resetSelections();
      }
  
    }
    if (currentStep === 0) {
      addSelection(currentStep, selectedProduct.Arrangement)
    }
  
    if (selections.length === currentStep + 1 || selections.length > currentStep + 1) {
  
      let colRightItems = document.getElementById("col-right").children;
      for (var i =0; i< colRightItems.length; i++) {
        colRightItems[i].style.display = 'none';
      }

      var options = selectedProduct.options;
  
      if (currentStep + 1 === selectedProduct.maxOptions) {
        nextStep();
        document.getElementById("addToBAG").style.display = "block"
        document.getElementsByClassName("step-next")[0].style.display = "none"
      } else {
        nextStep();
      }
  
      if (currentStep - 1 === selectedProduct.maxOptions) {
        // document.getElementById("addToBAG").style.display = "block"
        // document.getElementsByClassName("step-next")[0].style.display = "none"
      } else {
        var step = options[currentStep - 1];
        if (step.option.toLowerCase().includes("box")) {
  
          generateBoxSelector();
  
        } else if (step.option.toLowerCase().includes("style")) {
          updatePrice();
          generateStyleSelector()
        } else if (step.option.toLowerCase().includes("rose")) {
          updatePrice();
          generateRosesSelector();
        }
      }
  
      let title = currentStep === 0 ? "Choose Arrangement" : step.option;
  
      document.getElementById("arrangementSelector_title").innerHTML = title
      if (currentStep > 1) {
        document.getElementById("mobile-arr-type").innerText = selections[0] + " / " + selections[1]
        document.getElementById("mobile-panel").classList.remove("sticky-hide");
      }
  
      if (selectedStyle) {
        if (selectedStyle.roseTypes !== 2) {
          document.getElementById("rose-mobile-2").parentElement.style.display = "none";
        } else {
          document.getElementById("rose-mobile-2").parentElement.style.display = "block ";
        }
      }
  
  
    } else {
      alert("Please make your selection frist")
    }
  
    movePrice();
  
    var selectString = selections.join("&")
    if (isShare === false) {
      ChangeUrl("Arrangement", window.location.origin + "/pages/customize?" + selectString.split(" ").join("-"))
    }
  }

  const AddToBag = () => {
    const bagProduct = collectionProducts.filter(cp => cp.title === selections[0])
    const bagVariants = bagProduct[0].variants
    let bagVariant = null
    for(var i = 0; i < bagVariants.length; i++) {
      if(bagVariants[i].options[0] === selections[1] && bagVariants[i].options[1] === selections[2]) {
        bagVariant = bagVariants[i]
        break
      }
    }
    context.addVariantToCart(bagVariant.id, 1, [
      {key: 'Rose Color', value: selections[3]},
      {key: 'Box', value: selections[1]},
      {key: 'Style', value: selections[2]},
      {key: 'linkImage', value: 'https://mediacarryapi.com/customizer/assets/' + selections[0] + '~' + selections[2].toLowerCase() + '~' + selections[3].replace('+', ',') + '.png'}
    ])
  }

  const hideNumbers = (e) => {
    e.preventDefault();
    
    document.getElementById(`arrangementSelector-${currentStep}`).style.display = "block";
    document.getElementById(`arrangementSelector-Numbers`).style.display = "none";
  }
 

  const setLetterStyle = (e, title) => {
    e.preventDefault();

    if (!document.getElementById("Style-Type")) {
      addArrangementBlock("Style", "Style-Type", title, "", `${currentStep}`)
    } else {
      document.getElementById("Style-Type").innerHTML = title;
    }
  
    addSelection(currentStep, title)
    getMainImage();
    var styles = document.getElementsByClassName("letterChoice");
  
    for (var i = 0; i < styles.length; i++) {
      styles[i].style.background = "#ffffff"
      styles[i].firstElementChild.style.color = "#000000"
    }
    
    const selectedItem = document.querySelector(`#${title}.letterChoice`);

    selectedItem.style.background = "#000000"
    selectedItem.firstElementChild.style.color = "#ffffff"
  
    updatePrice()
  }
  
  const setNumberStyle = (e, title) => {
    e.preventDefault();

    if (!document.getElementById("Style-Type")) {
      addArrangementBlock("Style", "Style-Type", title, "", `${currentStep}`)
    } else {
      document.getElementById("Style-Type").innerHTML = title;
    }
  
    addSelection(currentStep, title)
    getMainImage();
    var styles = document.getElementsByClassName("numberChoice");
  
    for (var i = 0; i < styles.length; i++) {
      styles[i].style.background = "#ffffff"
      styles[i].firstElementChild.style.color = "#000000"
  
    }
  
    const selectedItem = document.querySelector(`#${title}.numberChoice`);

    selectedItem.style.background = "#000000"
    selectedItem.firstElementChild.style.color = "#ffffff"
  
    updatePrice()
  }


  return (
    <>
      <Preloader />
      <div className="container">
      
        {
          collectionProducts.map((prod, prodIndex) => {
            return (
              <React.Fragment key={prodIndex}>
                <h2 style={{display: 'none'}} className={`${prod.id}-product`} id={`${prod.title}-product`}
                  data-json={JSON.stringify(prod)} >
                </h2>
                <h2 style={{display: 'none'}} className={`${prod.id}-product`} id={`${prod.title}`}
                  data-json={JSON.stringify(prod.variants)}>
                </h2>
              </React.Fragment>
            )
          })
        }
  
        <div className="arrangement-sections_container">
          <div id="mobile-panel" className="arrangement-choices_container-mobile">
            <div className="arrangement-choices_row">
              <div className="arrangement_row_left" id="arr-title-mobile">
                  <span style={{color:'rgb(0,0,0)',fontWeight:'600'}}>Your arrangement</span>
              </div>
            </div>
            <div className="arrangement-choices_row">
              <div className="arrangement_row_left" id="arr-choice-mobile">
                  <span id="mobile-arr-type">Large Square</span>
              </div>
              <div className="arrangement_row_right" id="arr-price-mobile">
                  <span id="mobile-arr-price-span">$-</span>
              </div>
            </div>
            <div className="arrangement-choices_row">
              <div className="arrangement_row_left" id="arr-rose1-mobile">
                <span id="rose-mobile-type">Rose Color 1: <span id="rose-mobile-1" className="rose-selection">-</span></span>
              </div>
              <div className="arrangement_row_right" id="arr-rose2-mobile">
                <span id="rose-mobile-type">Rose Color 2: <span id="rose-mobile-2" className="rose-selection">-<span></span></span></span>
              </div>
            </div>
          </div>

          <div id="col-left" className="arrangement-column">
            <div className="arrangement-header">
              <span>YOUR ARRANGEMENT</span>
            </div>
          </div>

          <div className="arrangement-column arrangement-center">
            <img id="mainIMG" alt="" />
          </div>

          <div className="arrangement-column arr-col-right">
            <div className="arrangement-header">
                <span id="arrangementSelector_title">CHOOSE BOX</span>
            </div>
            <div id="col-right">

              <div id="arrangementSelector-0"></div>

              <div id="arrangementSelector-Letters" className="arrangement-container" style={{ marginTop: '10px', display: 'none' }}> 
                <div className="arrangement-pattern" id="goBack" 
                  data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                  onClick={hideLetters} style={{ background: 'rgb(0, 0, 0)', minWidth:'95%'}} 
                  onKeyDown={handleKeyDown} role="presentation">
                    <span className="arrangement-pattern_title styleOption" 
                      id="StyleText-Letter A" 
                      style={{color:'rgb(255,255,255)'}}>Go Back</span>
                </div>

                {customizePageData.arrangementSelectorLetters.items.map((item, index) => 
                <div className="arrangement-pattern letterChoice" id={item.divId} key={index} onKeyDown={handleKeyDown} role="presentation"
                  data-preview='//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454'
                  onClick={e => setLetterStyle(e, item.divId)} 
                  
                  style={{background: 'rgb(255, 255, 255)' }}>
                    <span className="arrangement-pattern_title styleOption" 
                      id={item.spanId} 
                      style={{color: 'rgb(0,0,0)' }}>{item.title}</span>
                </div>
                )}
              </div>

              <div id="arrangementSelector-Numbers" className="arrangement-container" style={{marginTop: '10px', display:'none'}}> 
                <div className="arrangement-pattern" id="goBack" 
                  data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                  onClick={hideNumbers} style={{background: 'rgb(0, 0, 0)', minWidth:'95%'}} 
                  onKeyDown={handleKeyDown} role="presentation">
                    <span className="arrangement-pattern_title styleOption" 
                      id="StyleText-Letter A" 
                      style={{color:'rgb(255,255,255)'}} >Go Back</span>
                </div>

                {customizePageData.arrangementSelectorNumbers.items.map((item, index) => 
                <div className="arrangement-pattern numberChoice" id={item.divId} key={index} 
                  data-preview="//cdn.shopify.com/s/files/1/0157/4420/4900/t/223/assets/placeholder.png?v=12535657291004423454" 
                  onClick={e => setNumberStyle(e, item.divId)} 
                  style={{background: 'rgb(255, 255, 255)'}} 
                  onKeyDown={handleKeyDown} role="presentation">
                    <span className="arrangement-pattern_title styleOption" 
                      id={item.spanId} style={{color:'rgb(0,0,0)'}} >{item.title}</span>
                </div>
                )}
              </div>
            </div>

            <div className="step-container">
              <div className="step-wrapper">
                  <div className="step-previous" onClick={previous} onKeyDown={handleKeyDown} role="presentation">Back</div>
                  <div className="step-next" id="step-next" onClick={next} onKeyDown={handleKeyDown} role="presentation">Next</div>
                  <div style={{display:'none'}} className="step-next" id="addToBAG" onClick={AddToBag} onKeyDown={handleKeyDown} role="presentation">Add To Bag</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
  
export default CustomizePage

export const query = graphql`
  query{
		shopifyCollection(handle: {eq: "customizer"}) {
			id
      handle
      products {
        id
        shopifyId
        handle
        title
        availableForSale
        options {
          id
          name
          values
        }
        images {
          originalSrc
        }
        variants {
          id
          shopifyId
          title
          availableForSale
          requiresShipping
          price
          image {
            originalSrc
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
	}
`