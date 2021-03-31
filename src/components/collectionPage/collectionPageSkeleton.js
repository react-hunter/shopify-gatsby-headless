import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../styles/collectionPage.scss";
const CollectionPageSkeleton = () => {
    return (
      <section>
        <ul id="shop-all-content" className="products-on-page grid grid--uniform grid--view-items collection-skeleton">
          {Array(16)
            .fill()
            .map((item, index) => (
              <li key={index} className="grid__item grid__item--collection-template">
                <div className="product-cart-image">
                  <Skeleton height="100%" />
                </div>
                <div className="h4 grid-view-item__title product-card__title product-card-title desktop-only">
                  <Skeleton height={16} width={`80%`} count={2} />
                </div>
                <div className="h4 grid-view-item__title product-card__title product-card-title mobile-only">
                  <Skeleton height={16} width={`80%`} count={(index + 1) % 7 === 0 && (index + 1) / 7 > 0 ? 1 : 2} />
                </div>
                <div className="product-review">
                  <div className="review-stars">
                    <Skeleton circle={true} height={12} width={12} />
                    <Skeleton circle={true} height={12} width={12} />
                    <Skeleton circle={true} height={12} width={12} />
                    <Skeleton circle={true} height={12} width={12} />
                    <Skeleton circle={true} height={12} width={12} />
                  </div>
                  <div className="review-count">
                    <Skeleton height={16} width={`80px`} />
                  </div>
                </div>
                <div className="price price--listing price--on-sale">
                  <div className="price__sale">
                    <dd>
                      <Skeleton height={16} width={`100px`} />
                    </dd>
                  </div>
                </div>
                <div className="collection-product-color-swatch">
                  <div className="color-swatch">
                    <Skeleton circle={true} height={35} width={35} />
                  </div>
                  <div className="color-swatch">
                    <Skeleton circle={true} height={35} width={35} />
                  </div>
                  <div className="color-swatch">
                    <Skeleton circle={true} height={35} width={35} />
                  </div>
                  <div className="color-swatch">
                    <Skeleton circle={true} height={35} width={35} />
                  </div>
                  <div className="color-swatch">
                    <Skeleton circle={true} height={35} width={35} />
                  </div>
                </div>
                <div className="openVariantModal">
                  <Skeleton height={50} width={`100%`} />
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  };
  export default CollectionPageSkeleton;