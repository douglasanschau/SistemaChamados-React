import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import New from '../pages/New';
import Profile from '../pages/Profile';

function RoutesApp(){
    return(
      <Routes>

          {/* Open Routes */}
          <Route path='/' element={ <PrivateRoute isPrivate={false}><SignIn /></PrivateRoute>} />
          <Route path='/register' element={<PrivateRoute isPrivate={false}><SignUp/></PrivateRoute>} />

          {/* Private Routes */}
          <Route path='/dashboard' element={<PrivateRoute isPrivate={true}><Dashboard/></PrivateRoute>} />
          <Route path='/customers' element={<PrivateRoute isPrivate={true}><Customers/></PrivateRoute>} />
          <Route path='/new' element={<PrivateRoute isPrivate={true}><New/></PrivateRoute>} />
          <Route path='/new/:id' element={<PrivateRoute isPrivate={true}><New/></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute isPrivate={true}><Profile/></PrivateRoute>} />

      </Routes>
    );
}

export default RoutesApp;