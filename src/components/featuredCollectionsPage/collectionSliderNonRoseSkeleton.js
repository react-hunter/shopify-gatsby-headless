import React from "react";
import Skeleton from "react-loading-skeleton";
import '../../styles/featuredCollectionsPage.scss';
import "../../styles/collectionPage.scss";

const CollectionSliderNonRoseSkeleton = React.memo(function CollectionSliderNonRoseSkeleton() {
    return (
        <>
            {Array(6)
                .fill()
                .map((item, index) => (
                    <div className="collection-carousel" >
                        <div className="carousel-header_wrapper">
                            <span className="carousel-header visibility-hidden">aa</span>
                        </div>

                        <div className="skeleton-wrapper">
                            {Array(5)
                                .fill()
                                .map((item, index) => (
                                    <li className="grid__item--collection-template collection-skeleton">
                                        <div className="grid-view-item product-card product-loading">
                                            <Skeleton height={`100%`} width={`100%`} />
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
                            }
                        </div>
                    </div>
                ))
            }
        </>
    );
});

CollectionSliderNonRoseSkeleton.displayName = 'CollectionSliderNonRoseSkeleton';

export default CollectionSliderNonRoseSkeleton;