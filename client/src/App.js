import React from 'react';
import { Route } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/LoginPage';
// import PageNotFound from './Screens/PageNotFound';
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

function App() {
  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <WelComeHeader />
        <div className='relative px-4 sm:px-6 lg:px-8'>
          <Route path='/' exact component={Welcome} />
          <Route path='/regfirststep' component={RegFirstStep} />
          <Route path='/registration' component={RegPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/re-login' component={RLoginScreen} />
          <Route path='/re-registration' component={RRegistrationScreen} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/re-forgot-password' component={RForgetPassword} />
          <Route path='/about' component={AboutUs} />
          <PrivateRoute path='/h' component={HomeScreen} />
          <PrivateRoute2 path='/r' component={RecruiterHomeScreen} />
        </div>
      </div>
    </div>
  );
}

export default App;
