import { createContext, useContext, type ReactNode } from "react";
import { useMe } from "@/hooks/useMe";
import { User } from "@prisma/client";

interface UserContextProps {
  me: User | null;
  isLoadingMe: boolean;
  refreshMe: any;
}

const UserContext = createContext<UserContextProps>({
  me: null,
  isLoadingMe: false,
  refreshMe: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { me, isLoading, mutate } = useMe();

  const value = {
    me,
    isLoadingMe: isLoading,
    refreshMe: mutate,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
