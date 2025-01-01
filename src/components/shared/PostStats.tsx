// import {
//   useDeleteSavedPost,
//   useGetCurrentUser,
//   useLikePost,
//   useSavePost,
// } from "@/lib/react-quary/quaresandMutaition";
// import { Models } from "appwrite";
// import React, { useEffect, useState } from "react";
// import { checkIsLiked } from "@/lib/utils";
// import Loader from "./Loader";

// type PostStatsProps = {
//   post: Models.Document;
//   userId: string;
// };

// const PostStats = ({ post, userId }: PostStatsProps) => {
//   const likesLsist = post.likes.map((user: Models.Document) => user.$id);

//   const [likes, setLikes] = useState(likesLsist);
//   const [isSaved, setIsSaved] = useState(false);

//   const { mutate: likePost } = useLikePost();
//   const { mutate: savePost, isPending: isSavingPost } = useSavePost();
//   const { mutate: deleteSavePost, isPending: isDeletingPost } =
//     useDeleteSavedPost();

//   const { data: currentUser } = useGetCurrentUser();

//   const SavedRecord = currentUser?.save.find(
//     (record: Models.Document) => record.$id === post.$id
//   );

//   useEffect(() => {
//     setIsSaved(!!SavedRecord);
//   }, [currentUser]);
//   const handleLikePost = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     let newLikes = [...likes];

//     const hasLiked = newLikes.includes(userId);

//     if (hasLiked) {
//       newLikes.filter((id) => id !== userId);
//     } else {
//       newLikes.push(userId);
//     }

//     setLikes(newLikes);
//     likePost({ postId: post.$id, likesArray: newLikes });
//   };

//   const handleSavePost = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     const SavedRecord = currentUser?.save.find(
//       (record: Models.Document) => record.post.$id === post.$id
//     );

//     if (SavedRecord) {
//       setIsSaved(false);
//       deleteSavePost(SavedRecord.$id);
//     } else {
//       savePost({ postId: post.$id, userId });
//       setIsSaved(true);
//     }
//   };
//   return (
//     <div className="flex justify-between items-center z-20">
//       <div className="flex gap-2 mr-5">
//         <img
//           src={
//             checkIsLiked(likes, userId)
//               ? "/public/assets/icons/liked.svg"
//               : "/public/assets/icons/like.svg"
//           } 
//           alt="like"
//           width={20}
//           height={20}
//           className="cursor-pointer"
//           onClick={handleLikePost}
//         />
//         <p className="small-medium lg:base-medium">{likes.length}</p>
//       </div>

//       <div className="flex gap-2 mr-5">
//         {isSavingPost || isDeletingPost ? (
//           <Loader />
//         ) : (
//           <img
//             src={
//               isSaved
//                 ? "/public/assets/icons/saved.svg"
//                 : "/public/assets/icons/save.svg"
//             }
//             alt="like"
//             width={20}
//             height={20}
//             className="cursor-pointer"
//             onClick={handleSavePost}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostStats;


import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-quary/quaresandMutaition";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";


type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};


const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    const savedRecord = currentUser?.save.find(
      (record: Models.Document) => record.$id === post?.$id
    );
    setIsSaved(!!savedRecord);
    // Sync the state with localStorage
    const isPostSaved =
      localStorage.getItem(`post_saved_${post?.$id}`) === "true";
    setIsSaved(isPostSaved);
  }, [currentUser, post?.$id]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedRecord = currentUser?.save.find(
      (record: Models.Document) => record.$id === post?.$id
    );

    if (savedRecord) {
      setIsSaved(false);
      deleteSavePost(savedRecord.$id);
      localStorage.setItem(`post_saved_${post?.$id}`, "false");
    } else {
      savePost({ postId: post?.$id || '', userId });
      setIsSaved(true);
      localStorage.setItem(`post_saved_${post?.$id}`, "true");
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/public/assets/icons/liked.svg"
              : "/public/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-5">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={
              isSaved
                ? "/public/assets/icons/saved.svg"
                : "/public/assets/icons/save.svg"
            }
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
