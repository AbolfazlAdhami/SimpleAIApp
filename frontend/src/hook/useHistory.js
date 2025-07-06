import React, { useState, useEffect } from "react";
import { useApi } from "../utils/api.js";

export function useHistory() {
  const { makeRequest } = useApi();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("my-history");
      setHistory(data.challenges);
    } catch (err) {
      console.error(err);
      setError("Failed to load history.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { isLoading, error, history, fetchHistory };
}
