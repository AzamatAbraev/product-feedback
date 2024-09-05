import { NavLink } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="back-home-btn">Go Back Home</NavLink>
    </div>
  );
};

export default NotFoundPage;
