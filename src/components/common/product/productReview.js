import React from 'react';
import '../../../styles/product-review.css'

const ProductReview = React.memo(function ProductReview(props) {
    const review = props.data;
    const reviewExist = props.data.reviewCount > 0;
    return (
        <>
            { console.log(review.reviewCount) }
            {reviewExist && 
                <div data-oke-reviews-version="2.11.0" className="okeReviews okeReviews--theme">
                    <div className="okeReviews-reviewsSummary js-okeReviews-reviewsSummary" data-oke-ga-click-action="Star Rating Summary Click">
                        <div className="okeReviews-reviewsSummary-starRating">
                            <span className="okeReviews-starRating okeReviews-starRating--small">
                                <span className="okeReviews-a11yText">{review.reviewAverageValue} out of 5</span>
                                <span className="okeReviews-starRating-indicator" role="presentation">
                                    <span className="okeReviews-starRating-indicator-layer"></span>
                                    <span
                                        className="okeReviews-starRating-indicator-layer okeReviews-starRating-indicator-layer--foreground"
                                        style={{width: review.reviewAverageValue * 20 + '%'}}
                                    />
                                </span>
                            </span>
                        </div>
                        <div className="okeReviews-reviewsSummary-ratingCount">({review.reviewCount})</div>
                    </div>
                </div>
            }
        </>
    );
});

ProductReview.displayName = 'ProductReview';

export default ProductReview;