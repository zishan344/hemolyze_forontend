import { useForm } from "react-hook-form";
import { userLoginType } from "../globalType/AuthType";
import useAuthContext from "../Hooks/useAuthContext";

const Login = () => {
  const { user, errorMsg, loginUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>();
  const onSubmit = async (data: userLoginType): Promise<void> => {
    const response = await loginUser(data);
    if (response) {
      console.log(response);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <form>
        <div>
          <input type="text" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
