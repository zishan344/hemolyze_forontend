import {
  Activity,
  Delete,
  DropletIcon,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { UserDetailsType } from "../../globalType/AuthType";
import ErrorAlert from "../ErrorAlert";
import { UserDetailFormProps } from "../../types/Dashboard/profile.type";
import { bloodGroups } from "../../Global/GlobalVar";

const UserDetailForm = ({
  loading,
  errorMsg,
  isEditing,
  user,
  userDetail,
  updateUserProfileDetails,
  setIsEditing,
}: UserDetailFormProps) => {
  const {
    register: registerDetails,
    handleSubmit: handleDetailsSubmit,
    formState: { errors: detailsErrors },
  } = useForm<UserDetailsType>({
    defaultValues: {
      name: userDetail?.name || "",
      address: userDetail?.address || "",
      age: userDetail?.age || undefined,
      blood_group: userDetail?.blood_group || undefined,
      phone_number: userDetail?.phone_number || "",
      availability_status: userDetail?.availability_status,
    },
  });
  const onDetailsSubmit = async (data: UserDetailsType) => {
    try {
      if (!user) return;
      if (userDetail?.user === user.id) {
        const response = await updateUserProfileDetails(data, user.id);
        if (response?.success) {
          setIsEditing(false);
        }
      } else {
        const response = await updateUserProfileDetails(data);
        if (response?.success) {
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.log("Error updating user details", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleDetailsSubmit(onDetailsSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <User className="text-gray-400" size={20} />
            <input
              type="text"
              {...registerDetails("name", {
                required: "Name is required",
                maxLength: {
                  value: 150,
                  message: "Name cannot exceed 150 characters",
                },
              })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          {detailsErrors.name && (
            <p className="mt-1 text-sm text-red-600">
              {detailsErrors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <Phone className="text-gray-400" size={20} />
            <input
              type="tel"
              {...registerDetails("phone_number", {
                maxLength: {
                  value: 15,
                  message: "Phone number cannot exceed 15 characters",
                },
              })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          {detailsErrors.phone_number && (
            <p className="mt-1 text-sm text-red-600">
              {detailsErrors.phone_number.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <MapPin className="text-gray-400" size={20} />
            <input
              type="text"
              {...registerDetails("address", {
                required: "Address is required",
              })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          {detailsErrors.address && (
            <p className="mt-1 text-sm text-red-600">
              {detailsErrors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <div className="mt-1 flex items-center space-x-2">
            <Activity className="text-gray-400" size={20} />
            <input
              type="number"
              {...registerDetails("age")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium ">Blood Group</label>
          <div className="mt-1 flex items-center space-x-2">
            <DropletIcon className="text-gray-400" size={20} />
            <select
              {...registerDetails("blood_group", {
                required: "Blood group is required",
              })}
              className="select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-none">
              {/*  defaultValue="Pick a text editor"
              className="select select-secondary"> */}
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          {detailsErrors.blood_group && (
            <p className="mt-1 text-sm text-red-600">
              {detailsErrors.blood_group.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="checkbox"
              {...registerDetails("availability_status")}
              className="checkbox checkbox-primary"
            />
            <span className="text-sm text-gray-600">
              Available for blood donation
            </span>
          </div>
        </div>
      </div>

      <div className={`flex justify-end ${isEditing ? "gap-4" : ""}`}>
        <button
          disabled={loading}
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
          <Save className="mr-2" size={16} />
          {loading ? "saving..." : "Save Details"}
        </button>
        {isEditing && (
          <button
            disabled={loading}
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
            <Delete className="mr-2" size={16} />
            Cancel
          </button>
        )}
      </div>
      {errorMsg && <ErrorAlert message={errorMsg} />}
    </form>
  );
};

export default UserDetailForm;
