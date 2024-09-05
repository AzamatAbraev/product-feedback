import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FeedbackCard from "../../components/feedback-card/FeedbackCard";
import Feedback from "../../types/Feedback";
import arrow from "../../assets/shared/icon-arrow-left.svg";
import CommentCard from "../../components/comment/CommentCard";
import request from "../../server/request";
import ErrorPage from "../error/ErrorPage";

import "./FeedbackDetail.scss";
import { message } from "antd";
import LoadingPage from "../../components/loading/LoadingPage";

const FeedbackDetailPage = () => {
  const { feedbackId } = useParams();
  const [feedbackData, setFeedbackData] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [charRemaining, setCharRemaining] = useState<number>(250);
  const [loading, setLoading] = useState(false);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const { data } = await request.get(`/feedback/${feedbackId}`);
        setFeedbackData(data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load feedback details.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();

  }, [feedbackId, refetch]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewComment(value);
    setCharRemaining(250 - value.length);
  };

  const handleSubmitComment = async () => {
    if (newComment.trim() && feedbackData) {
      try {
        const response = await request.post(`/feedback/${feedbackId}/comments`, {
          content: newComment,
          user: { name: "Arnie Thompson", username: "thomasse", image: "/user-images/image-george.jpg" },
        });

        const updatedFeedback = {
          ...feedbackData,
          comments: [...(feedbackData?.comments || []), response.data],
        };

        message.success("comment added");
        setRefetch(!refetch);
        setFeedbackData(updatedFeedback);
        setNewComment("");
        setCharRemaining(250);
        setRefetch(!refetch);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <section className="feedback">
      <div className="container feedback__container">
        <div className="feedback__header">
          <NavLink to="/" className="feedback__header__link">
            <img src={arrow} alt="Arrow" />
            <p>Go Back</p>
          </NavLink>
          <NavLink className="editBtn" to={`/feedback/edit/${feedbackId}`}>Edit Feedback</NavLink>
        </div>
        <div className="feedback__card">
          {feedbackData && (
            <FeedbackCard
              key={feedbackData._id}
              {...feedbackData}
            />
          )}
        </div>
        <div className="feedback__comments">
          <h2>{feedbackData?.comments?.length || 0} {feedbackData?.comments?.length === 1 ? "Comment" : "Comments"}</h2>
          {feedbackData?.comments?.map((comment) => (
            <CommentCard key={comment._id} {...comment} refetch={refetch} setRefetch={setRefetch} />
          ))}

          <div className="feedback__add-comment">
            <h3>Add Comment</h3>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Type your comment here"
              maxLength={250}
              rows={3}
            />
            <div className="feedback__comment-footer">
              <p>{charRemaining} characters left</p>
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default FeedbackDetailPage;
