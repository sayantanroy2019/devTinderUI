import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { addFeed, removeUserFromFeed } from '../utils/userFeedSlice';




const Feed = () => {
  const feed = useSelector((store) => store.userFeed)
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
        dispatch(addFeed(res.data.users));
        console.log(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getFeed();
  }, [dispatch]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {feed.length === 0 ? (
        <p className="text-gray-500">No new users found</p>
      ) : (
        <UserCard
          user={feed[0]}
          onInterested={() => handleSendRequest("interested", feed[0]._id)}
          onIgnored={() => handleSendRequest("ignored", feed[0]._id)}
        />
      )}
    </div>
  );
};

export default Feed;
