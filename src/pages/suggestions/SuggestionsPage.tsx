import { NavLink } from "react-router-dom";
import "./Suggestions.scss";

import bulbIcon from "../../assets/suggestions/icon-suggestions.svg";
import Dropdown from "../../components/dropdown/Dropdown";
import FeedbackCard from "../../components/feedback-card/FeedbackCard";
import data from '../../data/data.json';
import NoFeedback from "../../components/no-feedback/NoFeedback";

// Interfaces for the data structure
interface User {
  image: string;
  name: string;
  username: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

interface Feedback {
  id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  status: string;
  comments?: Comment[];
}

const SuggestionsPage = () => {
  const feedbackData: Feedback[] = data?.productRequests || [];

  return (
    <section>
      <div className="container suggestions-container">
        <div className="sidebar">
          <div className="sidebar__logo">
            <h2>Frontend Mentor</h2>
            <p>Feedback Board</p>
          </div>
          <div className="sidebar__filters">
            <button className="filter">All</button>
            <button className="filter">UI</button>
            <button className="filter">UX</button>
            <button className="filter">Enhancement</button>
            <button className="filter">Bug</button>
            <button className="filter">Feature</button>
          </div>
          <div className="sidebar__roadmap">
            <div className="sidebar__roadmap__header">
              <h3>Roadmap</h3>
              <NavLink to="/roadmap">View</NavLink>
            </div>
            <div className="sidebar__roadmap__body">
              <div className="sidebar__roadmap__category">
                <p>Planned</p>
                <span>0</span>
              </div>
              <div className="sidebar__roadmap__category">
                <p>In-Progress</p>
                <span>0</span>
              </div>
              <div className="sidebar__roadmap__category">
                <p>Live</p>
                <span>0</span>
              </div>
              <div className="sidebar__roadmap__category"></div>
              <div className="sidebar__roadmap__category"></div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="main__header">
            <div className="main__header__left">
              <div className="main__header__suggestions">
                <img src={bulbIcon} alt="Bulb Icon" />
                <h3>{feedbackData.length} Suggestions</h3>
              </div>
              <div className="main__header__sort">
                <Dropdown />
              </div>
            </div>
            <div className="main__header__right">
              <NavLink className="addBtn" to="/feedback/new">+ Add Feedback</NavLink>
            </div>
          </div>
          <div className="main__content">
            {feedbackData.length === 0 ? (
              <NoFeedback />
            ) : (
              feedbackData.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  title={feedback.title}
                  description={feedback.description}
                  category={feedback.category}
                  upvotes={feedback.upvotes}
                  comments={feedback.comments?.length || 0}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsPage;
