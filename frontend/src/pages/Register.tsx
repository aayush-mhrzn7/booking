import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
import * as apiClient from "../api-clients";
import { useNavigate } from "react-router-dom";
function Register() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const signup = (data: RegisterForm) => {
    console.log(data);
    mutation.mutate(data);
  };
  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "registered Sucessfully", type: "SUCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  console.log(mutation);

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

export default Register;
