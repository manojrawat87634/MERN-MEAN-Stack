import { useParams } from "react-router-dom";
import { friendSuggestions } from "../data";

const ProfilePage = () => {
    const { id } = useParams();
    const user_data = friendSuggestions.find((e) => e.id == id);

    if (!user_data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Profile isn't available
                </h1>
                <p className="text-gray-500">
                    The link may be broken or the profile may have been removed.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen mt-10 px-4">
            {/* Profile Picture */}
            <img
                src={user_data.profilePic}
                alt={user_data.username}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
            />

            {/* Username */}
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user_data.username}
            </h2>

            {/* Full Name */}
            <p className="text-gray-500 mb-2">{user_data.fullName}</p>

            {/* Additional Info */}
            <p className="text-sm text-gray-400 text-center max-w-xs">
                {user_data.suggestionReason || "No additional info available."}
            </p>

            {/* Follow Button */}
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
                Follow
            </button>
        </div>
    );
};

export default ProfilePage;
