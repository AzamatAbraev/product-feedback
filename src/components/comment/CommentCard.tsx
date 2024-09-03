import React, { useState } from "react";
import "./CommentCard.scss";

type CommentProps = {
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  id: number;
  replies?: Array<{
    content: string;
    replyingTo: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
  }>;
};

const CommentCard = (props: CommentProps) => {
  const { content, user, replies: initialReplies = [], id } = props;

  // Initialize the replies state with the saved replies from localStorage
  const [replies, setReplies] = useState(() => {
    // Attempt to load saved replies from localStorage
    const savedReplies = JSON.parse(localStorage.getItem(`replies-${id}`) || "[]");
    // Combine initialReplies from props with saved replies from localStorage
    return [...initialReplies, ...savedReplies];
  });

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handlePostReply = () => {
    const newReply = {
      content: replyText,
      replyingTo: user.username,
      user: {
        image: "/user-images/image-george.jpg", // Update this to the correct path or make it dynamic
        name: "Arnie Thomas",
        username: "thomasse",
      },
    };

    const updatedReplies = [...replies, newReply];

    // Update the replies state to include the new reply
    setReplies(updatedReplies);

    // Save updated replies to localStorage
    localStorage.setItem(`replies-${id}`, JSON.stringify(updatedReplies));

    // Clear the input and hide the reply box
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="comment">
      <div className="comment__user">
        <div className="comment__user__part">
          <img src={user.image} alt={`${user.name}'s profile`} />
          <div className="comment__user-details">
            <h4>{user.name}</h4>
            <p>@{user.username}</p>
          </div>

        </div>
        <button onClick={handleReplyButtonClick} className="comment__reply-button">
          Reply
        </button>
      </div>
      <p className="comment__content">{content}</p>
      {showReplyInput && (
        <div className="comment__reply-input">
          <textarea
            value={replyText}
            onChange={handleReplyTextChange}
            placeholder="Type your reply here..."
          />
          <button onClick={handlePostReply} className="comment__post-reply-button">
            Post Reply
          </button>
        </div>
      )}
      {replies.length > 0 && (
        <div className="comment__replies">
          {replies.map((reply, index) => (
            <div key={index} className="comment__reply">
              <p>
                <strong>@{reply.replyingTo}</strong> {reply.content}
              </p>
              <div className="comment__reply-user">
                <img src={reply.user.image} alt={`${reply.user.name}'s profile`} />
                <div className="comment__reply-user-details">
                  <h4>{reply.user.name}</h4>
                  <p>@{reply.user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
