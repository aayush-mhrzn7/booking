import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

type toastMessage = {
  message: string;
  type: "SUCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessage: toastMessage) => void;
};
const AppContext = createContext<AppContext | undefined>(undefined);
console.log("appcontext", AppContext);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<toastMessage | undefined>(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
          console.log("toastMessage:", toastMessage);
        },
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
