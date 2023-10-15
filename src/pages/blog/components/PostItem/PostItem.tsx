import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil"
import { Post } from "../../../../types/Post"
import { editingPostState, getPostListAsync } from "../../../../store/blog_state";

interface PostItemType {
  post: Post
}

export default function PostItem({ post }: PostItemType) {
  const { id, title, description, featuredImage, publishDate } = post
  const setEditingPost = useSetRecoilState(editingPostState);
  const refresh = useRecoilRefresher_UNSTABLE(getPostListAsync);
  const deleteHandler = () => {
    const isDeleted = window.confirm('Are you sure you want to delete this post with id: ' + id)

    if(isDeleted) {
      // dispatch(deletePost(id))
      console.log("delete", id);

      const requestData = async () => {

       try {
        const response = await fetch('http://localhost:4000/posts/' + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

        console.log(data);
        refresh();
       } catch (error) {
        console.log("error: ", error);
       }


      }

      requestData();

    }

    // dispatch(deletePost(id))
  }

  const editHandler = () => {
    console.log('edit: ', id)
    setEditingPost(post);
    // dispatch(startEditingPost(id))
  }

  return (
    <div post-id={id} className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
      <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48'>
        <img
          src={featuredImage}
          loading='lazy'
          alt='Muốn thành công thì khao khát thành công phải lớn hơn nỗi sợ bị thất bại.'
          className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-2 p-4 lg:p-6'>
        <span className='text-sm text-gray-400'>{publishDate}</span>
        <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
        <p className='text-gray-500'>{description}</p>
        <div>
          <div className='inline-flex rounded-md shadow-sm' role='group'>
            <button
              onClick={editHandler}
              type='button'
              className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
            >
              Edit
            </button>
            <button
              onClick={deleteHandler}
              type='button'
              className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
