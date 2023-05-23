import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".nav-menu"));
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-20 bg-white w-full md:static md:text-sm md:border-none ${
          state ? "shadow-lg rounded-b-xl md:shadow-none" : ""
        }`}
      >
        <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="Task"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="About"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  contact
                </Link>
              </li>

              <div className="flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0">
                <li>
                  <Link
                    to="Sign"
                    className="block mx-5 py-3 px-4 font-medium text-center text-white bg-gray-600 hover:bg-gray-500 active:bg-gray-700 active:shadow-none rounded-lg shadow md:inline"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="Login"
                    className="block py-3 px-4 font-medium text-center text-white bg-gray-600 hover:bg-gray-500 active:bg-gray-700 active:shadow-none rounded-lg shadow md:inline"
                  >
                    Login
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {state ? (
        <div
          className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setState(false)}
        ></div>
      ) : (
        ""
      )}
      {/* <DarkModeToggle /> */}
    </>
  );
};

export default Header;