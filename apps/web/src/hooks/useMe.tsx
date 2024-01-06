import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import type { User } from "@prisma/client";

export const useMe = () => {
  const { data, isLoading, mutate } = useSWR("/api/me/get", fetcher);
  return useMemo(() => {
    return {
      me: data as User,
      isLoading,
      mutate,
    };
  }, [data, isLoading, mutate]);
};
