import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  QueryClient,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePostHere,
  deleteSavedPost,
  getCurrentAccount,
  getInfinitePost,
  getpostByID,
  getRecentPost,
  getSearchPost,
  likedPost,
  savedPost,
  signInAccount,
  signOutAccount,
  updatePost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost } from "@/Types";
import { QUERY_KEYS } from "./queryKeys";

//react qury to simplify the data fetching, caching, synchronizing and updating the state of the application

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePost = () => {
  const quryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const usegetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPost, //from aoi.tsx
  }); //used to get data
};

export const useLikePost = () => {
  const quryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likedPost(postId, likesArray),
    onSuccess: (data) => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePost = () => {
  const quryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savedPost(postId, userId),
    onSuccess: () => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteSavedPost = () => {
  const quryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
    onSuccess: () => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });

      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentAccount,
  });
};

export const useGetPostByID = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getpostByID(postId),
    enabled: !!postId,
  });
};

export const useUpdatePostByID = () => {
  const quryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeletePostByID = () => {
  const quryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePostHere(postId, imageId),
    onSuccess: () => {
      quryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPost = () => {
  return useInfiniteQuery({ queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn:getInfinitePost,
    getNextPageParam:(lastPage)=>{
      if(lastPage && lastPage.documents.length ===0 ) return null;
      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

      return lastId;
    }
   });
};

export const useSearchPost = (searchTerm : string)=>{
   return useQuery({
     queryKey: [QUERY_KEYS.SEARCH_POSTS,searchTerm],
     queryFn: () => getSearchPost(searchTerm),
     enabled: !!searchTerm
   });
}
