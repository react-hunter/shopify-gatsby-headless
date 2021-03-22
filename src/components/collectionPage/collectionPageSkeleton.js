import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../styles/collectionPage.scss";
const CollectionPageSkeleton = () => {
    return (
      <section>
        <span className="visually-hidden product-card-title">
          <Skeleton height={30} width={150} />
        </span>

        <ul id="shop-all-content" className="products-on-page grid grid--uniform grid--view-items">
          {Array(16)
            .fill()
            .map((item, index) => (
              <li key={index} className="grid__item grid__item--collection-template">
                <Skeleton height={180} />
                <Skeleton height={20} width={`100%`} />
                <Skeleton height={20} width={`80%`} />
                <Skeleton height={35} width={`80%`} />
              </li>
            ))}
        </ul>
      </section>
    );
  };
  export default CollectionPageSkeleton;