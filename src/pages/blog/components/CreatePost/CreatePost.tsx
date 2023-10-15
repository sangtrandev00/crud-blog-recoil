import { useEffect, useState } from 'react';
import { Post } from '../../../../types/Post';
import { useRecoilRefresher_UNSTABLE, useRecoilStateLoadable, useRecoilValue, useSetRecoilState } from 'recoil';
import { addPostSelector, currentPostState, editingPostState, getPostListAsync, postListState } from '../../../../store/blog_state';
import { SubmitHandler, useForm } from 'react-hook-form';


interface ErrorForm {
  publishDate: string
}

const initialState: Post = {
  id: '',
  title: '',
  description: '',
  publishDate: '',
  featuredImage: '',
  published: false
}

export default function CreatePost() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Omit<Post, "id">>();

  const [formData, setFormData] = useState<Post>(initialState)

  const [errorForm, setErrorForm] = useState<null | ErrorForm>(null)
  // const [postList, setPostList] = useRecoilStateLoadable(postListState);
  const refresh = useRecoilRefresher_UNSTABLE(getPostListAsync);
  // if (addPostLoadable.state === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (addPostLoadable.state === 'hasError') {
  //   return <div>Error: {addPostLoadable.contents}</div>;
  // }

  // const addPostContents = addPostLoadable.contents;

  // console.log("addPostContents: ", addPostContents);
  // // const editingPost = useSelector((state: RootState) => state.blog.editingPost)

  const editingPost = useRecoilValue(editingPostState);
  const setEditingPost = useSetRecoilState(editingPostState);

  // const loading = useSelector((state: RootState) => state.blog.loading)
  const loading = false;
  // const dispatch = useAppDispatch()

  const handleSubmitOld = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postFormData = {
      title: formData.title,
      description: formData.description,
      publishDate: formData.publishDate,
      featuredImage: formData.featuredImage,
      published: formData.published
    }

    if (editingPost) {
      
      const formDataWithId = {
        ...formData,
        id: editingPost.id
      }

      const requestData = async () => {

        try {
          // const res = await dispatch(addPost(formData))
          // const result = unwrapResult(res);
          // console.log(result);
  
        const res = await fetch(`http://localhost:4000/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithId),
        });

        const result = await res.json();

        setErrorForm(null);
        setFormData(initialState)
        console.log(result);
        refresh();
      } catch (error: any) {
        console.log(error);

        setErrorForm(error.error);
      }

      }

      requestData();
    

      // dispatch(updatePost(formDataWithId)).unwrap().then((res)=> {
      //   console.log(res)
      //   setErrorForm(null);
      //   setFormData(initialState)
        
      // })
      // .catch((error) => {
      //   console.log(error)
      //   setErrorForm(error.error);
      // })

    } else {
       
        // setAddPost(postFormData);

        const requestData = async () => {

          try {
            // const res = await dispatch(addPost(formData))
            // const result = unwrapResult(res);
            // console.log(result);
    
          const res = await fetch('http://localhost:4000/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postFormData),
          });
          const result = await res.json();

          setErrorForm(null);
          setFormData(initialState)
          console.log(result);
          refresh();
        } catch (error: any) {
          console.log(error);
  
          setErrorForm(error.error);
          }
        }

        requestData();
    }
    
  }

  const onSubmit: SubmitHandler<Omit<Post, "id">> = (data) => {
    // console.log(data);
    const formData = data;
    const postFormData = {
      title: formData.title,
      description: formData.description,
      publishDate: formData.publishDate,
      featuredImage: formData.featuredImage,
      published: formData.published
    }

    if (editingPost.id) {
      
      const formDataWithId = {
        ...formData,
        id: editingPost.id
      }

      const requestData = async () => {

        try {
          // const res = await dispatch(addPost(formData))
          // const result = unwrapResult(res);
          // console.log(result);
  
        const res = await fetch(`http://localhost:4000/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithId),
        });

        const result = await res.json();

        setErrorForm(null);
        setFormData(initialState)
        console.log(result);
        refresh();
        setEditingPost(initialState);
      } catch (error: any) {
        console.log(error);

        setErrorForm(error.error);
      }

      }

      requestData();
    

      // dispatch(updatePost(formDataWithId)).unwrap().then((res)=> {
      //   console.log(res)
      //   setErrorForm(null);
      //   setFormData(initialState)
        
      // })
      // .catch((error) => {
      //   console.log(error)
      //   setErrorForm(error.error);
      // })

    } else {
       
        // setAddPost(postFormData);

        const requestData = async () => {

          try {
            // const res = await dispatch(addPost(formData))
            // const result = unwrapResult(res);
            // console.log(result);
    
          const res = await fetch('http://localhost:4000/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postFormData),
          });
          const result = await res.json();

          setErrorForm(null);
          setFormData(initialState)
          console.log(result);
          refresh();
        } catch (error: any) {
          console.log(error);
  
          setErrorForm(error.error);
          }
        }

        requestData();
    }
    

  };

  useEffect(() => {
    if(editingPost)  {
      setFormData(editingPost)
    }else {
      setFormData(initialState)
    }
  }, [editingPost])

  const cancelHandler = () => {
    // dispatch(cancelEditingPost());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          value={formData.title}
          {...register("title", {required: true})}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
        />
          {errors.title?.type === 'required' && <p className="mt-2 text-sm text-red-600" role="alert">Title is required</p>}
      </div>
      <div className='mb-6'>
        <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Featured Image
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          value={formData.featuredImage}
          {...register("featuredImage", {required: true})}
          onChange={(event) => setFormData((prev) => ({ ...prev, featuredImage: event.target.value }))}
        />
          {errors.featuredImage?.type === 'required' && <p className="mt-2 text-sm text-red-600" role="alert">Feature Image is required</p>}
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            value={formData.description}
            {...register("description", {required: true})}
            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          />
          {errors.description?.type === 'required' && <p className="mt-2 text-sm text-red-600" role="alert">Description is required</p>}
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className={`mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300 ${errorForm?.publishDate ? 'text-red-700' : 'text-gray-900'}`}>
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className={`block w-56 rounded-lg border p-2.5 text-sm ${errorForm?.publishDate ? 'border-red-500 text-red-500' : 'border-gray-300 bg-gray-50  text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'}`}
          placeholder='Title'
          value={formData.publishDate}
          {...register("publishDate", {required: true})}
          onChange={(event) => setFormData((prev) => ({ ...prev, publishDate: event.target.value }))}
        />
        
       {errorForm?.publishDate && (
         <p className={`error-message text-red-600`}>
            <span className="font-med">
              Lỗi! 
            </span> 
             {errorForm.publishDate}
         </p>
       )}
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          checked={formData.published}
          onChange={(event) => setFormData((prev) => ({ ...prev, published: event.target.checked }))}
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      <div>
        {!editingPost && (
          <button disabled = {loading}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800`}
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            
              <div role="status">
              {loading && (
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                <span className="sr-only">Loading...</span>
              </svg> 
              )}
              {!loading && (
                `Publish Post`
              )}
            </div>
            </span>

          </button>
        )}
        {editingPost && (
          <button
            type='submit'
            className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Update Post
            </span>
          </button>
        )}

        {editingPost && (
          <button
          onClick={cancelHandler}
            type='reset'
            className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Cancel
            </span>
          </button>
        )}
      </div>
    </form>
  )
}
