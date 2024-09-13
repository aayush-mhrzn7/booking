import axios from "axios";
import config from "./config";
import { RegisterForm } from "./pages/Register";
import { loginForm } from "./pages/Login";
export const register = async (formData: RegisterForm) => {
  console.log(formData);
  const response = await axios.post(
    `${config.apiUrl}/api/users/register`,
    formData,
    { withCredentials: true }
  );
  if (!response) {
    throw new Error("failed to fetch");
  }
};
export const validateToken = async () => {
  const response = await axios.get(`${config.apiUrl}/api/auth/validate-token`, {
    withCredentials: true,
  });
  if (!response) {
    throw new Error("invalid");
  }
  return response;
};
export const Login = async (data: loginForm) => {
  const res = await axios.post(
    `${config.apiUrl}/api/auth/login`,
    {
      email: data.email,
      password: data.password,
    },
    { withCredentials: true }
  );
  if (!res) {
    throw new Error("cant get user");
  }
};
export const logout = async () => {
  await axios.post(
    `${config.apiUrl}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
};
