import User from "./User";

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface Comment {
  _id: string;
  content: string;
  user: User;
  feedbackId: string;
  replies?: Reply[];
}
