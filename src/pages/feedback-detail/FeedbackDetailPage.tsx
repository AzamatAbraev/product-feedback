import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import data from "../../data/data.json";

import FeedbackCard from "../../components/feedback-card/FeedbackCard";
import Feedback from "../../types/Feedback";

import arrow from "../../assets/shared/icon-arrow-left.svg"

import "./FeedbackDetail.scss";
import CommentCard from "../../components/comment/CommentCard";

const FeedbackDetailPage = () => {
  const { feedbackId } = useParams();

  const [feedbackData, setFeedbackData] = useState<Feedback | null>(null)

  const { productRequests } = data;

  useEffect(() => {
    const feedback = productRequests?.find((product) => product.id === Number(feedbackId));
    setFeedbackData(feedback || null);

  }, [feedbackId, productRequests])

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
              key={feedbackData.id}
              {...feedbackData}
              comments={feedbackData.comments || []} />
          )}

        </div>
        <div className="feedback__comments">
          {feedbackData?.comments?.map((comment) => (
            <CommentCard key={comment?.id} {...comment} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeedbackDetailPage;
