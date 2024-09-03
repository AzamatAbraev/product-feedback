import './FeedbackCard.scss';

interface FeedbackItemProps {
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
}

const FeedbackCard = ({ title, description, category, upvotes, comments }: FeedbackItemProps) => {
  return (
    <div className="feedback-item">
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
        <span className="count">{comments}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;
