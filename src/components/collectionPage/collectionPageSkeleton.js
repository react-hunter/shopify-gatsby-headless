import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../styles/collectionPage.scss";
const CollectionPageSkeleton = React.memo(function CollectionPageSkeleton() {
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
              <div className="h4 grid-view-item__title product-card__title product-card-title">
                <Skeleton height={16} width={`80%`} count={1} />
              </div>
              <div className="product-review">
                <div className="review-stars">
                  <i className="star"></i>
                  <i className="star"></i>
                  <i className="star"></i>
                  <i className="star"></i>
                  <i className="star"></i>
                </div>
              </div>
              <div className="price price--listing price--on-sale">
                <div className="price__sale">
                  <dd>
                    <Skeleton height={14} width={`100px`} />
                  </dd>
                </div>
              </div>
              <div className="collection-product-color-swatch aa">
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
});

CollectionPageSkeleton.displayName = 'CollectionPageSkeleton';

export default CollectionPageSkeleton;