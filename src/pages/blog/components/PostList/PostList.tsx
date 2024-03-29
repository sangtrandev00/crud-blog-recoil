import PostItem from '../PostItem'
import { Fragment, useEffect } from 'react';
import SkeletonPost from '../SkeletonPost';
import { useRecoilValue } from 'recoil';
import { getPostListAsync } from '../../../../store/blog_state';
import { useRecoilValueLoadable } from 'recoil';
// Gọi API trong useEffect()

// Nếu gọi thành công thì dispatch action type: "blog/getPostListSuccess"

// Nếu gọi thất bại thì dispatch action type: "blog/getPostListFailed"

export default function PostList() {
  // const postList = useSelector((state: RootState) => state.blog.postList);

  // const postList = useRecoilValue(getPostListAsync);
  const postListLoadable = useRecoilValueLoadable(getPostListAsync);
  // const loading = useSelector((state: RootState) => state.blog.loading);
  const loading = false;
  // const dispatch = useAppDispatch();

  // console.log(postList)

  // useEffect(() => {

  //  const promise =  dispatch(getPostList());

  //  return () => {
  //   promise.abort();
  //  }

  // }, [dispatch])

  if (postListLoadable.state === 'loading') {
    return <div><SkeletonPost/></div>;
  }

  if (postListLoadable.state === 'hasError') {
    return <div>Error: {postListLoadable.contents}</div>;
  }

  const postList = postListLoadable.contents;

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}

          {!loading && postList.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}

        </div>
      </div>
    </div>
  )
}
