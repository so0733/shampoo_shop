import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ handleRating }) => {
    const [rating, setRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);

    const handleClick = (value) => {
        if (rating === value) {
            setRating(null);
            handleRating(null);
        } else {
            setRating(value);
            handleRating(value);
        }
    };

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(null);
    };

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input type="radio" name="rating" value={ratingValue} style={{ display: 'none' }} />
                        
                        <FaStar
                            className="star"
                            color={(hoverRating || rating) >= ratingValue ? "#ffc107" : "#e4e5e9"}
                            size={30}
                            onClick={() => handleClick(ratingValue)}
                            onMouseEnter={() => handleMouseEnter(ratingValue)}
                            onMouseLeave={handleMouseLeave}
                        />
                    </label>
                );
            })}

        </div>
    );
};

export default StarRating;
