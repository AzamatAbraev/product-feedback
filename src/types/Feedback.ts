import { Comment } from "./Comment";

export default interface Feedback {
  _id: string;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  status: string;
  comments?: Comment[];
}
