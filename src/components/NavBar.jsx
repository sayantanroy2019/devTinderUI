import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try{
         await axios.post(BASE_URL + '/auth/logout', {}, {withCredentials: true});
         dispatch(removeUser());
         navigate('/login');
      }catch(err){
        console.log(err);

      }
    }
    
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to = "/" className="btn btn-ghost text-xl">devTinder</Link>
  </div>
  <div className="flex gap-2 mr-4">
   
    {user && <span className="text-sm font-medium justify-center items-center flex">Welcome, {user.firstName}</span>}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/profile" className="justify-between" >
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to ="/connections">Connections</Link></li>
        <li><Link to ="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar;