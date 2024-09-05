import { NavLink } from 'react-router-dom';
import './Error.scss';

interface ErrorPageProps {
  message?: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <p>{message || 'An unexpected error has occurred. Please try again later.'}</p>
      <NavLink to="/" className="back-home-btn">Go Back Home</NavLink>
    </div>
  );
};

export default ErrorPage;
