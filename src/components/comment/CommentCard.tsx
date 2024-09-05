import { useState } from 'react';
import { Comment, Reply } from "../../types/Comment";
import "./CommentCard.scss";
import request from '../../server/request';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import LoadingPage from '../loading/LoadingPage';

const CommentCard = (props: Comment) => {
  const { feedbackId } = useParams();
  const { content, user, _id, replies } = props;
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };


  const handlePostReply = async () => {
    if (replyContent.trim()) {
      try {
        setLoading(true);
        await request.post(`/feedback/${feedbackId}/comments/${_id}/replies`, {
          content: replyContent,
          replyingTo: user.username,
          user: { name: "Arnie Thompson", username: "thomasse", image: "/user-images/image-george.jpg" },
        });


        message.success("Comment added");
        setRefetch(!refetch);
        setReplyContent('');
        setIsReplying(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }

    }
  };

  return (
    <>{!loading ? <div className="comment">
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

      {replies && replies.length > 0 && (
        <div className="comment__replies">
          {replies.map((reply: Reply, index) => (
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
          <textarea
            value={replyContent}
            onChange={handleReplyChange}
          />
          <button onClick={handlePostReply}>Post</button>
        </div>
      )}
    </div> : <LoadingPage />}</>

  );
}

export default CommentCard;
