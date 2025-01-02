import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECTID, // Access env variables using import.meta.env
  project_url: import.meta.env.VITE_APPWRITE_URL,
  project_databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storage_Id: import.meta.env.VITE_APPWRITE_MEDIA_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS,
  postcollectionId: import.meta.env.VITE_APPWRITE_POSTS,
  savescollectionId: import.meta.env.VITE_APPWRITE_SAVES,
};



export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.project_url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

