import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import arrowLeft from "../../assets/shared/icon-arrow-left.svg";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import request from '../../server/request';

import './FeedbackEdit.scss';
import { message } from 'antd';
import LoadingPage from '../../components/loading/LoadingPage';
import ErrorPage from '../error/ErrorPage';

interface FeedbackFormErrors {
  title?: string;
  details?: string;
}

const FeedbackEditPage = () => {
  const navigate = useNavigate();
  const { feedbackId } = useParams<{ feedbackId: string }>();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Feature');
  const [status, setStatus] = useState<string>('Planned');
  const [details, setDetails] = useState<string>(
    ''
  );
  const [errors, setErrors] = useState<FeedbackFormErrors>({});

  const categories: string[] = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  const statuses: string[] = ['Suggestion', 'Planned', 'In-Progress', 'Live'];

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const { data } = await request.get(`/feedback/${feedbackId}`);
        setTitle(data?.title);
        setCategory(data?.category);
        setStatus(data?.status);
        setDetails(data?.description);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError(true);
      } finally {
        setLoading(false)
      }
    };

    if (feedbackId) {
      fetchFeedback();
    }
  }, [feedbackId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: FeedbackFormErrors = {};

    if (!title) validationErrors.title = "Feedback Title can't be empty";
    if (!details) validationErrors.details = "Feedback Detail can't be empty";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await request.put(`/feedback/${feedbackId}`, {
          title,
          description: details,
          category,
          status
        });
        message.success("feedback updated")
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await request.delete(`/feedback/${feedbackId}`);
      message.info("feedback deleted");
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    navigate('/');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
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
    <div className="feedback-edit container">
      <NavLink to={`/feedback/${feedbackId}`} className="go-back">
        <img src={arrowLeft} alt="Arrow Left" /> Go Back
      </NavLink>
      <div className="feedback-edit-form">
        <form onSubmit={handleSubmit}>
          <h2>Editing 'Add a dark theme option'</h2>

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
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            Update Status
            <h3>Change feedback state</h3>
            <select value={status} onChange={handleStatusChange}>
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
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
            <button type='button' className='delete-btn' onClick={handleDelete}>Delete</button>
            <div className='form-buttons-right'>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackEditPage;
