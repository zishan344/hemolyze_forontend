import {
  Activity,
  DropletIcon,
  MapPin,
  Phone,
  User,
  Calendar,
  Check,
} from "lucide-react";
import { UserDetailsDataType } from "../../globalType/AuthType";

const UserDetailsView = ({
  userDetail,
}: {
  userDetail: UserDetailsDataType | null;
}) => {
  if (!userDetail) {
    return (
      <div className="text-center p-4">
        <p>No user details available.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <User className="text-gray-400" size={20} />
            <p className="text-gray-900">{userDetail.name}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <Phone className="text-gray-400" size={20} />
            <p className="text-gray-900">
              {userDetail.phone_number || "Not provided"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <MapPin className="text-gray-400" size={20} />
            <p className="text-gray-900">{userDetail.address}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <div className="mt-1 flex items-center space-x-2">
            <Activity className="text-gray-400" size={20} />
            <p className="text-gray-900">{userDetail.age || "Not provided"}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <DropletIcon className="text-gray-400" size={20} />
            <p className="text-gray-900">{userDetail.blood_group}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Donation Date
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <Calendar className="text-gray-400" size={20} />
            <p className="text-gray-900">
              {userDetail.last_donation_date || "No donation recorded"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <Check className="text-gray-400" size={20} />
            <p className="text-gray-900">
              {userDetail.availability_status
                ? "Available for donation"
                : "Not available for donation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsView;
