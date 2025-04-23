import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { userRegisterType } from "../globalType/AuthType";
import useAuthContext from "../Hooks/useAuthContext";
export default function RegisterPage() {
  const { errorMsg, loading } = useAuthContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userRegisterType>();

  const onSubmit = async (data: userRegisterType): Promise<void> => {
    console.log("before delete data:-", data);
    delete data.confirm_password;
    console.log("after delete data:-", data);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
              Join Our Hemolyze Community
            </h1>
            <p className="mt-2 text-gray-600">
              Create an account to schedule donations/take blood and track your
              impact
            </p>
          </div>

          {errorMsg && (
            <div className="alert alert-error">
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="input input-bordered w-full pl-10"
                    placeholder="example@gmail.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-error text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    placeholder="John453"
                    className="input input-bordered w-full pl-10"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-error text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="input input-bordered w-full pl-10"
                    placeholder="••••••••"
                    minLength={8}
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-error text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-200">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    className="input input-bordered w-full pl-10"
                    placeholder="••••••••"
                    {...register("confirm_password", { required: true })}
                  />
                  {errors.confirm_password && (
                    <span className="text-error text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                className="checkbox checkbox-primary"
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a className="text-primary hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className={`btn btn-primary btn-block text-white ${
                  loading ? "text-secondary" : ""
                }`}
                disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight className="h-5 w-5 ml-2" />}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
