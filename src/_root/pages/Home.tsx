import PostCard from "@/components/shared/PostCard";
import { usegetRecentPosts } from "@/lib/react-quary/quaresandMutaition";
import { Models } from "appwrite";
import { Loader } from "lucide-react";

const Home = () => {

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = usegetRecentPosts();
  
  

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
              test 1
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home

// import PostCard from "@/components/shared/PostCard";
// import { usegetRecentPosts } from "@/lib/react-quary/quaresandMutaition";
// import { Models } from "appwrite";
// import { Loader } from "lucide-react";

// const Home = () => {
//   const {
//     data: posts,
//     isPending: isPostLoading,
//     isError: isErrorPosts,
//   } = usegetRecentPosts();

//   return (
//     <div className="flex flex-1">
//       <div className="home-container p-4">
//         <div className="home-posts">
//           <h2 className="h3-bold md:h2-bold text-left w-full mb-6">
//             Home Feed
//           </h2>
//           {isPostLoading && !posts ? (
//             <Loader />
//           ) : (
//             <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
//               {posts?.documents.map((post: Models.Document) => (
//                 <PostCard post={post} key={post.caption} />
//               ))}
//               test 1
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
