import AuthLayout from './auth/AuthLayout';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import './globals.css'
import { Routes,Route } from 'react-router-dom';
import Home from './_root/pages/Home';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster";
import Explore from './_root/pages/Explore';
import Saved from './_root/pages/Saved';
import AllUsers from './_root/pages/AllUsers';
import CreatePost from './_root/pages/CreatePost';
import EditPost from './_root/pages/EditPost';
import PostDetails from './_root/pages/PostDetails';
import Profie from './_root/pages/Profie';
import UpdateProfile from './_root/pages/UpdateProfile';


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profie />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App