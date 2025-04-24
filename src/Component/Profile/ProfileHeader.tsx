import { User } from "lucide-react";
import useAuthContext from "../../Hooks/useAuthContext";

const ProfileHeader = () => {
  const { user } = useAuthContext();
  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
          <User size={40} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
