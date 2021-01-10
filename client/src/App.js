import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RegFirstStep from './Screens/RegFirstStep';
import Welcome from './Screens/Welcome';
import WelComeHeader from './Screens/WelComeHeader';
import './styles/main.css';

function App() {
  return (
    <div>
      <WelComeHeader />
      <Switch>
        <Route path='/' exact component={Welcome} />
        <Route path='/regfirststep' component={RegFirstStep} />
      </Switch>
    </div>
  );
}

export default App;
