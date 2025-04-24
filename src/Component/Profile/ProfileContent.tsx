import { Delete, Mail, Save, User } from "lucide-react";
import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import UserDetailForm from "./userDetailForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfileContent = ({ activeTab }: { activeTab: string }) => {
  const { user, changePassword } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {activeTab === "profile" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <User className="text-gray-400" size={20} />
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user?.username}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <input
                  type="email"
                  disabled={true}
                  defaultValue={user?.email}
                  readOnly={true}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
              {isEditing ? (
                <>
                  <Save className="mr-2" size={16} />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </button>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                <Delete className="mr-2" size={16} />
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : activeTab === "details" ? (
        <UserDetailForm user={user} setIsEditing={setIsEditing} />
      ) : (
        <ChangePasswordForm user={user} changePassword={changePassword} />
      )}
    </div>
  );
};

export default ProfileContent;
