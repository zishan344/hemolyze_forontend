import { Activity, DropletIcon, MapPin, Phone, Save, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { userDataType, UserDetails } from "../../globalType/AuthType";

interface UserDetailFormProps {
  user: userDataType | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDetailForm = ({ user, setIsEditing }: UserDetailFormProps) => {
  const {
    register: registerDetails,
    handleSubmit: handleDetailsSubmit,
    formState: { errors: detailsErrors },
  } = useForm<UserDetails>();
  const onDetailsSubmit = async (data: UserDetails) => {
    await user;
    console.log(data); // TODO: Implement update user details API call
    setIsEditing(false);
  };
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
          <Save className="mr-2" size={16} />
          Save Details
        </button>
      </div>
    </form>
  );
};

export default UserDetailForm;
