import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Auth from './components/Auth'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import ProtectedRoute from './components/ProtectedRoute'
import "./App.css"
import PostForm from "./pages/PostForm"
import { UserContext } from './context/UserProvider'
import {ContentContext} from './context/ContentProvider'

export default function App(){
  const { token, logout } = useContext(UserContext)
  const { getAllPosts, getUserPosts} = useContext(ContentContext)




  return (
    <div className="app">
      {token && <Nav logout={logout}/>}
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <Profile />
            </ProtectedRoute>
            }
        />
        <Route 
          path="/home"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <Home />
            </ProtectedRoute>
            }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute token={token} redirectTo={"/"}>
              <PostForm />
            </ProtectedRoute>
          }
          />
        <Route
          path="/single-post"
          element={
            <ProtectedRoute token={token} redirectTo={"/"} path={'/single-post'}>
              <SinglePost />
            </ProtectedRoute>
          }
          />
        <Route
          path="/edit-post"
          element={
            <ProtectedRoute token={token} redirectTo={"/"} path={'/edit-post'}>
              <PostForm />
            </ProtectedRoute>
          }
          />
      </Routes>
    </div>
  )
}