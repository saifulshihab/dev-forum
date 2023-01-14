import "@pathofdev/react-tag-input/build/index.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";
import { baseURL } from "./baseURL";
import Header from "./Components/Header";
import PrivateRoute, { PrivateRoute2 } from "./Components/PrivateRoute";
import { LoggedUserProvider } from "./Context/LoggedUserProvider";
import { NewNotificationProvider } from "./Context/NewNotificationProvider";
import store from "./redux/store";
import ForgotPassword from "./Screens/ForgotPassword";
import HomeScreen from "./Screens/HomeScreen";
import LoginPage from "./Screens/LoginPage";
import RecoverPassword from "./Screens/RecoverPassword";
import RecoverPasswordRec from "./Screens/Recruiter/RecoverPasswordRec";
import RecruiterHomeScreen from "./Screens/Recruiter/RecruiterHomeScreen";
import RForgetPassword from "./Screens/Recruiter/RForgetPassword";
import RLoginScreen from "./Screens/Recruiter/RLoginScreen";
import RRegistrationScreen from "./Screens/Recruiter/RRegistrationScreen";
import RegFirstStep from "./Screens/RegFirstStep";
import RegPage from "./Screens/RegPage";
import Welcome from "./Screens/Welcome";

export const socket = io(baseURL);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <LoggedUserProvider>
          <NewNotificationProvider>
            <div className="bg-white w-full min-h-screen dark:bg-gray-900">
              <div className="max-w-7xl h-full mx-auto bg-white dark:bg-gray-900">
                <Header />
                <div className="w-full px-4 sm:px-6 h-auto lg:px-8">
                  <Route path="/" exact component={Welcome} />
                  <Route path="/regfirststep" component={RegFirstStep} />
                  <Route path="/registration" component={RegPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/re-login" component={RLoginScreen} />
                  <Route
                    path="/re-registration"
                    component={RRegistrationScreen}
                  />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route
                    path="/recover-password/:token"
                    component={RecoverPassword}
                  />
                  <Route
                    path="/recover-password-recruiter/:token"
                    component={RecoverPasswordRec}
                  />
                  <Route
                    path="/re-forgot-password"
                    component={RForgetPassword}
                  />
                  <PrivateRoute path="/h" component={HomeScreen} />
                  <PrivateRoute2 path="/r" component={RecruiterHomeScreen} />
                </div>
              </div>
            </div>
          </NewNotificationProvider>
        </LoggedUserProvider>
      </Router>
    </Provider>
  );
}

export default App;
