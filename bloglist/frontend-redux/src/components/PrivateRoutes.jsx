import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BlogList from '../pages/BlogList'
import Blog from '../pages/Blog'
import UserList from '../pages/UserList'
import User from '../pages/User'
import Notification from './Notification'

const PrivateRoutes = () => (
  <>
    <Notification />
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<Blog />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
)

export default PrivateRoutes