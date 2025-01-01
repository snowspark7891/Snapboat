import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: "676076ff0013ca57dfd6", //import.meta.env.APPWRITE_PROJECTID, //    //try sotenv once okay
  project_url: "https://cloud.appwrite.io/v1", //  import.meta.env.APPWRITE_URL,
  project_databaseId: "6762a9a6003449f653f3", //import.meta.env.APPWRITE_DATABASE_ID,
  storage_Id: "6762a94600274de23c3f", //import.meta.env.APPWRITE_MEDIA_ID,
  userCollectionId: "6762aa9900225a49ac6d", //  import.meta.env.APPWRITE_USERS,
  postcollectionId: "6762aa040014b342c7e1", //  import.meta.env.APPWRITE_POSTS,
  savescollectionId: "6762aac0002a5fc31fe9", //import.meta.env.APPWRITE_SAVES,
};

//☝🏻there is some error in both these import short out it then only the request will send else everything is fine
//also change the below set end point🔴🔴🔴🔴🔴🔴🔴👇🏻

export const client = new Client();
//now configure the client
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.project_url);

// if (appwriteConfig.project_url) {
//   client.setEndpoint(appwriteConfig.project_url);
// } else {
//   console.error("Appwrite URL is not defined");
// }

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
