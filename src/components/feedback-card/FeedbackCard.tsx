import { Link } from 'react-router-dom';
import './FeedbackCard.scss';
import Feedback from '../../types/Feedback';
import request from '../../server/request';
import { message } from 'antd';


const FeedbackCard = (feedback: Feedback) => {
  const { _id, upvotes, title, description, category, comments } = feedback;

  const upvoteFeedback = async () => {
    try {
      await request.post(`/feedback/${_id}/upvote`);
      message.success("Upvoted");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="feedback-item">
      <div className="feedback-item__votes">
        <button onClick={upvoteFeedback} className="feedback-item__vote-button">
          <span className="arrow">^</span>
          <span className="count">{upvotes}</span>
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
