import { useForm } from "react-hook-form";
import { userLoginType } from "../globalType/AuthType";
import useAuthContext from "../Hooks/useAuthContext";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Lock,
  Mail,
  Twitter,
} from "lucide-react";

const Login = () => {
  const { loginUser, loading, errorMsg } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>();
  const onSubmit = async (data: userLoginType): Promise<void> => {
    const response = await loginUser(data);
    console.log(response);
    if (response.success) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="min-h-screen bg-base-100 flex flex-col">
        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
              <p className="mt-2 text-gray-600">
                Sign in to your account to manage your donations
              </p>
            </div>

            {errorMsg ? (
              <div className="alert alert-error">
                <span>{String(errorMsg)}</span>
              </div>
            ) : null}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700">
                    Email address
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
                      placeholder="you@example.com"
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
                      autoComplete="current-password"
                      className="input input-bordered w-full pl-10"
                      placeholder="••••••••"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-error text-sm">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`btn btn-primary btn-block text-white ${
                    loading ? "text-secondary" : ""
                  }`}
                  disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                  {!loading && <ArrowRight className="h-5 w-5 ml-2" />}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <div className="grid grid-cols-3 gap-3">
              <button className="btn btn-outline">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="btn btn-outline">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="btn btn-outline">
                <Twitter className="h-5 w-5" />
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
