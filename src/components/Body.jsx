
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;
      try {
        const response = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
        dispatch(addUser(response.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        }
        console.log(err);
      }
    };
    fetchUser();
  }, [userData, dispatch, navigate]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>

  )
}

export default Body;