import { useState } from 'react';
import { Comment, Reply } from "../../types/Comment";
import "./CommentCard.scss";
import request from '../../server/request';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const CommentCard = (props: Comment & { refetch: boolean; setRefetch: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { feedbackId } = useParams();
  const { content, user, _id, replies } = props;
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [localReplies, setLocalReplies] = useState<Reply[]>(replies || []); // Manage local state for replies

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const handlePostReply = async () => {
    const optimisticReply: Reply = {
      content: replyContent,
      replyingTo: user.username,
      user: { name: "Arnie Thompson", username: "thomasse", image: "/user-images/image-george.jpg" },
    };

    if (replyContent.trim()) {
      // Optimistically update the UI
      setLocalReplies([...localReplies, optimisticReply]);
      setReplyContent('');
      setIsReplying(false);

      try {
        // Make the API request to post the reply
        await request.post(`/feedback/${feedbackId}/comments/${_id}/replies`, optimisticReply);

        // Optionally, refetch if necessary
        // setRefetch(!refetch);

        message.success("Reply added successfully");
      } catch (error) {
        // Rollback in case of error
        console.error("Error adding reply", error);
        message.error("Failed to add reply");

        // Rollback optimistic UI
        setLocalReplies(localReplies.filter((reply) => reply !== optimisticReply));
      }
    }
  };

  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__user">
          <img src={user?.image} alt={user?.name} />
          <div>
            <h3>{user?.name}</h3>
            <p>@{user?.username}</p>
          </div>
        </div>
        <div className="comment__reply">
          <button onClick={handleReplyClick}>Reply</button>
        </div>
      </div>
      <div className="comment__content">
        <p>{content}</p>
      </div>

      {localReplies.length > 0 && (
        <div className="comment__replies">
          {localReplies.map((reply, index) => (
            <div key={index} className="comment__reply-item">
              <div className="comment__user">
                <img src={reply.user.image} alt={reply.user.name} />
                <div>
                  <h3>{reply.user.name}</h3>
                  <p>@{reply.user.username}</p>
                </div>
              </div>
              <div className="comment__content">
                <p><strong>@{reply.replyingTo}</strong> {reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isReplying && (
        <div className="comment__reply-box">
          <textarea value={replyContent} onChange={handleReplyChange} />
          <button onClick={handlePostReply}>Post</button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
