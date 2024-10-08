import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const AuthLayout = ({ title, link, linkName, children }) => {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 ">
              <Link
                to={link}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>{linkName}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
AuthLayout.propTypes = {
  link: PropTypes.string,
  linkName: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};
export default AuthLayout;
