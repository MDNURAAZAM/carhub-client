import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://sheltered-reaches-94417.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [reviews]);
  return (
    <div>
      <h2 className="text-primary text-center mt-5 fs-1 mb-4">REVIEWS</h2>
      <div className="reviews container mb-5">
        <div className="row w-100">
          {reviews.map((review) => (
            <Review key={review._id} review={review}></Review>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
