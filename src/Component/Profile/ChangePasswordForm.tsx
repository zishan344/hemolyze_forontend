import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { changePasswordType } from "../../globalType/AuthType";

interface ChangePasswordFormProps {
  loading: boolean;
  changePassword: (
    data: changePasswordType
  ) => Promise<{ success: boolean; message?: string } | undefined>;
}
const ChangePasswordForm = ({
  changePassword,
  loading,
}: ChangePasswordFormProps) => {
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<changePasswordType>();

  const onPasswordSubmit = async (data: changePasswordType) => {
    const response = await changePassword(data);
    if (response?.success) {
      resetPassword();
    }
  };
  return (
    <form
      onSubmit={handlePasswordSubmit(onPasswordSubmit)}
      className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="mt-1 flex items-center space-x-2">
          <Lock className="text-gray-400" size={20} />
          <input
            type="password"
            {...registerPassword("current_password", {
              required: "Current password is required",
            })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        {passwordErrors.current_password && (
          <p className="mt-1 text-sm text-red-600">
            {passwordErrors.current_password.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="mt-1 flex items-center space-x-2">
          <Lock className="text-gray-400" size={20} />
          <input
            type="password"
            {...registerPassword("new_password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        {passwordErrors.new_password && (
          <p className="mt-1 text-sm text-red-600">
            {passwordErrors.new_password.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          disabled={loading}
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
          {loading ? "changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
