const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, Admin</h2>
        <div className="flex items-center">
          <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
          <button className="ml-4 bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
