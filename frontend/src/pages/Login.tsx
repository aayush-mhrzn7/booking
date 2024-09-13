import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type loginForm = {
  email: string;
  password: string;
};
function Login() {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>();
  const mutation = useMutation(apiClient.Login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "logged In is a sucess", type: "SUCESS" });
      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const loginHandler = (data: loginForm) => {
    mutation.mutate(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(loginHandler)}>
      <h2 className="text-3xl font-bold">Welcome back</h2>

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
      <span className="text-sm">
        Not Registered? <Link to="/register">Click herer</Link>
      </span>
      <span>
        <button
          type="submit"
          className="bg-blue-800 text-white font-bold p-2 hover:bg-blue-500"
        >
          Login
        </button>
      </span>
    </form>
  );
}

export default Login;
