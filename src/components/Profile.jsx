import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="card w-96 bg-white shadow-lg">
        <figure className="bg-gradient-to-b from-blue-400 to-blue-600 h-72 flex items-center justify-center">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-white text-6xl">👤</div>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-gray-800">
            {user.firstName} {user.lastName}
          </h2>

          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-semibold text-gray-500">Age</p>
              <p className="text-lg">{user.age || 'Not specified'}</p>
            </div>

            {user.gender && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Gender</p>
                <p className="text-lg">{user.gender}</p>
              </div>
            )}

            {user.about && (
              <div>
                <p className="text-sm font-semibold text-gray-500">About</p>
                <p className="text-base">{user.about}</p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="card-actions justify-between mt-6">
            <button
              className="btn btn-primary flex-1"
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
