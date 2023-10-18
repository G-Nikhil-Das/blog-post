import React, { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setValue } from '../store/authSlice'

const EditBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/blog/'+id)
      .then(response => {
        response.json().then(post => {
          setTitle(post.title);
          setDescription(post.description);
        setFileName(post.cover)
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set('title', title);
    data.set('description', description);
    data.set('id', id);
    if (file?.[0]) {
        data.set('file', file?.[0]);
      }
    e.preventDefault();
    const response = await fetch('http://localhost:5000/blog/post/'+id, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      dispatch(setValue({value: 0}))
      navigate('/blog/'+id)
    }
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <form onSubmit={e => { handleSubmit(e) }}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        className="block flex-1 p-2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        onChange={(e)=>setTitle(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="desc"
                      name="desc"
                      rows={5}
                      value={description}
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e)=>setDescription(e.currentTarget.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {!fileName && <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />}
                      <div className="mt-4 flex text-sm leading-6 justify-center text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            {file && file[0] ? (<span>Uploaded {file[0].name} <br /></span>) : (fileName && <img src={'http://localhost:5000/'+fileName} alt="" className="pb-6"/>)}
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e)=>setFile(e.currentTarget.files)} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => {
                navigate('/blog/'+id)
              }} 
              type="button" 
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog