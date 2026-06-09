import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState(() => ({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    gender: user?.gender || '',
    about: user?.about || '',
    photoUrl: user?.photoUrl || '',
  }));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.patch(
        BASE_URL + '/profile/edit',
        formData,
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-sm items-center">
        <div className="card-body w-full">
          <h2 className="card-title text-center w-full">Edit Profile</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              name="about"
              placeholder="About yourself"
              className="textarea textarea-bordered"
              value={formData.about}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              name="photoUrl"
              placeholder="Photo URL"
              className="input input-bordered"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="mt-6 flex gap-3">
            <button className="btn btn-primary flex-1" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary flex-1"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
