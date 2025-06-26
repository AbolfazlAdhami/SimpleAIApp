import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();
  const makeRequest = () => {};
  return { makeRequest };
};
