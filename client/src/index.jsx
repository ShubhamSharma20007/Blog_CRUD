import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from "./pages/Author";
import CreatePost from './pages/CreatePost';
import CategoryPosts from './pages/CategoryPost';
import AuthorPosts from "./pages/AuthorPost";
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import UserProvide from './Context/userContext';
import {ToastContainer} from "react-toastify"
const router = createBrowserRouter([
    {
        path:"/",
        element:<UserProvide>
            <ToastContainer />
          <Layout/>
          </UserProvide>,
        errorElement:<ErrorPage/>,
        
        children:[
          {index:true,element:<Home/>},
          {path:"posts/:id",element:<PostDetail/>},
          {path:"register",element:<Register/>},
          {path:"login",element:<Login/>},
          {path:"profile/:id",element:<UserProfile/>},
          {path:"authors",element:<Authors/>},
          {path:"create",element:<CreatePost/>},
          {path:"posts/categories/:category",element:<CategoryPosts/>},
          {path:"posts/users/:id",element:<AuthorPosts/>},
          {path:"myposts/:id",element:<Dashboard/>},
          {path:"posts/:id/edit",element:<EditPost/>},
          {path:"logout",element:<Register/>}
        ]
    },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

