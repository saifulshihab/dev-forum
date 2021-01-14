import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AboutUs from './Screens/AboutUs';
import ForgotPassword from './Screens/ForgotPassword';
import HomeScreen from './Screens/HomeScreen';
import LoginPage from './Screens/LoginPage';
import PageNotFound from './Screens/PageNotFound';
import RegFirstStep from './Screens/RegFirstStep';
import RegPage from './Screens/RegPage';
import Welcome from './Screens/Welcome';
import WelComeHeader from './Screens/WelComeHeader';
import './styles/main.css';

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
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='/about' component={AboutUs} />
            <Route path='/h' component={HomeScreen} />          
            {/* <Route path="/*" component={PageNotFound}  /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
