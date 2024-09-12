import { useForm } from "react-hook-form";
type LoginForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();
  const signup = (data: LoginForm) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(signup)}>
      <h2 className="text-3xl font-bold">Create An account</h2>
      <div className="flex flex-col  md:flex-row gap-5 ">
        <label
          htmlFor="first"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          First Name
        </label>
        <input
          id="first"
          type="text"
          className="border rounded w-full py-1
          px-2"
          {...register("firstName", {
            required: "this field is required",
          })}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
        <label
          htmlFor="last"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Last Name
        </label>
        <input
          id="second"
          type="text"
          className="border rounded w-full py-1
          px-2"
          {...register("lastName", {
            required: "this field is required",
          })}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="border rounded w-full py-1
          px-2"
        {...register("email", {
          required: "this field is required",
        })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <label
        htmlFor="password"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        className="border rounded w-full py-1
          px-2"
        {...register("password", {
          required: "this field is required",
        })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <label
        htmlFor="confirm"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Confirm Password
      </label>
      <input
        id="confirm"
        type="password"
        className="border rounded w-full py-1
          px-2"
        {...register("confirmPassword", {
          validate: (val) => {
            if (!val) return " required Field";
            else if (watch("password") != val) return "passwords do not match";
          },
        })}
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}
      <span>
        <button
          type="submit"
          className="bg-blue-800 text-white font-bold p-2 hover:bg-blue-500"
        >
          Signup
        </button>
      </span>
    </form>
  );
}

export default Login;
