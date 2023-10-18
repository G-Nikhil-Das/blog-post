import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from "date-fns";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button } from '@mui/material';

const BlogDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [blogDetails, setBlogDetails] = useState('')
  const [ismyBlog, setisMyBlog] = useState(false)
  const [comment, setComment] = useState('')
  const userInfo = useSelector((state)=>state.auth.userInfo)

  const fetchBlogDetails = async() => {
    const response = await fetch('http://localhost:5000/blog/'+id)
    const blogDetails = await response.json()
    const myBlog = blogDetails.author._id === userInfo.id
    setBlogDetails(blogDetails)
    setisMyBlog(myBlog)
  }
  useEffect(()=>{
    fetchBlogDetails()
  }, [])

  const addCommentHandler = async(e) => {
    const data = new FormData();
    data.set('comment', comment);
    data.set('id', id);
    data.set('name', userInfo.name);
    e.preventDefault();
    const response = await fetch('http://localhost:5000/blog/post/'+id, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      fetchBlogDetails()
      setComment('')
    }
  }

  const onDeleteHandler = async() => {
    const response = await fetch('http://localhost:5000/blog/delete/'+id, {
      method: 'DELETE',
    })
    if(response.ok)
      navigate('/')
  }

  return (<>
    <main className="grid min-h-full bg-white px-6 py-24 sm:py-16 lg:px-8">
      {blogDetails && 
        <>
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{blogDetails.title}</h1>
            <p className="text-base mt-4 space-between font-semibold text-gray-600">{blogDetails.author.name} <br />Posted on <time>{format(new Date(blogDetails.createdAt), 'MMM d, yyyy HH:mm')}</time></p>
            <p className="mt-6 text-base leading-7 text-gray-600">{blogDetails.description}</p>
            <p className="flex justify-center pt-6"><img src={'http://localhost:5000/'+blogDetails.cover} alt="" /></p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {ismyBlog && <>
                <Link to={`/blog/edit/${blogDetails._id}`} className="flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Edit Blog <PencilSquareIcon className="mx-auto h-4 w-4 ml-2" aria-hidden="true" />
                </Link> 
                <Button onClick={onDeleteHandler} className="capitalize flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Delete Blog <TrashIcon className="mx-auto h-4 w-4 ml-2" aria-hidden="true" />
                </Button>
              </>}
            </div>
          </div>
          {blogDetails.comments && blogDetails.comments.length > 0 && (
            <div className="text-left place-items-start"> <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">Comments</h1>
              {blogDetails.comments.map((comment,ind) => (
                <div key={ind} className="flex min-w-0 gap-x-4 my-4">
                  <UserCircleIcon className="mx-auto h-12 w-12" aria-hidden="true" />
                  <div className="min-w-0 flex-auto">
                    <p className="font-semibold leading-6 text-gray-900">{comment.author}</p>
                    <p className="mt-1 leading-5 text-gray-500">{comment.details}</p>
                  </div>
              </div>
              ))}
            </div>
          )}
          {!ismyBlog && <div className="text-left place-items-start"> 
            <div className="flex min-w-0 gap-x-4 my-4">
              <UserCircleIcon className="mx-auto h-12 w-12" aria-hidden="true" />
              <div className="min-w-0 flex-auto">
                <div className="col-span-full">
                  <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                    Add Comment
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="desc"
                      name="desc"
                      rows={3}
                      value={comment}
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e)=>setComment(e.currentTarget.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button variant="contained" className="float-right" onClick={addCommentHandler} sx={{ borderRadius: 10 }}>Add Comment</Button>
          </div>}
          
        </>
      }
        
      </main>
      
    </>
  )
}

export default BlogDetails