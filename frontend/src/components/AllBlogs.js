import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import { Link } from 'react-router-dom';

const AllBlogs = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/blog/getPosts').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-3 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-16 pb-10 sm:pb-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.length > 0 && posts.map(post => (
          <Link to={`/blog/${post._id}`}  key={post._id}>
            <article className="flex max-w-xl flex-col items-start justify-between border-neutral-400 border p-2 border-dotted rounded-md">
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
            </div>
            <div className="group overflow-hidden flex h-24 w-full sm:h-40 relative pt-3">
              <img src={'http://localhost:5000/'+post.cover} alt="" className="object-cover object-center w-full"/>
            </div>
            <div className="group relative">
              <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                {post.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
            </div>
            <div className="relative mt-3 flex items-center gap-x-4">
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0"></span>
                  {post.author.name}
                </p>
              </div>
            </div>
            </article>
          </Link>
        ))}
        </div>
      </div>
    </div>
  )
}

export default AllBlogs