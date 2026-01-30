import {  NavLink } from "react-router-dom";
import { friendSuggestions } from "../data";

const HomePage = () => {
  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      {friendSuggestions.map((element, index) => (
        <>
        <NavLink to={`/profile/${element.id}/`}>
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Profile picture */}
          <img
            src={element.profilePic}
            alt={element.username}
            className="w-16 h-16 rounded-full object-cover"
          />

          {/* Username and full name */}
          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold text-gray-900">
              {element.username}
            </h2>
            <p className="text-sm text-gray-500">{element.fullName}</p>
            <p className="text-xs text-gray-400">{element.suggestionReason}</p>
          </div>

          {/* Follow button */}
          <div>
            <button
              className="px-4 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              Follow
            </button>
          </div>
        </div>
        </NavLink>
        </>
    ))}
    </div>
  );
};

export default HomePage;
