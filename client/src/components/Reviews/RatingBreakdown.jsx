import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AverageStarRating from './AverageStarRating.jsx';
import PercentagBar from './PercentageBar.jsx';

function RatingBreakdown({ id, starClickHandler }) {
  const [totalReviews, setTotalReviews] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [recommands, setRecommends] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const handleStarsClick = (stars) => {
    starClickHandler(stars);
  };
  const getReviewMeta = () => {
    axios.get('reviews/meta', { params: { product_id: id } })
      .then((results) => {
        const reviews = results.data;

        let total = 0;
        let average = 0;
        const rates = [];
        for (let i = 1; i <= 5; i += 1) {
          total += parseInt(reviews.ratings[i], 10);
          average += reviews.ratings[i] * (i / 5);
          rates[i] = reviews.ratings[i];
        }
        setRatings(rates);
        average /= total;
        average = Math.round(average * 50) / 10;
        setAverageRating(average);
        setTotalReviews(total);
        setRecommends(Math.round((reviews.recommended.true / total) * 100));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReviewMeta();
  }, []);
  return (
    <div className="review-breakdown">
      <div className="rating-summary-container">
        <div className="average-rating">
          <span>{averageRating}</span>
        </div>
        <div className="star-rating">
          <AverageStarRating rating={averageRating} />
        </div>
      </div>
      <div className="recommend-container">
        <span>
          {recommands}
          % of reviews recommend this product
        </span>
      </div>
      <div className="rating-breakdown-container">
        <div className="stars-ratio-count" onClick={() => { handleStarsClick(5); }}>
          <u>5 stars</u>
          <div className="ratio-bar">
            <PercentagBar ratingPercentage={(ratings[5] / totalReviews) * 100} />
          </div>
          <span>{ratings[5]}</span>
        </div>
        <div className="stars-ratio-count" onClick={() => { handleStarsClick(4); }}>
          <u>4 stars</u>
          <div className="ratio-bar">
            <PercentagBar ratingPercentage={(ratings[4] / totalReviews) * 100} />
          </div>
          <span >{ratings[4]}</span>
        </div>
        <div className="stars-ratio-count" onClick={() => { handleStarsClick(3); }}>
          <u>3 stars</u>
          <div className="ratio-bar">
            <PercentagBar ratingPercentage={(ratings[3] / totalReviews) * 100} />
          </div>
          <span>{ratings[3]}</span>
        </div>
        <div className="stars-ratio-count" onClick={() => { handleStarsClick(2); }}>
          <u>2 stars</u>
          <div className="ratio-bar" >
            <PercentagBar ratingPercentage={(ratings[2] / totalReviews) * 100} />
          </div>
          <span>{ratings[2]}</span>
        </div>
        <div className="stars-ratio-count" onClick={() => { handleStarsClick(1); }}>
          <u>1 stars</u>
          <div className="ratio-bar">
            <PercentagBar ratingPercentage={(ratings[1] / totalReviews) * 100} />
          </div>
          <span >{ratings[1]}</span>
        </div>
      </div>
    </div>
  );
}
export default RatingBreakdown;
