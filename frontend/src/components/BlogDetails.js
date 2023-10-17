import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const BlogDetails = () => {
  const {id} = useParams()
  const [blogDetails, setBlogDetails] = useState('')
  const [ismyBlog, setisMyBlog] = useState(false)
  const userInfo = useSelector((state)=>state.auth.userInfo)

  const fetchPostDetails = async() => {
    const response = await fetch('http://localhost:5000/blog/'+id)
    const blogDetails = await response.json()
    const myBlog = blogDetails.author._id === userInfo.id
    setBlogDetails(blogDetails)
    setisMyBlog(myBlog)
  }
  useEffect(()=>{
    fetchPostDetails()
  }, [])

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-16 lg:px-8">
      {blogDetails && 
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{blogDetails.title}</h1>
          <p className="text-base mt-4 space-between font-semibold text-gray-600">{blogDetails.author.name} <br />Posted on <time>{format(new Date(blogDetails.createdAt), 'MMM d, yyyy HH:mm')}</time></p>
          <p className="mt-6 text-base leading-7 text-gray-600">{blogDetails.description}</p>
          <img src={'http://localhost:5000/'+blogDetails.cover} alt="" className="pt-6"/>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {ismyBlog && 
              <Link to={`/blog/edit/${blogDetails._id}`} className="flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Blog <PencilSquareIcon className="mx-auto h-4 w-4 ml-2" aria-hidden="true" />
            </Link> }
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </div>
      }
        
      </main>
  )
}

export default BlogDetails