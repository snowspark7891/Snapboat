/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_PROJECTID: string;
  readonly VITE_APPWRITE_URL: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_MEDIA_ID: string;
  readonly VITE_APPWRITE_USERS: string;
  readonly VITE_APPWRITE_POSTS: string;
  readonly VITE_APPWRITE_SAVES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

