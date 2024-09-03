import { NavLink } from 'react-router-dom';

import placeholderImage from '../../assets/suggestions/illustration-empty.svg';

import './NoFeedback.scss';


const NoFeedback = () => {
  return (
    <div className="nofeedback__container">
      <img src={placeholderImage} alt="No Feedback" className="no-feedback-image" />
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed?
        We love hearing about new ideas to improve our app.
      </p>
      <NavLink to="/feedback/new" className="addBtn">
        + Add Feedback
      </NavLink>
    </div>
  );
}

export default NoFeedback;
