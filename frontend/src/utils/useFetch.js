import { useCallback, useEffect, useState } from "react";
import { useApi } from "../utils/api.js";

export function useFetch() {
  const [quota, setQuota] = useState(null);
  const { makeRequest } = useApi();
  const fetchQuota = async () => {
    try {
      const data = await makeRequest("quota");
      setQuota(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuota();
  }, []);

  return { quota };
}
