import { useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../../server/request';
import Feedback from '../../types/Feedback';

import './FeedbackCard.scss';

const FeedbackCard = (feedback: Feedback) => {
  const { _id, upvotes, title, description, category, comments } = feedback;
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const toggleUpvote = async () => {
    try {
      if (userUpvoted) {
        await request.post(`/feedback/${_id}/downvote`);
        setCurrentUpvotes((prev) => prev - 1);
      } else {
        await request.post(`/feedback/${_id}/upvote`);
        setCurrentUpvotes((prev) => prev + 1);
      }
      setUserUpvoted(!userUpvoted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feedback-item">
      <div className={`feedback-item__votes ${userUpvoted ? 'upvoted' : ''}`}>
        <button
          onClick={toggleUpvote}
          className={`feedback-item__vote-button ${userUpvoted ? 'upvoted' : ''}`}
        >
          <span className="arrow">^</span>
          <span className="count">{currentUpvotes}</span>
        </button>
      </div>
      <Link to={`/feedback/${_id}`} className="feedback-item__content">
        <h3 className="feedback-item__title">{title}</h3>
        <p className="feedback-item__description">{description}</p>
        <span className="feedback-item__category">{category}</span>
      </Link>
      <div className="feedback-item__comments">
        <span className="icon">💬</span>
        <span className="count">{comments?.length}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;
