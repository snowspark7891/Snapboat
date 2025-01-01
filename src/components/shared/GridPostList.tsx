import { useUserContext } from "@/context/authcontext"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats";

type GridposTlISTpROPS = {
  posts: Models.Document[];
  showUser?: boolean;
  showStat?: boolean;
};
const GridPostList = ({posts , showUser= true , showStat = true}: GridposTlISTpROPS) => {
  const {user} = useUserContext();
  return (
    <ul className="grid-Container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80 my-5">
          <Link to={`/post/${post.$id}`} className="grid-post_link">
            <img src={post.imageUrl} />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                <img src={post.creator.imageUrl} alt="user" className="h-8 w-8 rounded-full"/>
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStat && <PostStats post={post} userId = {user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GridPostList