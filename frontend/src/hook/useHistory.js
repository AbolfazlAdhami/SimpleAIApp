import React, { useCallback, useState, useEffect } from "react";
import { useApi } from "../utils/api.js";

export function useHistory() {
  const { makeRequest } = useApi();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("my-history");
      console.log(data);
      setHistory(data.challenges);
    } catch (err) {
      console.error(err);
      setError("Failed to load history.");
    }
    setIsLoading(false);
  }, [makeRequest]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { isLoading, error, history, fetchHistory };
}
