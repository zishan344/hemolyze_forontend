import { Delete, Mail, Save, User } from "lucide-react";
import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import ChangePasswordForm from "./ChangePasswordForm";
import UserDetailForm from "./UserDetailForm";
import UserDetailsView from "./UserDetailsView";
import { activeTabType } from "../../types/Dashboard/profile.type";

const ProfileContent = ({ activeTab }: { activeTab: activeTabType }) => {
  const {
    user,
    changePassword,
    userDetail,
    updateUserProfileDetails,
    loading,
    errorMsg,
  } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      {activeTab === "details" ? (
        isEditing ? (
          <div>
            <UserDetailForm
              isEditing={isEditing}
              user={user}
              loading={loading}
              errorMsg={errorMsg ? String(errorMsg) : undefined}
              userDetail={userDetail}
              setIsEditing={setIsEditing}
              updateUserProfileDetails={updateUserProfileDetails}
            />
          </div>
        ) : (
          <div>
            <UserDetailsView userDetail={userDetail} />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                Edit Details
              </button>
            </div>
          </div>
        )
      ) : activeTab === "basicInfo" ? (
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
      ) : (
        <ChangePasswordForm
          loading={loading}
          user={user}
          changePassword={changePassword}
        />
      )}
    </div>
  );
};

export default ProfileContent;
