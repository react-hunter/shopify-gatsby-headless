import React from "react";
import Skeleton from "react-loading-skeleton";
import '../../styles/featuredCollectionsPage.scss';
import "../../styles/collectionPage.scss";

const CollectionSliderNonRoseSkeleton = React.memo(function CollectionSliderNonRoseSkeleton() {
    return (
        Array(5)
            .fill()
            .map((item, index) => (
                <li className="grid__item--collection-template collection-skeleton">
                    <div className="grid-view-item product-card">
                        <Skeleton height={220} width={`100%`} />
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
                    <div className="openVariantModal">
                        <Skeleton height={50} width={`100%`} />
                    </div>
                </li>
            ))
    );
});

CollectionSliderNonRoseSkeleton.displayName = 'CollectionSliderNonRoseSkeleton';

export default CollectionSliderNonRoseSkeleton;