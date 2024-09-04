import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import userInfo from './getUserDetails';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/slices/userSlice'
const Protected = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect( () => {
    (
      async () => {
         const token = localStorage.getItem('chatAppToken');
    if (token) {
      setIsAuthenticated(true);
      const temp=await userInfo(token);
      dispatch(setAuthUser(temp));
    } else {
      setIsAuthenticated(false);
      navigate('/');
    }
      }
    )();
  }, [navigate]);

  if (isAuthenticated === null) {
    // While authentication state is being determined, you can show a loading spinner or similar.
    return <div>Loading...</div>;
  }

 
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default Protected;
