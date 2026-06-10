import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      const response = await axios.post(BASE_URL + '/auth/login', { email, password }, { withCredentials: true });
      dispatch(addUser(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleSignup = async () => {
    try {
      setError('');
      await axios.post(BASE_URL + '/auth/signup', { firstName, lastName, email, password }, { withCredentials: true });
      setIsLoginForm(true);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-2">
            {isLoginForm ? 'Login' : 'Sign Up'}
          </h2>

          {!isLoginForm && (
            <>
              <div className="form-control">
                <label className="label"><span className="label-text">First Name</span></label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-4">
            <button
              className="btn btn-primary btn-block"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <p className="text-center text-sm mt-2">
            {isLoginForm ? "Don't have an account? " : 'Already have an account? '}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => { setError(''); setIsLoginForm(!isLoginForm); }}
            >
              {isLoginForm ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
