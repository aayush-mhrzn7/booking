import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-clients";
type toastMessage = {
  message: string;
  type: "SUCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessage: toastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<toastMessage | undefined>(undefined);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (message) => {
          setToast(message);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          onClose={() => setToast(undefined)}
          message={toast.message}
          type={toast.type}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
