import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { addRequest, removeRequest } from '../utils/userRequestsSlice';

const Requests = () => {
  const requests = useSelector((store) => store.userRequestsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
        dispatch(addRequest(res.data.pendingRequests));
        console.log(res.data.pendingRequests);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
  }, [dispatch]);

  const handleRequestAction = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Received Requests</h1>
      {requests.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p>No received requests  yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div key={request._id}>
              <UserCard
                user={request.fromUserId}
                type="request"
                onAccept={() => handleRequestAction(request._id, "accepted")}
                onReject={() => handleRequestAction(request._id, "rejected")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
