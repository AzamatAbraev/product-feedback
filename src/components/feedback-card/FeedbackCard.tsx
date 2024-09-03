import { Link } from 'react-router-dom';
import './FeedbackCard.scss';
import { Comment } from '../../types/Comment';

interface FeedbackItemProps {
  id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: Comment[];
}

const FeedbackCard = (props: FeedbackItemProps) => {
  const { id, upvotes, title, description, category, comments } = props;
  return (
    <Link to={`/feedback/${id}`} className="feedback-item">
      <div className="feedback-item__votes">
        <button className="feedback-item__vote-button">
          <span className="arrow">^</span>
          <span className="count">{upvotes}</span>
        </button>
      </div>
      <div className="feedback-item__content">
        <h3 className="feedback-item__title">{title}</h3>
        <p className="feedback-item__description">{description}</p>
        <span className="feedback-item__category">{category}</span>
      </div>
      <div className="feedback-item__comments">
        <span className="icon">💬</span>
        <span className="count">{comments?.length}</span>
      </div>
    </Link>
  );
};

export default FeedbackCard;
