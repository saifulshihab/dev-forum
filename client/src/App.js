import React from 'react';
import './styles/main.css';
import '@pathofdev/react-tag-input/build/index.css';
import './App.css';
import { Route } from 'react-router-dom';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/LoginPage';
import RegFirstStep from './Screens/RegFirstStep';
import RegPage from './Screens/RegPage';
import Welcome from './Screens/Welcome';
import Header from './Components/Header';
import PrivateRoute, { PrivateRoute2 } from './Components/PrivateRoute';
import RLoginScreen from './Screens/Recruiter/RLoginScreen';
import RRegistrationScreen from './Screens/Recruiter/RRegistrationScreen';
import RForgetPassword from './Screens/Recruiter/RForgetPassword';
import RecruiterHomeScreen from './Screens/Recruiter/RecruiterHomeScreen';
import RecoverPassword from './Screens/RecoverPassword';
import RecoverPasswordRec from './Screens/Recruiter/RecoverPasswordRec';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');

function App() {
  return (
    <div className="bg-white w-full min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl h-full mx-auto bg-white dark:bg-gray-900">
        <Header />
        <div className="w-full px-4 sm:px-6 h-auto lg:px-8">
          <Route path="/" exact component={Welcome} />
          <Route path="/regfirststep" component={RegFirstStep} />
          <Route path="/registration" component={RegPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/re-login" component={RLoginScreen} />
          <Route path="/re-registration" component={RRegistrationScreen} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/recover-password/:token" component={RecoverPassword} />
          <Route
            path="/recover-password-recruiter/:token"
            component={RecoverPasswordRec}
          />
          <Route path="/re-forgot-password" component={RForgetPassword} />
          <PrivateRoute path="/h" component={HomeScreen} />
          <PrivateRoute2 path="/r" component={RecruiterHomeScreen} />
        </div>
      </div>
    </div>
  );
}

export default App;
