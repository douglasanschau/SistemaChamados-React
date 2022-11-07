import { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

function PrivateRoute({children, isPrivate}){

  const { signed, loading } = useContext(AuthContext);
 
  if(loading){
    return (
      <div>
      </div>
    )
  }

  if(!signed && isPrivate){
    return <Navigate to='/'/>
  }

  if(signed && !isPrivate){
    return <Navigate to='/dashboard' />
  }

  return children;

}

export default PrivateRoute;