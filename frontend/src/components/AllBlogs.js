import React from 'react'
import { useSelector } from 'react-redux'

const AllBlogs = () => {
   
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <div>{isLoggedIn} {JSON.stringify(userInfo)} AllBlogs</div>
  )
}

export default AllBlogs