import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/Post/PostDetail";
import Authors from "./pages/user/Authors";
import CreatePost from "./pages/Post/CreatePost";
import AuthorPosts from "./pages/user/AuthorPosts";
import Dashboard from "./pages/user/Dashboard";
import EditPost from "./pages/user/EditPost";
import ErrorPage from "./pages/util/ErrorPage.jsx";
import Register from "./pages/auth/Register";
import Layout from "./components/Layout";
import CategoryPosts from "./pages/Post/CategoryPosts";
import Login from "./pages/auth/Login";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/create" element={<CreatePost />} />
          <Route
            path="/posts/categories/:category"
            element={<CategoryPosts />}
          />
          <Route path="/posts/users/:id" element={<AuthorPosts />} />
          <Route path="/myposts/:id" element={<Dashboard />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
