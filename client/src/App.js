import React from 'react';
import { Route } from 'react-router-dom';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/LoginPage';
import RegFirstStep from './Screens/RegFirstStep';
import RegPage from './Screens/RegPage';
import Welcome from './Screens/Welcome';
import WelComeHeader from './Screens/WelComeHeader';
import PrivateRoute, { PrivateRoute2 } from './Components/PrivateRoute';
import './styles/main.css';
import '@pathofdev/react-tag-input/build/index.css';
import './App.css';
import RLoginScreen from './Screens/Recruiter/RLoginScreen';
import RRegistrationScreen from './Screens/Recruiter/RRegistrationScreen';
import RForgetPassword from './Screens/Recruiter/RForgetPassword';
import RecruiterHomeScreen from './Screens/Recruiter/RecruiterHomeScreen';
import RecoverPassword from './Screens/RecoverPassword';
import RecoverPasswordRec from './Screens/Recruiter/RecoverPasswordRec';

function App() {
  return (
    <div className='bg-white w-full h-full dark:bg-gray-900'>
      <div className='max-w-7xl h-full min-h-screen mx-auto bg-white dark:bg-gray-900'>
        <WelComeHeader />
        <div className='relative px-4 sm:px-6 lg:px-8'>
          <Route path='/' exact component={Welcome} />
          <Route path='/regfirststep' component={RegFirstStep} />
          <Route path='/registration' component={RegPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/re-login' component={RLoginScreen} />
          <Route path='/re-registration' component={RRegistrationScreen} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/recover-password/:token' component={RecoverPassword} />
          <Route
            path='/recover-password-recruiter/:token'
            component={RecoverPasswordRec}
          />
          <Route path='/re-forgot-password' component={RForgetPassword} />
          <PrivateRoute path='/h' component={HomeScreen} />
          <PrivateRoute2 path='/r' component={RecruiterHomeScreen} />
        </div>
      </div>
    </div>
  );
}

export default App;
