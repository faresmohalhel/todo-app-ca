import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
        <div className="max-w-lg sm:mx-auto sm:text-center">
          <img
            src="https://www.floatui.com/logo.svg"
            className="w-32 sm:mx-auto"/>
        </div>
        <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
          <li>
            <Link to="/" className="block text-gray-700 hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="task"
              className="block text-gray-700 hover:text-indigo-600"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="about"
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
        </ul>
        <div className="mt-8 items-center justify-between sm:flex">
          <div className="mt-4 sm:mt-0">
            &copy; 2022 Float UI All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
