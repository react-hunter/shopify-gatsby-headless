import React from "react";
import Skeleton from "react-loading-skeleton";
import '../../styles/featuredCollectionsPage.scss';
import "../../styles/collectionPage.scss";

const CollectionSliderSkeleton = React.memo(function CollectionSliderSkeleton() {
  return (
    Array(7)
      .fill()
      .map((item, index) => (
        <div key={index} className="collection-carousel">
          <div className="carousel-header_wrapper">
            <Skeleton height={20} width={`100%`} />
          </div>
          <div className="Best-Sellers-Carousel">
            <Skeleton height={220} />
            <Skeleton height={20} />
          </div>
        </div>
      ))
  );
});

CollectionSliderSkeleton.displayName = 'CollectionSliderSkeleton';

export default CollectionSliderSkeleton;