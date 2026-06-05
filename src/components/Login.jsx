

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [email, setEmail] = useState("elon2019@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
        const response = await axios.post(BASE_URL +'/auth/login', {email, password},{withCredentials: true});
        dispatch(addUser(response.data));
        navigate('/');
    }catch(err){
        setError(err.response?.data || err.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="card w-96 bg-base-100 shadow-sm items-center ">
  <div className="card-body">
    
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email" placeholder="Email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type="password" placeholder="Password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <div className="mt-6">
      <button className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login