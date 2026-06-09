import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { addConnection } from '../utils/userConnectionsSlice';

const Connections = () => {
  const connections = useSelector((store) => store.userConnectionsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const getConnections = async () => {
      if (connections.length > 0) return;
      try {
        const res = await axios.get(BASE_URL + "/user/requests/connected", { withCredentials: true });
        dispatch(addConnection(res.data.data));
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConnections();
  }, [connections, dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Connections</h1>
      {connections.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p>No connections yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user) => (
            <div key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;