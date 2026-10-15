import { FaStar } from "react-icons/fa";
import "./ratingfilter.css";

interface RatingFilterProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
}

const ratings = [5, 4, 3, 2, 1];

const RatingFilter = ({
  selectedRating,
  onRatingChange,
}: RatingFilterProps) => {
  return (
    <div className="rating-filter">

      <h3 className="filter-title">
        Customer Rating
      </h3>

      <button
        className={
          selectedRating === null
            ? "rating-item active"
            : "rating-item"
        }
        onClick={() => onRatingChange(null)}
      >
        All Ratings
      </button>

      {ratings.map((rating) => (
        <button
          key={rating}
          className={
            selectedRating === rating
              ? "rating-item active"
              : "rating-item"
          }
          onClick={() => onRatingChange(rating)}
        >
          <div className="stars">

            {[...Array(rating)].map((_, index) => (
              <FaStar key={index} />
            ))}

          </div>

          <span>& Up</span>

        </button>
      ))}

    </div>
  );
};

export default RatingFilter;