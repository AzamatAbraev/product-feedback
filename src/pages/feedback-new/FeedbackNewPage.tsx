import { useState, ChangeEvent, FormEvent } from 'react';
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import request from '../../server/request';

import './FeedbackNew.scss';
import { message } from 'antd';
import LoadingPage from '../../components/loading/LoadingPage';
import ErrorPage from '../error/ErrorPage';

interface FeedbackFormErrors {
  title?: string;
  details?: string;
}

const FeedbackNewPage = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Feature');
  const [details, setDetails] = useState<string>('');
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categories: string[] = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: FeedbackFormErrors = {};

    if (!title) validationErrors.title = "Feedback Title can't be empty";
    if (!details) validationErrors.details = "Feedback Detail can't be empty";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

      try {
        setLoading(true);
        await request.post("/feedback", {
          title: title,
          description: details,
          category: category
        })
        setTitle('');
        setCategory('Feature');
        setDetails('');
        setErrors({});
        navigate("/");
        message.success("feedback added")
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setTitle('');
    setCategory('Feature');
    setDetails('');
    setErrors({});
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDetailsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='feedback-new container'>
      <NavLink to="/" className="go-back"><img src={arrowLeft} alt="Arrow Left" /> Go Back</NavLink>
      <div className="feedback-form">
        <form onSubmit={handleSubmit}>
          <h2>Create New Feedback</h2>

          <label>
            Feedback Title
            <h3>Add a short, descriptive headline</h3>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Add a short, descriptive headline"
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </label>

          <label>
            Category
            <h3>Choose a category for your feedback</h3>
            <select value={category} onChange={handleCategoryChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <label>
            Feedback Detail
            <h3>Include any specific comments on what should be improved, added, etc.</h3>
            <textarea
              value={details}
              onChange={handleDetailsChange}
              placeholder="Include any specific comments on what should be improved, added, etc."
            />
            {errors.details && <span className="error">{errors.details}</span>}
          </label>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackNewPage;
