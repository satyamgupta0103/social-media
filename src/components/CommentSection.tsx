import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
  postId: number;
}

export const CommentSection = ({ postId }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");
  const { user } = useAuth();

  const handleSubmit = () => {};

  return (
    <div>
      <h3> Comments </h3>
      {user ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newCommentText}
            rows={3}
            placeholder="Write a comment..."
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button type="submit"> Post Comment </button>
        </form>
      ) : (
        <p> You must be logged in to post a comment </p>
      )}
    </div>
  );
};
