import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/Types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity } from "appwrite";
import { Query } from "appwrite";
// import { log } from "console";
// import { data } from "react-router-dom";
// import { error } from "console";
// import { read } from "fs";

// import { Captions } from "lucide-react";
// import { string } from "zod";

//account creation
export async function createUserAccount(user: INewUser) {
  //this is our custum interface or type provided to the user
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    // const avatarUrl = avatars.getInitials

    //now lets create the new user along with profile account and all

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUsertoDb({
      //to db
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: new URL(avatarUrl), //====================================
      username: user.username,
    });
    console.log("user is now created and method called");

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
//linked to data base
export async function saveUsertoDb(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL; //URL========================
  username: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    console.log("user is now saved to db");
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    console.log("session is created email password going to be verified");
    console.log("sucessful log in");
    console.log(session);

    return session;
  } catch (error) {
    console.log(error);
  }
}
// TypeError: account.createEmailSession is not a function
//     at signInAccount (api.ts:68:34)
//     at Object.mutationFn (quaresandMutaition.ts:20:59)
//     at Object.fn (mutation.ts:170:29)
//     at run (retryer.ts:153:49)
//     at Object.start (retryer.ts:218:9)
//     at _a6.execute (mutation.ts:208:40)
//     at async onSubmit (SignUp.tsx:55:22)
//     at async createFormControl.ts:1193:11

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    console.log("is called");
    return session;
  } catch (error) {
    console.log(error);
  }
}
export async function getCurrentAccount() {
  // check for user exist or not
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    console.log(currentAccount + "now the user is beinng get");

    const currentUser = await databases.listDocuments(
      appwriteConfig.project_databaseId, //we have to pass the database and collection the the qury or what we need to get
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    console.log("current user is", currentUser);

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    //uploadimage to the storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    //get fileUrl
    const fileUrl = await getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    //convert tages to array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //save the new post to db
    const newPost = await databases.createDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: new URL(fileUrl), //=====================================
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    console.log("post upload created");

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storage_Id,
      ID.unique(),
      file
    );
    console.log("file is uploaded");
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

//export function getFilePreview(fileId: string){

export async function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storage_Id,
      fileId,
      2000,
      2000,
      "top" as ImageGravity,
      100
    );

    console.log("fileurl is uploaded", fileUrl);
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storage_Id, fileId);

    return { status: "success" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPost() {
  const post = await databases.listDocuments(
    appwriteConfig.project_databaseId,
    appwriteConfig.postcollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!post) {
    throw Error;
  }

  return post;
}

export async function likedPost(postId:string , likesArray:string[]) {
  try {
    const updztedPost = await databases.updateDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      postId,
      {
        likes:likesArray
      }
    )

    if(!updztedPost) throw Error;

     return updztedPost;
  } catch (error) {
    console.log(Error);
    
  }
}


export async function savedPost(postId: string, userId:string) {
  try {
    const savesPost = await databases.createDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.savescollectionId,
      ID.unique(),
      {
        user:userId,
        post:postId,
      }
    );

    if (!savesPost) throw Error;

    return savesPost;
  } catch (error) {
    console.log(Error);
  }
}

export async function getpostByID(postId:string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      postId,
    )

    if(!post) throw Error;

    return post;
  } catch (error) {
    console.log(Error);
    
  }
}

export async function deleteSavedPost(savedRecordId:string) {
  try {
    const satusCode = await databases.deleteDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.savescollectionId,
      savedRecordId,
    );

    if (!satusCode) throw Error;

    return {status : 'ok'};
  } catch (error) {
    console.log(Error);
  }
}

export async function updatePost(post:IUpdatePost) {
  //check is the user update the img or just the content text in both cases ,have to work
  const hasFileToUpadte = post.file.length > 0;
  try {
    let image= {
      imageUrl : post.imageUrl,
      imageId: post.imageId,
    }

    if(hasFileToUpadte){
      //uploadimage to the
      //  storag
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      //get fileUrl
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = {...image, imageUrl: new URL(fileUrl), imageId: uploadedFile.$id}
    }
   
    //convert tages to array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //save the new post to db
    const updatedPost = await databases.updateDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      post.postId,
      {
        
        caption: post.caption,
        imageUrl: image.imageUrl, //=====================================
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );
    if (!updatedPost) {
      await deleteFile(image.imageId);
      throw Error;
    }
    console.log("post upload created");

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePostHere(postId:string , imageId:string) {
   if(!postId || !imageId) throw Error;

   try {
     await databases.deleteDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      postId
     )

     return {status : ' post was successfuly deleted'}
   } catch (error) {
     console.log(Error);
     
   }
}

export async function getInfinitePost({pageParam}:{pageParam:number}) {
  const queries: any[] = [Query.orderDesc('$updatedAt'),Query.limit(10)]
  if(pageParam){
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const post = await databases.listDocuments(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      queries
    )
    if(!post) throw Error;

    return post;
  } catch (error) {
    console.log(Error);
    
  }
}

export async function getSearchPost(searchTerm : string) {
 

  try {
    const post = await databases.listDocuments(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      [Query.search('caption',searchTerm)]
    );
    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(Error);
  }
}








export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.project_databaseId,
      appwriteConfig.postcollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.project_databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}


export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: new URL(fileUrl), imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.project_databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

//Why it gives error
// at imageUrl in the saveUsertoDb function, because imageUrl expects a valid URL.
/** 
 * When you try to use avatarUrl in the commented version, it is not a valid URL or string; it's merely a reference to the getInitials method itself, not its output.

This causes an error when you later try to assign avatarUrl to imageUrl in the saveUsertoDb function, because imageUrl expects a valid URL.

Summary:
Commented Version: const avatarUrl = avatars.getInitials is incomplete and incorrect because it does not actually generate or contain a URL.

Actual Version: const avatarUrl = new URL(avatars.getInitials(user.name, 100, 100, "blue")); correctly generates a URL string from the method and converts it into a URL object.

Hope that clears thing


The avatars.getInitials(user.name, 100, 100, "blue") function is expected to return a URL string (like "https://example.com/avatar?name=John&size=100&color=blue"). The new URL() constructor then converts this string into a URL object, which you can easily work with in JavaScript.

However, if you try to directly convert values like a name or an email into a URL object without a proper URL string, it wouldn't make sense because those are not URLs. For example:

typescript
const nameUrl = new URL(user.name); // This would fail unless user.name is a valid URL string
const emailUrl = new URL(user.email); // This would also fail unless user.email is a valid URL string
The new URL() constructor only works if the string passed to it is a valid URL. So, you can't directly convert arbitrary strings like names or emails to URLs unless they are already formatted as URLs.

In summary, using new URL() ensures that the string you're working with is a valid URL. But you need to make sure that the string being passed is already a URL or can be formed into one. Otherwise, you'll get an error.
*/
