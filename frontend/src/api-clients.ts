import axios from "axios";
import config from "./config";
import { RegisterForm } from "./pages/Register";
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
