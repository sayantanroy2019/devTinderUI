import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { addFeed } from '../utils/userFeedSlice';




const Feed = () => {
  const feed = useSelector((store) => store.userFeed)
  const dispatch = useDispatch();

  



  useEffect(() => {
    const getFeed = async () => {
      if (feed.length > 0) return;
      try {
        const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
        dispatch(addFeed(res.data.users));
        console.log(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getFeed();
  }, [feed, dispatch]);



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;