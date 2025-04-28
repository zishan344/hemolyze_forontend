import { useState } from "react";
import {
  Calendar,
  DropletIcon,
  Info,
  MapPin,
  User,
  Phone,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { bloodGroups } from "../../Global/GlobalVar";
import ErrorAlert from "../ErrorAlert";
import SuccessAlert from "../SuccessAlert";
import useAuthContext from "../../Hooks/useAuthContext";
import {
  BloodRequestFormValues,
  RequestRecord,
} from "./BloodRequest/BloodRequestType";
import authApiClient from "../../Service/authApiClient";

interface BloodRequestFormProps {
  onRequestSubmitted?: () => void;
  requestToUpdate?: RequestRecord | null;
  isModal?: boolean; // Add new prop to indicate if displayed in modal
}

const BloodRequestForm = ({
  onRequestSubmitted,
  requestToUpdate,
  isModal = false,
}: BloodRequestFormProps) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(
    requestToUpdate?.progress_percentage || 0
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BloodRequestFormValues>({
    defaultValues: requestToUpdate
      ? {
          requester_name: requestToUpdate.name,
          blood_group: requestToUpdate.blood_group,
          units_needed: requestToUpdate.required_units,
          urgency_level: requestToUpdate.urgency_level,
          hospital_name: requestToUpdate.hospital_name,
          hospital_address: requestToUpdate.hospital_address,
          needed_by_date: requestToUpdate.date.split("T")[0],
          contact_number: requestToUpdate.phone,
          notes: requestToUpdate.description,
        }
      : {
          requester_name: user?.username || "",
          units_needed: 1,
          urgency_level: "normal",
        },
  });

  const onSubmit = async (data: BloodRequestFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Prepare request payload to match API expectations based on Django model
      const requestData = {
        name: data.requester_name,
        blood_group: data.blood_group,
        required_units: data.units_needed,
        urgency_level: data.urgency_level,
        phone: data.contact_number,
        hospital_address: data.hospital_address,
        hospital_name: data.hospital_name,
        description: data.notes || "",
        date: data.needed_by_date,
      };

      let response;

      // If we have a request to update, use PATCH request, otherwise POST for new request
      if (requestToUpdate) {
        response = await authApiClient.patch(
          `/blood-request/${requestToUpdate.id}/`,
          requestData
        );
        setSuccess("Blood request updated successfully!");
      } else {
        response = await authApiClient.post("/blood-request/", requestData);
        setSuccess(
          "Blood request submitted successfully! Donors will be notified."
        );
      }

      // If the API returns the progress percentage
      if (response.data && response.data.progress_percentage !== undefined) {
        setProgressPercentage(response.data.progress_percentage);
      }

      // Only reset form for new requests, not updates
      if (!requestToUpdate) {
        reset();
      }

      // Notify parent component if callback provided
      if (onRequestSubmitted) {
        onRequestSubmitted();
      }

      // Use setTimeout to clear the success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err: unknown) {
      console.error("Error handling blood request:", err);
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
      };
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          `Failed to ${
            requestToUpdate ? "update" : "submit"
          } blood request. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate min date (today) and max date (3 months from now)
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div className={`${isModal ? "" : "bg-base-100 shadow-md rounded-lg p-6"}`}>
      {!isModal && (
        <h2 className="text-2xl font-bold mb-6">Request Blood Donation</h2>
      )}

      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requester Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Requester Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                className={`input input-bordered w-full pl-10 ${
                  errors.requester_name ? "input-error" : ""
                }`}
                placeholder="Full Name"
                {...register("requester_name", {
                  required: "Requester name is required",
                })}
              />
            </div>
            {errors.requester_name && (
              <p className="mt-1 text-sm text-error">
                {errors.requester_name.message}
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Blood Group Needed
            </label>
            <div className="relative">
              <DropletIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className={`select select-bordered w-full pl-10 ${
                  errors.blood_group ? "select-error" : ""
                }`}
                {...register("blood_group", {
                  required: "Blood group is required",
                })}>
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            {errors.blood_group && (
              <p className="mt-1 text-sm text-error">
                {errors.blood_group.message}
              </p>
            )}
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Urgency Level
            </label>
            <div className="relative">
              <AlertCircle
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className={`select select-bordered w-full pl-10 ${
                  errors.urgency_level ? "select-error" : ""
                }`}
                {...register("urgency_level", {
                  required: "Urgency level is required",
                })}>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            {errors.urgency_level && (
              <p className="mt-1 text-sm text-error">
                {errors.urgency_level.message}
              </p>
            )}
          </div>

          {/* Hospital Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Hospital Name
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.hospital_name ? "input-error" : ""
              }`}
              placeholder="Name of the hospital"
              {...register("hospital_name", {
                required: "Hospital name is required",
              })}
            />
            {errors.hospital_name && (
              <p className="mt-1 text-sm text-error">
                {errors.hospital_name.message}
              </p>
            )}
          </div>

          {/* Hospital Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Hospital Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                className={`input input-bordered w-full pl-10 ${
                  errors.hospital_address ? "input-error" : ""
                }`}
                placeholder="Hospital address"
                {...register("hospital_address", {
                  required: "Hospital address is required",
                })}
              />
            </div>
            {errors.hospital_address && (
              <p className="mt-1 text-sm text-error">
                {errors.hospital_address.message}
              </p>
            )}
          </div>

          {/* Needed By Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Needed By Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="date"
                className={`input input-bordered w-full pl-10 ${
                  errors.needed_by_date ? "input-error" : ""
                }`}
                min={minDate}
                max={maxDateString}
                {...register("needed_by_date", {
                  required: "Date is required",
                })}
              />
            </div>
            {errors.needed_by_date && (
              <p className="mt-1 text-sm text-error">
                {errors.needed_by_date.message}
              </p>
            )}
          </div>

          {/* Units Needed */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Units Needed
            </label>
            <div className="relative">
              <DropletIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="number"
                className={`input input-bordered w-full pl-10 ${
                  errors.units_needed ? "input-error" : ""
                }`}
                min="1"
                max="10"
                readOnly={true}
                {...register("units_needed", {
                  required: "Number of units is required",
                  min: {
                    value: 1,
                    message: "Must request at least 1 unit",
                  },
                  max: {
                    value: 10,
                    message: "Maximum 10 units per request",
                  },
                })}
              />
            </div>
            {errors.units_needed && (
              <p className="mt-1 text-sm text-error">
                {errors.units_needed.message}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                className={`input input-bordered w-full pl-10 ${
                  errors.contact_number ? "input-error" : ""
                }`}
                placeholder="Your contact number"
                {...register("contact_number", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]*$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
            </div>
            {errors.contact_number && (
              <p className="mt-1 text-sm text-error">
                {errors.contact_number.message}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Notes
          </label>
          <div className="relative">
            <Info className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              className="textarea textarea-bordered w-full pl-10 h-24"
              placeholder="Important details about the request e.g., reason for blood need, urgency, etc."
              {...register("notes", {
                required: "notes is required",
              })}></textarea>
          </div>
          {errors.notes && (
            <p className="mt-1 text-sm text-error">{errors.notes.message}</p>
          )}
        </div>

        {/* Progress Indicator when request is updated */}
        {progressPercentage > 0 && (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full md:w-auto md:min-w-[200px]"
            disabled={loading}>
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : requestToUpdate ? (
              "Update Blood Request"
            ) : (
              "Submit Blood Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodRequestForm;
