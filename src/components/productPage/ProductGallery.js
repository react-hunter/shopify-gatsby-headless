import React, { useEffect, useState, useRef } from 'react'
import CustomImage from '../common/image'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Flickity from 'react-flickity-component'
import '../../styles/productGallery.css';
import '../../styles/flickity.css';

const ProductGallery = ({ product, selectedVariant }) => {
    let selectedImageIndex = 0;
    const [flktyObject, setFlktyObject] = useState(null);
    var flkty;
    // const flkty = useRef(null);

    const [ slideIndex, setSlideIndex] = useState(0);

    product.images.map((image, imageIndex) => {
        if(image.originalSrc === selectedVariant.image.originalSrc) {
            selectedImageIndex = imageIndex;
        }
        return true
    })

    useEffect(() => {
        console.log('11111111');
        console.log(flkty);
        if (flkty != null) {
            setFlktyObject(flkty);
        }
    }, [flkty]);

    // useEffect(() => {
    //     slider.current.slickGoTo(selectedImageIndex);
    // }, [selectedVariant, selectedImageIndex])

    useEffect(() => {
        console.log("selectedVariant = ", selectedVariant);
        console.log("selectedImageIndex === ", selectedImageIndex);

        //flkty.select(selectedImageIndex);
        //Flickity.current.select(selectedImageIndex);

        console.log('22222222', flktyObject);

        if (flktyObject) {
            flktyObject.select(selectedImageIndex);
        }

        if (flkty) {
            console.log("----------------------------------- ProductGallery flkty is live = ", flkty);
            flkty.on('change', () => {
                console.log("ProductGallery on change is live = ", flkty);
                console.log("flkty.selectedIndex === ", flkty.selectedIndex);
                setSlideIndex(flkty.selectedIndex);
            })
        } else {
            console.log("----------------------------------- ProductGallery flkty is null = ", flkty);
        }

    }, [selectedVariant, selectedImageIndex])

    useEffect(() => {
        setTimeout(addSliderScript('//foursixty.com/media/scripts/fs.slider.v2.5.js'), 200);
    }, [])
    const addSliderScript = url => {
        const script = document.createElement("script")
        script.src = url
        script.setAttribute('data-feed-id', 'dose-of-roses')
        script.setAttribute('data-for-url', true)
        script.setAttribute('data-theme', 'slider_v2_5')
        script.setAttribute('data-open-links-in-same-page', true)
        script.setAttribute('data-connector-filter', "30963")
        script.setAttribute('data-cell-size', "50%")
        document.getElementById('instagram-slider').appendChild(script)
    }

    let productGalleryCount = product.images.length;    

    const getStyle = () => {
        let width = 100/productGalleryCount;
        let translateX = 100 * slideIndex;
        return { width: `${width}%`, transform: `translateX(${translateX}%)` };
    }
    const flickityOptions = {
        pageDots: false, 
        imagesLoaded: true, 
        touchVerticalScroll: false,
        dragThreshold : 10, 
        selectedAttraction: 0.01,
        friction: 0.2,
    }

    return (
        <div className="product_image-container 1">
            <div className="pdp-carousel-main grid__item product-single__media-group medium-up--one-half glider draggable">
                <Flickity options={flickityOptions} flickityRef={c=> flkty = c } >
                {
                    product.images.length === 0? 
                        (<div className="product-single__media-wrapper placefolder">
                            <LazyLoadImage 
                                className="lazy-load-mc"
                                src="https://cdn.shopify.com/s/files/1/0157/4420/4900/t/230/assets/placeholder_700x.png"
                                alt={product.title}
                                effect="blur"
                                loading="eager" 
                            />
                        </div>) :
                        product.images.map((image, imageIndex) => {
                            return (
                                image ? (
                                    <div className="product-single__media-wrapper" key={imageIndex}>
                                        <CustomImage 
                                            className="lazy-load-mc"
                                            src={image.originalSrc} 
                                            alt={product.title}
                                            effect="blur"
                                            loading="eager" 
                                        />
                                    </div>
                                ) : null
                            )
                        })
                    }
                </Flickity>
                <div className="status-bar">
                    <div className="carousel-scrollbar">
                        <div className="carousel-scrollbar_bar" style={getStyle()}></div>
                    </div>
                </div>
                <div id="instagram-slider"></div>

                
            </div>
        </div>
    );
}

export default ProductGallery;