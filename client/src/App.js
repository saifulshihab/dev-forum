import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AboutUs from './Screens/AboutUs';
import ForgotPassword from './Screens/ForgotPassword';
import LoginPage from './Screens/LoginPage';
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
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/regfirststep' component={RegFirstStep} />
          <Route path='/registration' component={RegPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/about' component={AboutUs} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
