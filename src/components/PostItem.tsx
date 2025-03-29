import { Link } from "react-router";
import { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div>
      <div />
      <Link to="/post">
        <div>
          {/* Header: Avator and Title */}
          <div>
            <div />
            <div>
              <div>{post.title}</div>
            </div>
          </div>
        </div>

        {/* Image Banner */}
        <div>
          <img src={post.image_url} alt={post.title} />
        </div>
      </Link>
    </div>
  );
};
