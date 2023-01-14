import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { devSignout, fetchDevProfile } from "../redux/action/DeveloperAction";
import { baseURL } from "../baseURL";
import { recSignout } from "../redux/action/RecruiterAction";
import logo from "../logo.svg";

const Header = () => {
  const dispatch = useDispatch();

  const [dpDropdown, setdpDropdown] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("devForum-theme") === "dark") {
      return true;
    } else {
      return false;
    }
  });

  const signInDev = useSelector((state) => state.signInDev);
  const { isAuthenticated, devInfo } = signInDev;

  const signInRec = useSelector((state) => state.signInRec);
  const { isAuthenticated: recIsAuthenticated } = signInRec;

  const devProfile = useSelector((state) => state.devProfile);
  const { user } = devProfile;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDevProfile(devInfo?._id));
    }
  }, [dispatch, devInfo?._id, isAuthenticated]);

  useEffect(() => {
    if (darkMode) {
      if (localStorage.getItem("devForum-theme") !== "dark") {
        localStorage.setItem("devForum-theme", "dark");
      }
    } else {
      localStorage.removeItem("devForum-theme");
    }
    // set theme
    if (localStorage.getItem("devForum-theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logoutHandler = () => {
    dispatch(devSignout());
  };

  const recLogoutHandler = () => {
    dispatch(recSignout());
  };

  const closeDD = () => {
    setdpDropdown(false);
  };

  const themeModeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="relative z-40 p-3 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-6 sm:h-10 lg:justify-start">
          <div className="flex items-center">
            <div className="sm:hidden md:block flex items-center justify-between w-full md:w-auto">
              <Link to="/" onClick={closeDD}>
                <span className="te-lg sm:text-xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                  DevForum
                </span>
              </Link>
            </div>
            <div className="hidden sm:block md:hidden">
              <Link to="/" onClick={closeDD}>
                <img className="mx-auto h-8 w-auto" src={logo} alt="DevForum" />
              </Link>
            </div>
          </div>

          <div className="flex items-center ml-auto">
            <div className="h-8 w-8 mr-2">
              <button
                onClick={themeModeHandler}
                className="focus:outline-none border dark:border-gray-600 dark:text-gray-100 w-full h-full rounded-full"
              >
                <i className="fas dark:far fa-sun"></i>
              </button>
            </div>
            {isAuthenticated ? (
              <div className="inline-block">
                <div>
                  <button
                    onClick={() => setdpDropdown((prev) => !prev)}
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full image_center"
                      src={
                        user?.user?.dp
                          ? baseURL + user?.user?.dp
                          : "https://picsum.photos/200"
                      }
                      alt="dp"
                    />
                  </button>
                  {dpDropdown && (
                    <div
                      onClick={() => setdpDropdown(false)}
                      className="fixed top-0 left-0 right-0 bottom-0 w-full"
                    ></div>
                  )}
                </div>
                <Transition
                  show={dpDropdown}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {({ ref }) => (
                    <div
                      ref={ref}
                      className="text-gray-600 text-sm dark:text-gray-300 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        onClick={closeDD}
                        to="/h/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-user-circle mr-2"></i>Profile
                      </Link>
                      <Link
                        onClick={closeDD}
                        to="/h"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                      </Link>
                      <Link
                        onClick={closeDD}
                        to="/h/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-cog mr-2"></i>Settings
                      </Link>

                      <p
                        onClick={logoutHandler}
                        className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                      </p>
                    </div>
                  )}
                </Transition>
              </div>
            ) : recIsAuthenticated ? (
              <div className="inline-block">
                <div className="">
                  <button
                    onClick={() => setdpDropdown((prev) => !prev)}
                    className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full image_center"
                      src={"https://picsum.photos/200"}
                      alt=""
                    />
                  </button>
                  {dpDropdown && (
                    <div
                      onClick={() => setdpDropdown(false)}
                      className="fixed top-0 left-0 right-0 bottom-0 w-full"
                    ></div>
                  )}
                </div>
                <Transition
                  show={dpDropdown}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {({ ref }) => (
                    <div
                      ref={ref}
                      className="text-gray-600 text-sm dark:text-gray-300 dark:bg-gray-700 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        onClick={closeDD}
                        to="/r/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-user-circle mr-2"></i>Profile
                      </Link>
                      <Link
                        onClick={closeDD}
                        to="/r"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                      </Link>
                      <Link
                        onClick={closeDD}
                        to="/r/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-cog mr-2"></i>Settings
                      </Link>

                      <p
                        onClick={recLogoutHandler}
                        className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                      </p>
                    </div>
                  )}
                </Transition>
              </div>
            ) : (
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Log in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
